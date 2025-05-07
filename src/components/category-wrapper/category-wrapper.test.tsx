import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryWrapper } from '.';

describe('CategoryWrapper', () => {
  it('renders the favorite category correctly', () => {
    render(<CategoryWrapper category="favorite" pickStatus="locked" />);

    // Check if category title is rendered
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'favorite',
    );

    // Check if description is rendered
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'Pick a favored team to cover (- spread)',
    );
  });

  it('renders the underdog category correctly', () => {
    render(<CategoryWrapper category="underdog" pickStatus="locked" />);

    // Check if category title is rendered
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'underdog',
    );

    // Check if description is rendered
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'Pick an underdog to cover (+ spread)',
    );
  });

  it('renders the total category correctly', () => {
    render(<CategoryWrapper category="total" pickStatus="locked" />);

    // Check if category title is rendered
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'total',
    );
  });
});
