import React, { Component } from 'react';
import './style.css';
import Likebutton from './Likebutton.js';

function openIframe (recipe) {
  return (
    <iframe src={recipe["recipe"]["url"]} frameborder="0" width="500" height="500"></iframe>
  )
  /*return (
    <iframe src={recipe["recipe"]["url"]} 
            width={1000} 
            height={500} 
            title={recipe["recipe"]["label"]}>
    </iframe>
  )*/ 
}

function Recipetile({recipe}){
  return(
    // recipe["recipe"]["image"].match(/\.(jpeg|jpg|gif|png)$/) != null && (
      <div className="recipeTile">
        <img
          className="recipeTile__image"
          src={recipe["recipe"]["image"]}
          alt="tile-image"
          //onClick={() => window.open(recipe["recipe"]["url"])}
          onClick={() =>  openIframe()
            }
        />
        <p className="recipeTile__name">{recipe["recipe"]["label"]}</p>
          <Likebutton/>
      </div>
    // )
  );
}
export default Recipetile;
