import React from "react";

export default function LetterPagination({
    data,
    setData
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
          onChange={(e) => setData({ ...data, searchLetter: e.target.value, searchName: '' })} />
        )
      };
      
    return (
        <div className="btn-group flex flex-wrap justify-center pb-8">
          {buttons}
        </div>
    );
}