# Requirements Document

## Introduction

This feature adds Docker support to the Accugeo-Website Next.js 14 project. It covers a multi-stage production Dockerfile, a development Docker Compose setup, environment variable handling, a `.dockerignore` file, and integration with the existing CI/CD pipeline spec. The goal is to make the application runnable in a consistent, reproducible container in both local development and production environments.

## Glossary

- **Dockerfile**: The file defining the multi-stage OCI image build for the application
- **Docker_Image**: The OCI-compliant container image produced by the Dockerfile
- **Compose_File**: The `docker-compose.yml` file used to orchestrate local development containers
- **Builder_Stage**: The intermediate Docker build stage that installs dependencies and compiles the Next.js application
- **Runner_Stage**: The final, minimal Docker image stage that serves the compiled application
- **Standalone_Output**: The Next.js `output: 'standalone'` build mode that produces a self-contained server bundle
- **Env_File**: A `.env` file passed to Docker at runtime to supply environment variables
- **SENDGRID_API_KEY**: The SendGrid API key required by the contact form API route
- **CONTACT_TO_EMAIL**: The destination email address used by the contact form API route
- **Health_Check**: An HTTP request to the application's root path used to verify the container is running correctly
- **Non_Root_User**: A Linux user with no elevated privileges, used to run the application process inside the container for security

---

## Requirements

### Requirement 1: Multi-Stage Production Dockerfile

**User Story:** As a developer, I want a multi-stage Dockerfile, so that the production image is as small and secure as possible by excluding build-time dependencies.

#### Acceptance Criteria

1. THE Dockerfile SHALL use a multi-stage build with at least a Builder_Stage and a Runner_Stage.
2. THE Builder_Stage SHALL use a Node.js LTS Alpine base image to install dependencies and build the application.
3. THE Builder_Stage SHALL run `npm ci --omit=dev` to install only production dependencies before the build step.
4. THE Builder_Stage SHALL run `npm run build` to compile the Next.js application using Standalone_Output mode.
5. THE Runner_Stage SHALL use a minimal Node.js LTS Alpine base image and copy only the Standalone_Output artifacts from the Builder_Stage.
6. THE Runner_Stage SHALL copy the `public/` directory and the `.next/static/` directory into the correct locations expected by the standalone server.
7. THE Dockerfile SHALL configure the container to run the application as a Non_Root_User.
8. THE Dockerfile SHALL expose port `3000` as the application's listening port.
9. THE Dockerfile SHALL set `NODE_ENV=production` as a default environment variable in the Runner_Stage.

---

### Requirement 2: Next.js Standalone Output Configuration

**User Story:** As a developer, I want Next.js configured for standalone output, so that the Docker image contains only the files needed to run the server without requiring `node_modules` at runtime.

#### Acceptance Criteria

1. THE `next.config.js` file SHALL set `output: 'standalone'` to enable Standalone_Output mode.
2. WHEN `npm run build` is executed inside the Builder_Stage, THE Builder_Stage SHALL produce a `.next/standalone` directory containing the self-contained server bundle.
3. IF the `output: 'standalone'` configuration is absent, THEN THE Dockerfile build SHALL fail because the expected standalone artifacts will not exist.

---

### Requirement 3: .dockerignore File

**User Story:** As a developer, I want a `.dockerignore` file, so that unnecessary files are excluded from the Docker build context to reduce image size and prevent secrets from leaking into the image.

#### Acceptance Criteria

1. THE `.dockerignore` file SHALL exclude the `node_modules/` directory from the build context.
2. THE `.dockerignore` file SHALL exclude the `.next/` directory from the build context.
3. THE `.dockerignore` file SHALL exclude all `.env*` files (including `.env.local`) from the build context to prevent secrets from being copied into the Docker_Image.
4. THE `.dockerignore` file SHALL exclude `.git/`, `.github/`, and `.kiro/` directories from the build context.
5. THE `.dockerignore` file SHALL exclude `README.md` and other documentation files from the build context.

