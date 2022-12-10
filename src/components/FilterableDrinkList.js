import React from "react";
import SearchBar from "./SearchBar";
import LetterPagination from "./LetterPagination";
import DrinkList from "./DrinkList";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

export default function FilterableDrinkList() {
    const { data, setData } = useFetch();
    const [ paginationIsActive, setPaginationIsActive ] = useState(0);
    
    return (
      <div>
        <SearchBar
          data={data}
          setData={setData}
          paginationIsActive={paginationIsActive}
          setPaginationIsActive={setPaginationIsActive} />
        <LetterPagination
          data={data}
          setData={setData}
          key={paginationIsActive} />
        {/* If the API data has arrived show the DrinkList, else show a loading screen */}
        {data.apiResults ? <DrinkList data={data} /> : <h3>No Results</h3> }
      </div>
    );
}