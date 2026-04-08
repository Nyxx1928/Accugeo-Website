import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Services from './Services';

describe('Services Section (Editorial Layout)', () => {
  it('renders section heading and first three services', () => {
    render(<Services />);

    expect(screen.getByRole('heading', { name: /reliable engineering services for better build outcomes/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Material Testing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Quality Inspection' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Consulting & Reporting' })).toBeInTheDocument();

    // The redesigned section intentionally highlights the first three offerings.
    expect(screen.queryByRole('heading', { name: 'Structural Assessment' })).not.toBeInTheDocument();
  });

  it('renders accordion triggers with proper accessibility attributes', () => {
    render(<Services />);

    const firstTrigger = screen.getByRole('button', { name: /quality test of soils\/ soil aggregates/i });
    const secondTrigger = screen.getByRole('button', { name: /quality test of coarse aggregates/i });

    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(firstTrigger).toHaveAttribute('aria-controls');
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(secondTrigger).toHaveAttribute('aria-controls');
  });

  it('toggles accordion panel state when a sub-service is clicked', () => {
    render(<Services />);

    const secondTrigger = screen.getByRole('button', { name: /quality test of coarse aggregates/i });
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(secondTrigger);

    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByText(/quality test of coarse aggregates is delivered as part of material testing/i),
    ).toBeInTheDocument();
  });

  it('collapses an expanded panel when clicked again', () => {
    render(<Services />);

    const firstTrigger = screen.getByRole('button', { name: /quality test of soils\/ soil aggregates/i });
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(firstTrigger);

    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders collage images for each showcased service row', () => {
    render(<Services />);

    expect(screen.getByRole('img', { name: /engineers preparing concrete sample cylinders/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /inspector examining delivered material/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /consultant presenting technical findings/i })).toBeInTheDocument();
  });

  it('includes a pre-footer CTA that links to contact section', () => {
    render(<Services />);

    const ctaLink = screen.getByRole('link', { name: /schedule a consultation/i });
    expect(ctaLink).toHaveAttribute('href', '#contact');
  });
});
