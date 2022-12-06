import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState({
    searchLetter: "a",
    searchName: '',
    apiResults: [],
  });

  useEffect(() => {
    // If data.searchLetter is not empty, fetch the api data for the selected letter
    if (data.searchLetter !== "") {
      const timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            const res = await axios.get(`https:/www.thecocktaildb.com/api/json/v1/1/search.php?f=${data.searchLetter}`);
            setData({ ...data, apiResults: res.data.drinks });
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [data.searchLetter]);

  // If data.searchName is not empty, fetch the api data for the text input
  useEffect(() => {
    if (data.searchName !== "") {
      const timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            const res = await axios.get(`https:/www.thecocktaildb.com/api/json/v1/1/search.php?s=${data.searchName}`);
            setData({ ...data, apiResults: res.data.drinks });
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [data.searchName]);

  return { data, setData };
};

export default useFetch;