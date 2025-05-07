import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { PickStatusIcon } from '.';

describe('PickStatusIcon', () => {
  const statuses = [
    'locked',
    'loss',
    'missed-pick',
    'not-picked',
    'push',
    'win',
  ] as const;

  statuses.forEach(status => {
    it(`renders the ${status} category correctly`, () => {
      render(<PickStatusIcon status={status} />);

      expect(
        screen.getByRole('img', {
          name: `Pick status: ${status}`,
        }),
      ).toBeInTheDocument();
    });
  });
});
