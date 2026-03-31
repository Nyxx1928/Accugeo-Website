# Requirements Document

## Introduction

This feature replaces the existing single-job GitHub Actions CI workflow for the Accugeo-Website Next.js/TypeScript project with a comprehensive 7-phase CI/CD pipeline. The pipeline enforces code quality, test coverage, containerization validation, and supply-chain security on every push and pull request to the main/master branches. Each phase runs as a distinct job with explicit dependencies, enabling fast feedback and clear failure attribution.

## Glossary

- **Pipeline**: The GitHub Actions CI workflow defined in `.github/workflows/ci.yml`
- **Runner**: The GitHub-hosted `ubuntu-latest` virtual machine executing each job
- **Phase**: A named GitHub Actions job within the Pipeline
- **SBOM**: Software Bill of Materials — a machine-readable inventory of all software components and their dependencies
- **Syft**: An open-source CLI tool that generates SBOMs from container images or directory trees
- **Trivy**: An open-source vulnerability scanner for container images, filesystems, and SBOMs
- **Cosign**: A Sigstore tool used to sign and verify container image signatures
- **Playwright**: An end-to-end browser testing framework
- **Jest**: A JavaScript unit testing framework
- **Docker_Image**: The OCI-compliant container image built from the project's Dockerfile
- **CI_Summary**: A GitHub Actions job-level summary report aggregating results from all preceding phases

---

## Requirements

### Requirement 1: Pipeline Trigger and Structure

**User Story:** As a developer, I want the Pipeline to run automatically on code changes, so that every push and pull request is validated before merging.

#### Acceptance Criteria

1. WHEN a commit is pushed to the `main` or `master` branch, THE Pipeline SHALL trigger automatically.
2. WHEN a pull request targets the `main` or `master` branch, THE Pipeline SHALL trigger automatically.
3. THE Pipeline SHALL define each of the 7 phases as a separate GitHub Actions job.
4. THE Pipeline SHALL execute Phase 1 before any other phase begins.
5. WHEN Phase 1 fails, THE Pipeline SHALL not execute any subsequent phases.

---

### Requirement 2: Phase 1 — Lint and Validate

**User Story:** As a developer, I want linting and type-checking to run first, so that code quality issues are caught before any tests execute.

#### Acceptance Criteria

1. THE Pipeline SHALL run `npm ci` to install dependencies with a locked dependency tree.
2. WHEN dependencies are installed, THE Pipeline SHALL execute `npx tsc --noEmit` to perform TypeScript type-checking.
3. WHEN type-checking passes, THE Pipeline SHALL execute `npm run lint` using the project's ESLint configuration.
4. IF `npx tsc --noEmit` exits with a non-zero code, THEN THE Pipeline SHALL fail Phase 1 and report the TypeScript errors.
5. IF `npm run lint` exits with a non-zero code, THEN THE Pipeline SHALL fail Phase 1 and report the lint errors.
6. THE Pipeline SHALL cache the `node_modules` directory using the `package-lock.json` hash to reduce install time on subsequent runs.

---

### Requirement 3: Phase 2 — Unit Testing with Jest

**User Story:** As a developer, I want unit tests to run automatically, so that regressions in individual functions and components are detected early.

#### Acceptance Criteria

1. THE Pipeline SHALL install Jest and its required configuration if not already present in `devDependencies`.
2. WHEN Phase 1 completes successfully, THE Pipeline SHALL execute the Jest test suite.
3. THE Pipeline SHALL run Jest with the `--ci` flag to disable interactive mode and treat unmatched snapshots as failures.
4. THE Pipeline SHALL run Jest with the `--coverage` flag to generate a code coverage report.
5. IF any Jest test fails, THEN THE Pipeline SHALL fail Phase 2 and output the failing test names and error messages.
6. THE Pipeline SHALL upload the Jest coverage report as a GitHub Actions artifact named `jest-coverage`.

---

### Requirement 4: Phase 3 — Integration Testing

**User Story:** As a developer, I want integration tests to validate interactions between components and API routes, so that cross-module regressions are caught before deployment.

#### Acceptance Criteria

1. WHEN Phase 2 completes successfully, THE Pipeline SHALL execute the integration test suite.
2. THE Pipeline SHALL run integration tests using the project's configured test runner targeting files matching the `*.integration.test.ts` or `*.integration.spec.ts` pattern.
3. IF any integration test fails, THEN THE Pipeline SHALL fail Phase 3 and output the failing test names and error messages.
4. THE Pipeline SHALL upload integration test results as a GitHub Actions artifact named `integration-test-results`.

