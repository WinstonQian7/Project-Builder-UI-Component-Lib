import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

function renderCheckbox() {
  return render(<Checkbox />);
}

describe('Checkbox', () => {
  it('renders the checkbox', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox')).toBeVisible();
  });
  it('no a11y violation', async () => {
    const { container } = renderCheckbox();
    expect(await axe(container)).toHaveNoViolations();
  })
});
