import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Services from './Services';

// Mock timers for transition testing
jest.useFakeTimers();

describe('Services Carousel Keyboard Navigation', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  it('should advance to next service when ArrowRight is pressed', async () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    
    // Initially showing first service (Material Testing)
    expect(screen.getByText('Material Testing')).toBeInTheDocument();
    expect(screen.getByText('1 of 6')).toBeInTheDocument();
    
    // Press ArrowRight
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    });
    
    // Fast-forward through transitions (200ms fade-out + 200ms fade-in)
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    expect(screen.getByText('Quality Inspection')).toBeInTheDocument();
    expect(screen.getByText('2 of 6')).toBeInTheDocument();
  });

  it('should move to previous service when ArrowLeft is pressed', async () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    
    // Initially showing first service
    expect(screen.getByText('Material Testing')).toBeInTheDocument();
    
    // Press ArrowRight twice to get to third service
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      jest.advanceTimersByTime(400);
    });
    expect(screen.getByText('Quality Inspection')).toBeInTheDocument();
    
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      jest.advanceTimersByTime(400);
    });
    expect(screen.getByText('Consulting & Reporting')).toBeInTheDocument();
    
    // Press ArrowLeft
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
      jest.advanceTimersByTime(400);
    });
    
    // Should show second service
    expect(screen.getByText('Quality Inspection')).toBeInTheDocument();
  });

  it('should wrap from last service to first when ArrowRight is pressed', async () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    
    // Navigate to last service (6th service) - one at a time
    for (let i = 0; i < 5; i++) {
      act(() => {
        fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      });
      act(() => {
        jest.advanceTimersByTime(400);
      });
    }
    
    expect(screen.getByText('Non-Destructive Testing')).toBeInTheDocument();
    expect(screen.getByText('6 of 6')).toBeInTheDocument();
    
    // Press ArrowRight again - should wrap to first
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      jest.advanceTimersByTime(400);
    });
    
    expect(screen.getByText('Material Testing')).toBeInTheDocument();
    expect(screen.getByText('1 of 6')).toBeInTheDocument();
  });

  it('should wrap from first service to last when ArrowLeft is pressed', async () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    
    // Initially on first service
    expect(screen.getByText('Material Testing')).toBeInTheDocument();
    expect(screen.getByText('1 of 6')).toBeInTheDocument();
    
    // Press ArrowLeft - should wrap to last service
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
      jest.advanceTimersByTime(400);
    });
    
    expect(screen.getByText('Non-Destructive Testing')).toBeInTheDocument();
    expect(screen.getByText('6 of 6')).toBeInTheDocument();
  });

  it('should be focusable via keyboard', () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    
    // Verify carousel has tabIndex
    expect(carousel).toHaveAttribute('tabindex', '0');
  });

  it('should announce service changes to screen readers', async () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    
    // Find ARIA live region
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    
    // Initially announces first service
    expect(liveRegion?.textContent).toBe('Showing Material Testing, service 1 of 6');
    
    // Navigate to next service
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      jest.advanceTimersByTime(400);
    });
    
    // Should announce second service
    expect(liveRegion?.textContent).toBe('Showing Quality Inspection, service 2 of 6');
  });

  it('should prevent default behavior for arrow keys', () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
    
    carousel.dispatchEvent(event);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should not respond to other keys', () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    
    // Initially on first service
    expect(screen.getByText('Material Testing')).toBeInTheDocument();
    
    // Press other keys
    fireEvent.keyDown(carousel, { key: 'Enter' });
    fireEvent.keyDown(carousel, { key: 'Space' });
    fireEvent.keyDown(carousel, { key: 'a' });
    
    // Should still be on first service
    expect(screen.getByText('Material Testing')).toBeInTheDocument();
    expect(screen.getByText('1 of 6')).toBeInTheDocument();
  });
});

describe('Services Carousel Slide Transitions', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  it('should disable navigation controls during transition', async () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    const prevButton = screen.getByRole('button', { name: /previous service/i });
    const nextButton = screen.getByRole('button', { name: /next service/i });
    const indicators = screen.getAllByRole('button', { name: /go to/i });
    
    // Initially controls should be enabled
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    indicators.forEach(indicator => {
      expect(indicator).not.toBeDisabled();
    });
    
    // Start navigation
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    });
    
    // Controls should be disabled immediately
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
    indicators.forEach(indicator => {
      expect(indicator).toBeDisabled();
    });
    
    // Complete transition
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    expect(screen.getByText('Quality Inspection')).toBeInTheDocument();
    
    // Controls should be enabled again
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('should prevent rapid clicking during transition', async () => {
    render(<Services />);
    const nextButton = screen.getByRole('button', { name: /next service/i });
    
    // Initially on first service
    expect(screen.getByText('Material Testing')).toBeInTheDocument();
    
    // Click next button multiple times rapidly
    act(() => {
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
    });
    
    // Complete transition
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    // Should only advance by one (not three)
    expect(screen.getByText('Quality Inspection')).toBeInTheDocument();
    expect(screen.getByText(/^2 of 6$/i, { selector: 'p' })).toBeInTheDocument();
  });

  it('should update active slide visibility when navigating', async () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });

    const materialSlide = screen.getByText('Material Testing').closest('div[aria-hidden]');
    expect(materialSlide).toHaveAttribute('aria-hidden', 'false');

    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      jest.advanceTimersByTime(400);
    });

    const qualitySlide = screen.getByText('Quality Inspection').closest('div[aria-hidden]');
    expect(qualitySlide).toHaveAttribute('aria-hidden', 'false');
    expect(materialSlide).toHaveAttribute('aria-hidden', 'true');
  });

  it('should update active indicator as navigation direction changes', async () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });

    const firstIndicator = screen.getByRole('button', { name: /go to material testing/i });
    const secondIndicator = screen.getByRole('button', { name: /go to quality inspection/i });

    expect(firstIndicator).toHaveAttribute('aria-current', 'true');

    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      jest.advanceTimersByTime(400);
    });

    expect(secondIndicator).toHaveAttribute('aria-current', 'true');
    expect(firstIndicator).not.toHaveAttribute('aria-current', 'true');

    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
      jest.advanceTimersByTime(400);
    });

    expect(firstIndicator).toHaveAttribute('aria-current', 'true');
    expect(secondIndicator).not.toHaveAttribute('aria-current', 'true');
  });

  it('should disable keyboard navigation during transition', async () => {
    render(<Services />);
    const carousel = screen.getByRole('region', { name: /services carousel/i });
    
    // Start navigation
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    });
    
    // Try to navigate again immediately (should be ignored)
    act(() => {
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    });
    
    // Complete transition
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    // Should only advance by one
    expect(screen.getByText('Quality Inspection')).toBeInTheDocument();
    expect(screen.getByText(/^2 of 6$/i, { selector: 'p' })).toBeInTheDocument();
  });

  it('should disable indicator clicks during transition', async () => {
    render(<Services />);
    
    // Click on third indicator
    const thirdIndicator = screen.getByRole('button', { name: /go to consulting & reporting/i });
    act(() => {
      fireEvent.click(thirdIndicator);
    });
    
    // Try to click another indicator immediately (should be ignored)
    const fifthIndicator = screen.getByRole('button', { name: /go to structural assessment/i });
    act(() => {
      fireEvent.click(fifthIndicator);
    });
    
    // Complete transition
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    // Should show third service (not fifth)
    expect(screen.getByText('Consulting & Reporting')).toBeInTheDocument();
    expect(screen.getByText(/^3 of 6$/i, { selector: 'p' })).toBeInTheDocument();
  });
});
