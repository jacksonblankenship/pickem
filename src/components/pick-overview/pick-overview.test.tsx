import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PickOverview } from '.';

describe('PickOverview', () => {
  it('shows "Make your first pick!" when no picks are made', () => {
    render(
      <PickOverview
        picks={{
          favorite: 'not-picked',
          underdog: 'not-picked',
          total: 'not-picked',
        }}
      />,
    );

    expect(screen.getByText('Make your first pick!')).toBeInTheDocument();
  });

  it('shows remaining picks count when some picks are made', () => {
    render(
      <PickOverview
        picks={{
          favorite: 'locked',
          underdog: 'not-picked',
          total: 'not-picked',
        }}
      />,
    );

    expect(screen.getByText('1 picks in — 2 left to go.')).toBeInTheDocument();
  });

  it('shows no status message when all picks are made', () => {
    render(
      <PickOverview
        picks={{
          favorite: 'locked',
          underdog: 'locked',
          total: 'locked',
        }}
      />,
    );

    expect(screen.queryByText(/picks in/)).not.toBeInTheDocument();
    expect(screen.queryByText('Make your first pick!')).not.toBeInTheDocument();
  });

  it('shows no status message when all picks are graded', () => {
    render(
      <PickOverview
        picks={{
          favorite: 'win',
          underdog: 'loss',
          total: 'push',
        }}
      />,
    );

    expect(screen.queryByText(/picks in/)).not.toBeInTheDocument();
    expect(screen.queryByText('Make your first pick!')).not.toBeInTheDocument();
  });
});
