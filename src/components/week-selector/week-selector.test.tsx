import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { WeekSelector } from '.';

describe('WeekSelector', () => {
  it('disables previous week button when current week is 1', () => {
    render(
      <WeekSelector
        selectedWeek={1}
        latestAvailableWeek={9}
        totalWeeks={18}
        onWeekChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Previous week')).toBeDisabled();
  });

  it('disables next week button when current week is max', () => {
    render(
      <WeekSelector
        selectedWeek={18}
        latestAvailableWeek={18}
        totalWeeks={18}
        onWeekChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Next week')).toBeDisabled();
  });

  it('renders correct number of default weeks', () => {
    render(
      <WeekSelector
        selectedWeek={1}
        latestAvailableWeek={9}
        onWeekChange={vi.fn()}
      />,
    );

    expect(screen.getAllByLabelText(/Week \d+/)).toHaveLength(18);
  });

  it('renders correct number of custom weeks', () => {
    render(
      <WeekSelector
        selectedWeek={1}
        latestAvailableWeek={21}
        totalWeeks={21}
        onWeekChange={vi.fn()}
      />,
    );

    expect(screen.getAllByLabelText(/Week \d+/)).toHaveLength(21);
  });

  it('disables weeks greater than current week', () => {
    const currentWeek = 9;

    render(
      <WeekSelector
        selectedWeek={1}
        latestAvailableWeek={currentWeek}
        onWeekChange={vi.fn()}
      />,
    );

    const weekButtons = screen.getAllByLabelText(/Week \d+/);
    weekButtons.forEach((button, index) => {
      const week = index + 1;

      if (week > currentWeek) {
        expect(button).toHaveAttribute('disabled');
      } else {
        expect(button).not.toHaveAttribute('disabled');
      }
    });
  });
});
