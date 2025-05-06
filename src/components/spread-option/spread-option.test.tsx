import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SpreadOption } from '.';
import DallasCowboysLogo from '../../assets/logos/DAL.png';

describe('SpreadOption', () => {
  it('renders negative spread correctly', () => {
    render(<SpreadOption teamAbbr="DAL" spread={-1.5} odds={0} />);

    expect(screen.getByText('DAL')).toBeInTheDocument();
    expect(screen.getByText('-1.5')).toBeInTheDocument();
  });

  it('renders positive spread correctly', () => {
    render(<SpreadOption teamAbbr="DAL" spread={1.5} odds={0} />);

    expect(screen.getByText('DAL')).toBeInTheDocument();
    expect(screen.getByText('+1.5')).toBeInTheDocument();
  });

  it('renders team logo correctly', () => {
    render(<SpreadOption teamAbbr="DAL" spread={0} odds={0} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'DAL');
    expect(image).toHaveAttribute('src', DallasCowboysLogo);
  });
});
