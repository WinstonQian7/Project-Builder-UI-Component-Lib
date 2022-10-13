import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 3rem;
`;

const SearchBarStyle = styled.input<{ dropdownOpen: boolean }>`
  background: #000;
  border-radius: 1.2rem;
  height: 55%;
  width: 100%;
  max-width: 25rem;
  font-weight: 800;
  color: #ffffff;
  
  padding: 0.25rem 0 0.25rem 2rem;
  background-image: url("/search.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0.2rem 0.1rem;
  box-sizing: border-box;

  &:focus, &:active {
    border: none; 
    outline: none;
    box-shadow: none;
  }

  ${prop => prop.dropdownOpen && css`
    border-radius: 1rem 1.2rem 0 0;
    border: none; 
    outline: none;
    box-shadow: none;
  `}
`

const Dropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 3rem;
  margin-bottom: 0.25rem;
  z-index: 1;
  cursor: default;
`

const DropdownItem = styled.div`
  background: #000;
  color: #fff;
  max-width: 25rem;
  height: 55%;
  min-height: 1.75rem;
  padding: 0.25rem 0 0.5rem 2rem;
  background-image: url(/search.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 0.2rem 0.1rem;
  box-sizing: border-box;

  &:hover {
    background-color: gray;
  }
`

export interface SearchBarProps {
  searchOptions: string[];
  userInputMatchedListener?: (input: string) => void;
  ariaLabel?: string;
}

export function SearchBar({
  searchOptions,
  userInputMatchedListener,
  ariaLabel,
}: SearchBarProps) {
  const [userSearch, setUserSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [filteredSearchOptions, setFilteredSearchOptions] = useState<string[]>([]);

  useEffect(function openDropdown() {
    if (dropdownOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
          setDropdownOpen(false);
          e.preventDefault();
        }
      }
      window.addEventListener('click', clickOutsideMenu);
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('click', clickOutsideMenu);
        window.removeEventListener('keydown', handleKeyDown)
      };
    }

    if (searchClicked) {
      window.addEventListener('click', clickOutsideMenu);
      return () => {
        window.removeEventListener('click', clickOutsideMenu);
      };
    }
  }, [dropdownOpen, userSearch, searchClicked])

  const clickOutsideMenu = (e: MouseEvent) => {
    e.stopPropagation();

    setSearchClicked(false);
    setDropdownOpen(false);
  }

  const searchInputListener = (e: React.FormEvent) => {
    if (e.target instanceof HTMLInputElement) {
      let currentUserSearch = e.target.value;
      const filteredSearchResults = filterSearch({searchOptions: searchOptions, userSearch: currentUserSearch});
      filteredSearchResults && filteredSearchResults.forEach(result => { 
        if (userInputMatchedListener && result.toLowerCase() === currentUserSearch.toLowerCase()) { 
          userInputMatchedListener(currentUserSearch);
        }
      });
      filteredSearchResults.length ? setDropdownOpen(true) : setDropdownOpen(false);

      setUserSearch(currentUserSearch);
      setFilteredSearchOptions(filteredSearchResults);
    }
  }

  const onClickSelectSearchOption = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLDivElement) {
      setUserSearch(e.target.textContent ?? userSearch);
      if (userInputMatchedListener) {
        userInputMatchedListener(userSearch);
      }
    }
    setDropdownOpen(false);
  };

  const onClickHandleUserInputNull = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setSearchClicked(true);
    }
  };

  const onSearchKeyDownChange = (e: React.KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
      if (e.key === 'v' && e.ctrlKey && e.target.value) {
        setUserSearch(e.target.value);
        setDropdownOpen(true);
      } else if (e.key === 'Escape' && !dropdownOpen) {
        setUserSearch('');
      }
    }
  }

  const filterSearch = ({searchOptions, userSearch, searchOptionDisplayLimit=5}: BaseSearchFilter) => {
    if (!searchOptions) {
      return [];
    }
  
    const processedInput = userSearch.toLowerCase();
    const processedSearchOptions = searchOptions.map(option => option.toLowerCase());
    const matchedSearches = processedSearchOptions.filter((option: string) => {
      if (processedInput.length && option.includes(processedInput)) {
        return option;
      }
      return false;
    });
    return matchedSearches.slice(0, searchOptionDisplayLimit);
  }

  return (
    <>
      <Container>
        <SearchBarStyle
          value={userSearch}
          onChange={searchInputListener}
          onKeyDown={onSearchKeyDownChange}
          onClick={onClickHandleUserInputNull}
          autoComplete="off"
          type="text"
          dropdownOpen={dropdownOpen}
          aria-label={ariaLabel ?? "search"}
        />
        {dropdownOpen &&
          <Dropdown role="menu">
            {filteredSearchOptions.map((post, idx) => (
              <DropdownItem key={idx} onClick={onClickSelectSearchOption} role="menuitem">{post}</DropdownItem>
            ))}
          </Dropdown>}
      </Container>
    </>
  );
}

interface BaseSearchFilter {
  searchOptions: string[];
  userSearch: string;
  searchOptionDisplayLimit?: number; 
}