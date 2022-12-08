import React from "react";

export default function DrinkCard({ drink }) {
    const id = drink.idDrink;
    const name = drink.strDrink;
    const category = drink.strCategory;
    const glass = drink.strGlass;
    const instructions = drink.strInstructions;
    // const instructionsES = drink.strInstructionsES;
    const ingredients = [];
  
    // loop from 1 to 10, push an li of each ingredient and measurement to variable ingredients
    for ( let i = 1 ; i <= 10 ; i++ ) {
      if ( drink[`strIngredient${i}`] ) {
        ingredients.push(
          <li key={i} className="text-xl">
            {drink[`strMeasure${i}`]} {drink[`strIngredient${i}`]}
          </li>
          );
      }
    }
  
    return (   
      <div>
        {/* Displayed cocktail card */}
        <li className='flex justify-center w:auto'>
          <label htmlFor={id} className="card card-compact w-96 shadow-xl bg-base-200 hover:bg-base-300 hover:cursor-pointer">
            <figure className='px-10 pt-10'><img src={drink.strDrinkThumb} alt="Cat" className='rounded-xl'/></figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">{name}</h2>
              <p className="text-xl">{category}</p>
              <div className="card-actions">
                <label htmlFor={id} className="btn btn-outline">More Info</label>
              </div>
            </div>
          </label>
        </li>
  
        {/* Hidden cocktail card with full info to be opened on click */}
        <input type="checkbox" id={id} className="modal-toggle" />
        <label htmlFor={id} className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <label htmlFor={id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <figure className='pb-8 px-10 pt-10'><img src={drink.strDrinkThumb} alt="Cat" className='rounded-xl'/></figure>
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="text-xl py-4"><strong>Glass:</strong> {glass}</p>
            <span className="text-xl"><strong>Ingredients:</strong></span>
            <ul className="pb-4">
              {ingredients}
            </ul>
            <span className="text-xl"><strong>Instructions:</strong></span>
            <p className="text-xl pb-8">{instructions}</p>
          </label>
        </label>
      </div>
    );
}