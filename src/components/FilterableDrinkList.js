import React from "react";
import SearchBar from "./SearchBar";
import LetterPagination from "./LetterPagination";
import DrinkList from "./DrinkList";
import useFetch from "../hooks/useFetch";

export default function FilterableDrinkList() {
    const { data, setData } = useFetch();
    
    return (
      <div>
        <SearchBar
          data={data}
          setData={setData} />
        <LetterPagination
          data={data}
          setData={setData} />
        {/* If the API data has arrived show the DrinkList, else show a loading screen */}
        {data.apiResults ? <DrinkList data={data} /> : <h3>No Results</h3> }
      </div>
    );
}