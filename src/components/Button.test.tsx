import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

function renderButton() {
  return render(<Button onClick={jest.fn()}/>);
}

describe('Button', () => {
  it('renders the button', () => {
    renderButton();
    expect(screen.getByRole('button')).toBeVisible();
  });
  it('no a11y violation', async () => {
    const { container } = renderButton();
    expect(await axe(container)).toHaveNoViolations();
  })
});