---

### Requirement 4: Environment Variable Handling

**User Story:** As a developer, I want environment variables to be injected at container runtime rather than baked into the image, so that the same Docker_Image can be used across different environments without rebuilding.

#### Acceptance Criteria

1. THE Dockerfile SHALL NOT copy any `.env*` file into the Docker_Image at build time.
2. WHEN the container is started, THE Docker_Image SHALL accept `SENDGRID_API_KEY` and `CONTACT_TO_EMAIL` as runtime environment variables via `--env` flags or an Env_File.
3. THE Compose_File SHALL reference an Env_File (`.env.local`) using the `env_file` directive to supply environment variables to the development container.
4. THE repository SHALL include a `.env.example` file listing all required environment variables with placeholder values and inline comments describing each variable.
5. IF `SENDGRID_API_KEY` or `CONTACT_TO_EMAIL` are not set at runtime, THEN THE application SHALL start successfully and the contact API route SHALL return HTTP 503 when called, consistent with existing behavior.

---

### Requirement 5: Docker Compose for Local Development

**User Story:** As a developer, I want a Docker Compose file for local development, so that I can run the application in a container with hot-reload and volume mounts without manually managing Docker commands.

#### Acceptance Criteria

1. THE Compose_File SHALL define a service named `web` that builds from the project's Dockerfile using a `development` build target.
2. THE Compose_File SHALL mount the project source directory as a volume into the container to enable hot-reload during development.
3. THE Compose_File SHALL map host port `3000` to container port `3000`.
4. THE Compose_File SHALL set `NODE_ENV=development` for the `web` service.
5. THE Compose_File SHALL reference `.env.local` via the `env_file` directive so that `SENDGRID_API_KEY` and `CONTACT_TO_EMAIL` are available inside the development container.
6. WHEN `docker compose up` is executed, THE Compose_File SHALL start the `web` service and make the application accessible at `http://localhost:3000`.

---

### Requirement 6: Container Health Check

**User Story:** As a developer, I want a health check defined in the Dockerfile, so that Docker and the CI/CD pipeline can verify the container is running and serving traffic correctly.

#### Acceptance Criteria

1. THE Dockerfile SHALL define a `HEALTHCHECK` instruction that sends an HTTP request to `http://localhost:3000/`.
2. THE Health_Check SHALL use a 30-second interval, a 10-second timeout, and a start period of 15 seconds before the first check.
3. THE Health_Check SHALL allow a maximum of 3 retries before marking the container as unhealthy.
4. WHEN the application is running and serving the root path, THE Health_Check SHALL return a healthy status.
5. IF the application fails to respond within the timeout, THEN THE Health_Check SHALL mark the container as unhealthy after exhausting all retries.

---

### Requirement 7: CI/CD Pipeline Integration

**User Story:** As a developer, I want the Docker build and health check validated in the CI/CD pipeline, so that broken Dockerfiles are caught before the image is published.

#### Acceptance Criteria

1. THE Pipeline SHALL build the Docker_Image using the production Dockerfile as part of Phase 5 (as defined in the ci-cd-pipeline spec).
2. WHEN the Docker_Image is built, THE Pipeline SHALL start the container and execute a Health_Check HTTP request against port `3000`.
3. IF the Health_Check does not return HTTP 200 within 30 seconds, THEN THE Pipeline SHALL fail Phase 5.
4. THE Pipeline SHALL pass `--build-arg` or equivalent runtime `--env` flags to supply placeholder values for `SENDGRID_API_KEY` and `CONTACT_TO_EMAIL` during the CI health check so the container starts without real credentials.
5. THE Pipeline SHALL NOT embed real `SENDGRID_API_KEY` or `CONTACT_TO_EMAIL` values in the workflow file; secrets SHALL be referenced via GitHub Actions secrets.
