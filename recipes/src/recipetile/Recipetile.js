import React from 'react';
import './style.css';
import Likebutton from './Likebutton.js';
function Recipetile({recipe}){
  return(
    // recipe["recipe"]["image"].match(/\.(jpeg|jpg|gif|png)$/) != null && (
      <div className="recipeTile">
        <img
          className="recipeTile__image"
          src={recipe["recipe"]["image"]}
          alt="tile-image"
          onClick={() => window.open(recipe["recipe"]["url"])}
        />
        <p className="recipeTile__name">{recipe["recipe"]["label"]}</p>
          <Likebutton/>
      </div>
    // )
  );
}
export default Recipetile;
