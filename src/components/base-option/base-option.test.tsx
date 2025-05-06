import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BaseOption } from '.';

describe('BaseOption', () => {
  it('renders basic information correctly', () => {
    render(
      <BaseOption title="Test Title" subtitle="Test Subtitle" odds={110} />,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('(+110)')).toBeInTheDocument();
  });

  it('renders negative odds correctly', () => {
    render(
      <BaseOption title="Test Title" subtitle="Test Subtitle" odds={-110} />,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('(-110)')).toBeInTheDocument();
  });

  it('renders positive odds correctly', () => {
    render(
      <BaseOption title="Test Title" subtitle="Test Subtitle" odds={110} />,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('(+110)')).toBeInTheDocument();
  });

  it('renders with image correctly', () => {
    render(
      <BaseOption
        title="Test Title"
        subtitle=""
        odds={0}
        imageUrl="https://picsum.photos/200/300"
      />,
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://picsum.photos/200/300');
    expect(image).toHaveAttribute('alt', 'Test Title');
  });

  it('renders without image correctly', () => {
    render(<BaseOption title="" subtitle="" odds={0} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
