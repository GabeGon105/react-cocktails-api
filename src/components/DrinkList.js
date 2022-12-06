import React from "react";
import DrinkCard from "./DrinkCard";

export default function DrinkList({ data }) {
    const cards = [];
  
    // Loop through data.apiResults and push a DrinkCard to variable card for each drink
    data.apiResults.forEach((drink) => {
      // if (
      //   drink.strDrink.toLowerCase().indexOf(
      //     filterText.toLowerCase()
      //   ) === -1
      // ) {
      //   return;
      // }
      cards.push(
        <DrinkCard
          drink={drink}
          key={drink.idDrink} />
      );
    });
  
    return (
      // Return a ul with each DrinkCard li
      <div>
        <ul className='grid gap-y-8 md:grid-cols-2 xl:grid-cols-3 list-none'>
          {cards}
        </ul>
  
        
      </div>
  
    );
}