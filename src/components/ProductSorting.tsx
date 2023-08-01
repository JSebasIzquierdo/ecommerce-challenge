import React, { ChangeEvent } from "react";

export interface ProductSortingProps {
  sortBy: string;
  onSortChange: (selectedOption: string) => void;
}

const ProductSorting = ({ sortBy, onSortChange }: ProductSortingProps) => {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSortChange(selectedOption);
  };

  return (
    <div className="mt-4 mb-6 flex justify-center items-center">
      <label htmlFor="sortSelect" className="mr-2">
        Sort By:
      </label>
      <select
        id="sortSelect"
        className="px-4 py-2 border border-gray-400 rounded-md"
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="">Select Sorting Option</option>
        <option value="priceAsc">Price Asc</option>
        <option value="priceDesc">Price Desc</option>
        <option value="ratingAsc">Rating Asc</option>
        <option value="ratingDesc">Rating Desc</option>
      </select>
    </div>
  );
};

export default ProductSorting;
