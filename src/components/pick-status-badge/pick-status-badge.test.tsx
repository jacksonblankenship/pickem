import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { PickStatusBadge } from '.';

describe('PickStatusBadge', () => {
  const statuses = [
    {
      status: 'locked',
      label: 'Locked',
    },
    {
      status: 'loss',
      label: 'Loss',
    },
    {
      status: 'missed-pick',
      label: 'Missed Pick',
    },
    {
      status: 'not-picked',
      label: 'Not Picked',
    },
    {
      status: 'push',
      label: 'Push',
    },
    {
      status: 'win',
      label: 'Win',
    },
  ] as const;

  statuses.forEach(({ status, label }) => {
    it(`renders the ${status} category correctly`, () => {
      render(<PickStatusBadge status={status} />);

      expect(screen.getByRole('text')).toHaveTextContent(label);
    });
  });
});
