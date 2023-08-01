import React, { ChangeEvent } from "react";

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Search a product..."
      onChange={handleSearchChange}
      className="px-4 py-2 border border-gray-400 rounded-md sm:w-full md:w-1/4 lg:w-1/2"
    />
  );
};

export default SearchBar;
