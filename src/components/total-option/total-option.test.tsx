import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TotalOption } from '.';

describe('TotalOption', () => {
  it('renders over total correctly', () => {
    render(
      <TotalOption
        total={46.5}
        odds={0}
        type="over"
        homeTeamAbbr="DAL"
        awayTeamAbbr="ATL"
        isNeutralSite={false}
      />,
    );

    expect(screen.getByText('Over 46.5')).toBeInTheDocument();
  });

  it('renders under total correctly', () => {
    render(
      <TotalOption
        total={46.5}
        odds={0}
        type="under"
        homeTeamAbbr="DAL"
        awayTeamAbbr="ATL"
        isNeutralSite={false}
      />,
    );

    expect(screen.getByText('Under 46.5')).toBeInTheDocument();
  });

  it('renders standard site correctly', () => {
    render(
      <TotalOption
        total={46.5}
        odds={0}
        type="under"
        homeTeamAbbr="DAL"
        awayTeamAbbr="ATL"
        isNeutralSite={false}
      />,
    );

    expect(screen.getByText('DAL @ ATL')).toBeInTheDocument();
  });

  it('renders neutral site correctly', () => {
    render(
      <TotalOption
        total={46.5}
        odds={0}
        type="under"
        homeTeamAbbr="DAL"
        awayTeamAbbr="ATL"
        isNeutralSite={true}
      />,
    );

    expect(screen.getByText('DAL vs. ATL')).toBeInTheDocument();
  });
});