---

### Requirement 5: Phase 4 — End-to-End Testing with Playwright

**User Story:** As a developer, I want end-to-end tests to validate full user flows in a real browser, so that UI regressions are caught before release.

#### Acceptance Criteria

1. WHEN Phase 3 completes successfully, THE Pipeline SHALL execute the Playwright end-to-end test suite.
2. THE Pipeline SHALL install Playwright browsers using `npx playwright install --with-deps` before running tests.
3. THE Pipeline SHALL execute Playwright tests using `npx playwright test`.
4. IF any Playwright test fails, THEN THE Pipeline SHALL fail Phase 4 and output the failing test names, error messages, and browser context.
5. THE Pipeline SHALL upload the Playwright HTML report as a GitHub Actions artifact named `playwright-report`.
6. THE Pipeline SHALL retain the `playwright-report` artifact for a minimum of 30 days.

---

### Requirement 6: Phase 5 — Test and Build Docker Image

**User Story:** As a developer, I want the Docker image to be built and validated in CI, so that containerization issues are caught before the image is published.

#### Acceptance Criteria

1. WHEN Phase 1 completes successfully, THE Pipeline SHALL build the Docker_Image using the project's Dockerfile.
2. THE Pipeline SHALL build the Docker_Image with the tag `accugeo-website:ci-${{ github.sha }}`.
3. IF the Docker build exits with a non-zero code, THEN THE Pipeline SHALL fail Phase 5 and output the build error log.
4. WHEN the Docker_Image is built successfully, THE Pipeline SHALL run the container and execute a health-check HTTP request against the application's default port.
5. IF the health-check request does not return an HTTP 200 response within 30 seconds, THEN THE Pipeline SHALL fail Phase 5.
6. THE Pipeline SHALL export the Docker_Image as a tarball and upload it as a GitHub Actions artifact named `docker-image` for use in Phase 6.

---

### Requirement 7: Phase 6 — Security Scan

**User Story:** As a developer, I want automated security scanning of the Docker image and its dependencies, so that known vulnerabilities and unsigned images are detected before deployment.

#### Acceptance Criteria

1. WHEN Phase 5 completes successfully, THE Pipeline SHALL execute all three security sub-phases: SBOM generation, vulnerability scanning, and image signing.
2. THE Pipeline SHALL use Syft to generate an SBOM in CycloneDX JSON format from the Docker_Image.
3. THE Pipeline SHALL upload the Syft-generated SBOM as a GitHub Actions artifact named `sbom-cyclonedx`.
4. THE Pipeline SHALL use Trivy to scan the Docker_Image for vulnerabilities using the SBOM generated by Syft.
5. WHEN Trivy detects vulnerabilities with severity `CRITICAL` or `HIGH`, THE Pipeline SHALL fail Phase 6 and output the vulnerability report.
6. THE Pipeline SHALL upload the Trivy vulnerability report as a GitHub Actions artifact named `trivy-report`.
7. WHERE a `COSIGN_PRIVATE_KEY` secret is configured in the repository, THE Pipeline SHALL use Cosign to sign the Docker_Image digest.
8. WHERE a `COSIGN_PRIVATE_KEY` secret is configured in the repository, THE Pipeline SHALL verify the Cosign signature immediately after signing.
9. IF Cosign signature verification fails, THEN THE Pipeline SHALL fail Phase 6.

---

### Requirement 8: Phase 7 — CI Summary

**User Story:** As a developer, I want a consolidated summary of all pipeline phases, so that I can quickly assess the overall health of a CI run without inspecting each job individually.

#### Acceptance Criteria

1. WHEN all preceding phases complete (regardless of pass or fail status), THE Pipeline SHALL execute Phase 7.
2. THE CI_Summary SHALL collect the outcome (success, failure, or skipped) of each of the 6 preceding phases.
3. THE CI_Summary SHALL write a Markdown-formatted summary table to the GitHub Actions job summary (`$GITHUB_STEP_SUMMARY`).
4. THE CI_Summary summary table SHALL include one row per phase with columns: Phase Name, Status, and Duration.
5. WHEN all phases pass, THE CI_Summary SHALL display an overall status of `PASSED`.
6. WHEN one or more phases fail, THE CI_Summary SHALL display an overall status of `FAILED` and list the names of the failed phases.
7. THE Pipeline SHALL configure Phase 7 with `if: always()` so that it runs even when upstream phases fail.
