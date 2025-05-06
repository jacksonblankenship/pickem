import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PickOverviewItem } from '.';

describe('PickOverviewItem', () => {
  it('renders the label correctly', () => {
    render(<PickOverviewItem type="favorite" status="win" />);

    expect(screen.getByText('favorite:')).toBeInTheDocument();
  });

  it('renders the win status correctly', () => {
    render(<PickOverviewItem type="favorite" status="win" />);

    expect(screen.getByText('Win')).toBeInTheDocument();
    expect(screen.getByLabelText('Win')).toBeInTheDocument();
  });

  it('renders the loss status correctly', () => {
    render(<PickOverviewItem type="favorite" status="loss" />);

    expect(screen.getByText('Loss')).toBeInTheDocument();
    expect(screen.getByLabelText('Loss')).toBeInTheDocument();
  });

  it('renders the locked status correctly', () => {
    render(<PickOverviewItem type="favorite" status="locked" />);

    expect(screen.getByText('Locked')).toBeInTheDocument();
    expect(screen.getByLabelText('Locked')).toBeInTheDocument();
  });

  it('renders the not picked status correctly', () => {
    render(<PickOverviewItem type="favorite" status="not-picked" />);

    expect(screen.getByText('Not Picked')).toBeInTheDocument();
    expect(screen.getByLabelText('Not Picked')).toBeInTheDocument();
  });

  it('renders the push status correctly', () => {
    render(<PickOverviewItem type="favorite" status="push" />);

    expect(screen.getByText('Push')).toBeInTheDocument();
    expect(screen.getByLabelText('Push')).toBeInTheDocument();
  });

  it('renders the missed pick status correctly', () => {
    render(<PickOverviewItem type="favorite" status="missed-pick" />);

    expect(screen.getByText('Missed Pick')).toBeInTheDocument();
    expect(screen.getByLabelText('Missed Pick')).toBeInTheDocument();
  });
});
