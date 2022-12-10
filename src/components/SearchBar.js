import React from "react";

export default function SearchBar({ data, setData, paginationIsActive, setPaginationIsActive }) {
    return (
      // Form with text input search bar, onChange handler on the text input to update the rendered drink list
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="container w-full py-8">
          <label className="flex justify-center label">
            <span className="label-text text-2xl">Enter a cocktail name or specific ingredients.</span>
          </label>
          <input type="text"
            value={data.searchName}
            placeholder="Mojito"
            className="input input-bordered w-full max-w-xs text-xl"
            onClick={ () => setPaginationIsActive(paginationIsActive => paginationIsActive + 1) }
            onChange={(e) => setData({ ...data, searchLetter: '', searchName: e.target.value })} />
        </div>
      </form>
    );
  }