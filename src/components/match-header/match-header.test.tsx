import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MatchHeader } from '.';

describe('MatchHeader', () => {
  it('renders correctly when the game is not at a neutral site', () => {
    render(
      <MatchHeader
        homeTeamAbbr="PHI"
        awayTeamAbbr="DAL"
        kickoffTime={new Date('2024-09-08T17:00:00.000Z')}
        isNeutralSite={false}
      />,
    );

    expect(screen.getByText('PHI')).toBeInTheDocument();
    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('DAL')).toBeInTheDocument();
  });

  it('renders correctly when the game is at a neutral site', () => {
    render(
      <MatchHeader
        homeTeamAbbr="PHI"
        awayTeamAbbr="DAL"
        kickoffTime={new Date('2024-09-08T17:00:00.000Z')}
        isNeutralSite={true}
      />,
    );

    expect(screen.getByText('PHI')).toBeInTheDocument();
    expect(screen.getByText('vs.')).toBeInTheDocument();
    expect(screen.getByText('DAL')).toBeInTheDocument();
    expect(screen.getByText('Neutral Site')).toBeInTheDocument();
  });

  it('renders correctly when the game is 3 hours away', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-09-08T14:00:00.000Z'));

    render(
      <MatchHeader
        homeTeamAbbr="PHI"
        awayTeamAbbr="DAL"
        kickoffTime={new Date('2024-09-08T17:00:00.000Z')}
        isNeutralSite={false}
      />,
    );

    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('renders correctly when the game is 1 hour away', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-09-08T16:00:00.000Z'));

    render(
      <MatchHeader
        homeTeamAbbr="PHI"
        awayTeamAbbr="DAL"
        kickoffTime={new Date('2024-09-08T17:00:00.000Z')}
        isNeutralSite={false}
      />,
    );

    expect(screen.getByText('in 1 hour')).toBeInTheDocument();
  });

  it('renders correctly when the game is live', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-09-08T18:00:00.000Z'));

    render(
      <MatchHeader
        homeTeamAbbr="PHI"
        awayTeamAbbr="DAL"
        kickoffTime={new Date('2024-09-08T17:00:00.000Z')}
        isNeutralSite={false}
      />,
    );

    expect(screen.getByText('Live')).toBeInTheDocument();
  });
});
