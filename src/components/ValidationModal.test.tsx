import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from "jest-axe";
import { ValidationModal } from "./ValidationModal";

expect.extend(toHaveNoViolations);

function renderValidationModal() {
  return render(
    <ValidationModal onClick={jest.fn()}/>
  );
}

describe('Validation Modal', () => {
  it('renders the modal', () => {
    renderValidationModal();
    expect(screen.getByRole('button')).toBeVisible();
    expect(screen.getByRole('img')).toBeVisible();
    expect(screen.getByRole('button')).toBeVisible();
  });
  it('no a11y violation', async () => {
    const { container } = renderValidationModal();
    expect(await axe(container)).toHaveNoViolations();
  })
});