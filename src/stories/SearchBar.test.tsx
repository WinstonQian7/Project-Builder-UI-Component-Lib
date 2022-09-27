import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import { SearchBar } from './SearchBar';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
const mockUserInputCallback = jest.fn();

const fakeSuggestions = ['series one', 'series two', 'series three', 'series four', 'series five'];
function renderSearchBar(searchOptions?: string[]) {
  return render(
    <SearchBar searchOptions={searchOptions ?? fakeSuggestions} userInputMatchedListener={mockUserInputCallback} />
  );
}

describe('SearchBar', () => {
  it('renders search bar with default text and menu closed', () => {
    renderSearchBar();

    expect(screen.getByRole('textbox').getAttribute('value')).toStrictEqual("");
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('clicking on search bar prior to entering any input displays no text', async () => {
    renderSearchBar();

    await userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByRole('textbox').getAttribute('value')).toStrictEqual("");
  });

  it('entering text input with matching search filter options will render menu with search filter options', async () => {
    renderSearchBar();
    const searchOptionFirst = fakeSuggestions[0];

    await userEvent.type(screen.getByRole('textbox'), searchOptionFirst);

    expect(screen.getByRole('menu')).toBeVisible();
    expect(screen.getByRole('menuitem', { name: searchOptionFirst })).toBeVisible();
  });

  it('entering text input with no matching search filter options will not render menu with search filter options', async () => {
    renderSearchBar();

    await userEvent.type(screen.getByRole('textbox'), "a");

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fakeSuggestions.forEach(option => {
      expect(screen.queryByRole('menuitem', { name: option })).not.toBeInTheDocument();
    })
  });

  it('clicking on search option changes search input to search option and closes menu', async () => {
    renderSearchBar();
    const clickedOption = fakeSuggestions[0];

    await userEvent.type(screen.getByRole('textbox'), "series");
    await userEvent.click(screen.getByRole('menuitem', { name: clickedOption }));

    expect(screen.getByRole('textbox').getAttribute('value')).toStrictEqual(clickedOption);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it.skip('search input listener when user input matches a search option returns user input', async () => {
    renderSearchBar();
    const clickedOption = fakeSuggestions[0];

    await userEvent.type(screen.getByRole('textbox'), clickedOption);

    expect(mockUserInputCallback.mock.results[0].value).toStrictEqual(clickedOption);
  });

  it.todo('clicking outside menu closes menu');
  it.todo('pressing escape key closes menu while menu opened');
  it.todo('pressing escape key removes user input while menu is closed');
  it.todo('ctrl + v key pastes text into search');

  it('no a11y violations', async () => {
    const { container } = renderSearchBar();

    expect(await axe(container)).toHaveNoViolations();
  });
})


const defaultSearchOptionDisplayLimit = 5;
describe('search bar default filter', () => {
  it('when menu opened maximum of five search options displayed by default', async () => {
    renderSearchBar();

    await userEvent.click(screen.getByRole('textbox'))
    await userEvent.keyboard('series');

    expect(screen.getAllByRole('menuitem')).toHaveLength(defaultSearchOptionDisplayLimit);
  });

  it('search input with different capitalization should return matching search option', async () => {
    renderSearchBar();
    const searchOptionFirst = fakeSuggestions[0];

    await userEvent.click(screen.getByRole('textbox'))
    await userEvent.keyboard(searchOptionFirst.toUpperCase());

    expect(screen.getByRole('menuitem', { name: searchOptionFirst })).toBeVisible();
  });

  it('search input that is a substring of a search option should return matching search option', async () => {
    renderSearchBar();
    const searchOptionFirst = fakeSuggestions[0];

    await userEvent.click(screen.getByRole('textbox'))
    await userEvent.keyboard(searchOptionFirst.substring(0,1));

    fakeSuggestions.forEach(option => {
      expect(screen.getByRole('menuitem', { name: option })).toBeVisible();
    })
  });
})