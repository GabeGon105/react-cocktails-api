import pikachu3 from './pika_drinking3.png';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import useFetchByLetter from './hooks/useFetchByLetter';
import useFetchByName from './hooks/useFetchByName';


function DrinkCard({ drink }) {
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
        <div className="card card-compact w-96 bg-base-200 shadow-xl">
          <figure className='px-10 pt-10'><img src={drink.strDrinkThumb} alt="Cat" className='rounded-xl'/></figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{name}</h2>
            <p className="text-xl">{category}</p>
            <div className="card-actions">
              <label htmlFor={id} className="btn btn-primary">More Info</label>
            </div>
          </div>
        </div>
      </li>

      {/* Hidden cocktail card with full info to be opened on click */}
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
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

function SearchBar({
  filterText,
  onFilterTextChange
  }) {
  return (
    // Form with text input search bar, onChange handler on the text input to update the rendered drink list
    <form>
      <div className="container w-full py-8">
        <label className="flex justify-center label">
          <span className="label-text text-2xl">Enter a cocktail name or specific ingredients.</span>
        </label>
        <input type="text"
          value={filterText}
          placeholder="Mojito"
          className="input input-bordered w-full max-w-xs text-xl"
          onChange={(e) => onFilterTextChange(e.target.value)} />
      </div>
    </form>
  );
}

function LetterPagination({
  filterLetter,
  onFilterLetterChange,
  }) {
    const buttons = [];
    const letterDictionary = 'abcdefghijklmnopqrstuvwxyz'.split('');

    // Push one button for each letter of the alphabet to variable buttons
    for ( let i = 0; i <= 25; i++ ) {
      buttons.push(
        <input type="radio"
        name="options"
        key={i}
        value={letterDictionary[i]}
        data-title={letterDictionary[i]}
        className="btn btn-sm"
        onClick={(e) => {
          onFilterLetterChange(e.target.value);
        }
        } />
      )
    };
    
  return (
      <div className="btn-group flex flex-wrap justify-center pb-8">
        {buttons}
      </div>
  );
}

function DrinkList({ drinks, filterText }) {
  const cards = [];

  // **NOT WORKING** Loop through drinks and push a DrinkCard to variable card for each drink
  drinks.forEach((drink) => {
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
    console.log('hi :)') // test to see if and loop occurs
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

function FilterableDrinkList() {
  const [filterText, setFilterText] = useState('');
  const [filterLetter, setFilterLetter] = useState('a');
  const [loading, setLoading] = useState(false);
  const [drinks, setDrinks] = useState([]);
  
  useEffect( () => {
    // An async function to fetch api data from the CocktailDB api, parse the response to JSON, then store the JSON data in the drinks state
    const getDrinksByLetter = async () => {

      // Set the loading state to true until the fetch api resolves
      setLoading(true);

      // Await the fetch to resolve, then continue with the returned data
      try {
        const res = await fetch(`https:/www.thecocktaildb.com/api/json/v1/1/search.php?f=${filterLetter}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // convert fetch response to JSON
        const data = await res.json();

        // Store the JSON data in the drinks state
        setDrinks(data.drinks);

        // Set the loading state to false
        setLoading(false);
      }
      catch (error) {
        console.error(`Could not get data: ${error}`);
      }
    }
    // Call the function
    getDrinksByLetter();
  }, []);

  return (
    <div>
      <SearchBar 
        filterText={filterText}
        onFilterTextChange={setFilterText} />
      <LetterPagination
        filterLetter={filterLetter}
        onFilterLetterChange={setFilterLetter} />
      {/* If the API data has not arrived yet show the loading screen, else show the DrinkList */}
      {loading
        ? <h4>Loading...</h4>
        : <DrinkList 
          drinks={drinks} 
          filterText={filterText} />
      }
    </div>
  );
}

// const DRINKS = [
//       {
//           "idDrink": "15997",
//           "strDrink": "GG",
//           "strCategory": "Ordinary Drink",
//           "strGlass": "Collins Glass",
//           "strInstructions": "Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.",
//           "strInstructionsES": null,
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
//           "strIngredient1": "Galliano",
//           "strIngredient2": "Ginger ale",
//           "strIngredient3": "Ice",
//           "strIngredient4": null,
//           "strIngredient5": null,
//           "strMeasure1": "2 1/2 shots ",
//           "strMeasure2": null,
//           "strMeasure3": null,
//           "strMeasure4": null,
//           "strMeasure5": null,
          
//       },
//       {
//           "idDrink": "17222",
//           "strDrink": "A1",
//           "strCategory": "Cocktail",
//           "strGlass": "Cocktail glass",
//           "strInstructions": "Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.",
//           "strInstructionsES": "Vierta todos los ingredientes en una coctelera, mezcle y sirva con hielo en un vaso frío.",
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
//           "strIngredient1": "Gin",
//           "strIngredient2": "Grand Marnier",
//           "strIngredient3": "Lemon Juice",
//           "strIngredient4": "Grenadine",
//           "strIngredient5": null,
//           "strMeasure1": "1 3/4 shot ",
//           "strMeasure2": "1 Shot ",
//           "strMeasure3": "1/4 Shot",
//           "strMeasure4": "1/8 Shot",
//           "strMeasure5": null,
//       },
//       {
//           "idDrink": "13501",
//           "strDrink": "ABC",
//           "strCategory": "Shot",
//           "strGlass": "Shot glass",
//           "strInstructions": "Layered in a shot glass.",
//           "strInstructionsES": "Coloque todos los ingredientes en un vaso de chupito.",
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg",
//           "strIngredient1": "Amaretto",
//           "strIngredient2": "Baileys irish cream",
//           "strIngredient3": "Cognac",
//           "strIngredient4": null,
//           "strIngredient5": null,
//           "strMeasure1": "1/3 ",
//           "strMeasure2": "1/3 ",
//           "strMeasure3": "1/3 ",
//           "strMeasure4": null,
//           "strMeasure5": null,
//       },
//       {
//           "idDrink": "17203",
//           "strDrink": "Kir",
//           "strCategory": "Ordinary Drink",
//           "strGlass": "Wine Glass",
//           "strInstructions": "Add the crème de cassis to the bottom of the glass, then top up with wine.",
//           "strInstructionsES": null,
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg",
//           "strIngredient1": "Creme de Cassis",
//           "strIngredient2": "Champagne",
//           "strIngredient3": null,
//           "strIngredient4": null,
//           "strIngredient5": null,
//           "strMeasure1": "1 part ",
//           "strMeasure2": "5 parts ",
//           "strMeasure3": null,
//           "strMeasure4": null,
//           "strMeasure5": null,
//       },
//       {
//           "idDrink": "14229",
//           "strDrink": "747",
//           "strCategory": "Shot",
//           "strGlass": "Shot glass",
//           "strInstructions": "pour kaluha, then Baileys, then Frangelico not chilled and not layered -- SERVE!!!",
//           "strInstructionsES": null,
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg",
//           "strIngredient1": "Kahlua",
//           "strIngredient2": "Baileys irish cream",
//           "strIngredient3": "Frangelico",
//           "strIngredient4": null,
//           "strIngredient5": null,
//           "strMeasure1": "1/3 part ",
//           "strMeasure2": "1/3 part ",
//           "strMeasure3": "1/3 part ",
//           "strMeasure4": null,
//           "strMeasure5": null,
//       },
//       {
//           "idDrink": "15288",
//           "strDrink": "252",
//           "strCategory": "Shot",
//           "strGlass": "Shot glass",
//           "strInstructions": "Add both ingredients to shot glass, shoot, and get drunk quick",
//           "strInstructionsES": null,
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg",
//           "strIngredient1": "151 proof rum",
//           "strIngredient2": "Wild Turkey",
//           "strIngredient3": null,
//           "strIngredient4": null,
//           "strIngredient5": null,
//           "strMeasure1": "1/2 shot Bacardi ",
//           "strMeasure2": "1/2 shot ",
//           "strMeasure3": null,
//           "strMeasure4": null,
//           "strMeasure5": null,
//       },
//       {
//           "idDrink": "17225",
//           "strDrink": "Ace",
//           "strCategory": "Cocktail",
//           "strGlass": "Martini Glass",
//           "strInstructions": "Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.",
//           "strInstructionsES": "Agite todos los ingredientes en una coctelera con hielo y entonces cuélelos sobre un vaso enfriado.",
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg",
//           "strIngredient1": "Gin",
//           "strIngredient2": "Grenadine",
//           "strIngredient3": "Heavy cream",
//           "strIngredient4": "Milk",
//           "strIngredient5": "Egg White",
//           "strMeasure1": "2 shots ",
//           "strMeasure2": "1/2 shot ",
//           "strMeasure3": "1/2 shot ",
//           "strMeasure4": "1/2 shot",
//           "strMeasure5": "1/2 Fresh",
//       },
//       {
//           "idDrink": "17837",
//           "strDrink": "Adam",
//           "strCategory": "Ordinary Drink",
//           "strGlass": "Cocktail glass",
//           "strInstructions": "In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.",
//           "strInstructionsES": "Mezclar todos los ingredientes en una coctelera con cubitos de hielo hasta la mitad. Agitar bien. Colar el contenido en un vaso de cóctel.",
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg",
//           "strIngredient1": "Dark rum",
//           "strIngredient2": "Lemon juice",
//           "strIngredient3": "Grenadine",
//           "strIngredient4": null,
//           "strIngredient5": null,
//           "strMeasure1": "2 oz ",
//           "strMeasure2": "1 oz ",
//           "strMeasure3": "1 tsp ",
//           "strMeasure4": null,
//           "strMeasure5": null,
//       },
//       {
//           "idDrink": "13332",
//           "strDrink": "B-53",
//           "strCategory": "Shot",
//           "strGlass": "Collins Glass",
//           "strInstructions": "Layer the Kahlua, Sambucca and Grand Marnier into a shot glas in that order. Better than B-52",
//           "strInstructionsES": null,
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/rwqxrv1461866023.jpg",
//           "strIngredient1": "Kahlua",
//           "strIngredient2": "Sambuca",
//           "strIngredient3": "Grand Marnier",
//           "strIngredient4": null,
//           "strIngredient5": null,
//           "strMeasure1": "1/3 shot ",
//           "strMeasure2": "1/3 shot ",
//           "strMeasure3": "1/3 shot ",
//           "strMeasure4": null,
//           "strMeasure5": null,
//       },
//       {
//           "idDrink": "13938",
//           "strDrink": "AT&T",
//           "strCategory": "Ordinary Drink",
//           "strGlass": "Highball Glass",
//           "strInstructions": "Pour Vodka and Gin over ice, add Tonic and Stir",
//           "strInstructionsES": "Vierta el vodka y la ginebra sobre el hielo, agregue la tónica y revuelva.",
//           "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg",
//           "strIngredient1": "Absolut Vodka",
//           "strIngredient2": "Gin",
//           "strIngredient3": "Tonic water",
//           "strIngredient4": null,
//           "strIngredient5": null,
//           "strMeasure1": "1 oz ",
//           "strMeasure2": "1 oz ",
//           "strMeasure3": "4 oz ",
//           "strMeasure4": null,
//           "strMeasure5": null,
//       }
//   ]

function App() {
  const ref = useRef(null);

  const handleGetStartedClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth', alignToTop: true});
  };

  return (
    <div className="App">

      {/* Nav bar */}
      <div className="navbar text-content">
        <div className="flex-1">
          <a href='./' className="btn btn-ghost normal-case text-xl">Bartender</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <a href='https://github.com/GabeGon105' target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current'><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
            </li>
            <li>
              <a href='https://twitter.com/gabegon1' target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            </li>
            <li>
              <a href='mailto:gabegon105@gmail.com' target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current'><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg></a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Hero intro section */}
      <div className="hero min-h-screen pb-8 bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={pikachu3} className="max-w-sm rounded-lg shadow-2xl" alt="Pikachu drinking from a cup" />
          <div className="container max-w-2xl">
            {/* <figure className='flex justify-center px-10 pt-10 pb-4'><img src={pikachu1} alt="Pikachu drinking juice with sunglasses on" className='rounded-xl'/></figure> */}
            <h1 className="text-5xl font-bold">Bartender</h1>
            <p className="py-6 text-xl">A drinks and cocktails database where you can find ingredients and instructions to craft new and old drinks.</p>
            <button className="btn btn-primary" onClick={handleGetStartedClick}>Get Started</button>
          </div>
        </div>
      </div>

      {/* Filterable drink list */}
      <div className='py-8' ref={ref}>
      <FilterableDrinkList/>
      </div>

      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div>
          <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d={"M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"}></path></svg>
          <p>ACME Industries Ltd.<br/>Providing reliable tech since 1992</p>
        </div> 
        <div>
          <span className="footer-title">Social</span> 
          <div className="grid grid-flow-col gap-4">
            <a href='https://github.com/GabeGon105' target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current'><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
            <a href='https://twitter.com/gabegon1' target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>  
            <a href='mailto:gabegon105@gmail.com' target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current'><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg></a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;