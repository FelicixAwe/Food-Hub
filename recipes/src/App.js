import "./App.css";
import {useState} from 'react';
import Axios from 'axios';
import Recipetile from "./recipetile/Recipetile"
import Morebutton from "./recipetile/Morebutton";
function App(){
  const YOUR_APP_ID = "ee6c3f5d";
  const YOUR_APP_KEY = "1ccd430c18f35bf736ae16bea0382b47";
  const [query, setQuery] = useState("");
  const [healthLabel, setHealthLabel] = useState("vegetarian")
  const [recipes, setRecipes] = useState([]);

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=alcohol-free`;
  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result.data.hits);
  }

  const onSubmit=(e) => {
    e.preventDefault(); //This will prevent page from reloading.
    getRecipeInfo();
  }

  return (
  <div className="app">
    <h1 onClick={getRecipeInfo}>
      <u>Food Recipe Hub </u>🥗
    </h1>
    <form className="app__searchForm" onSubmit={onSubmit}>
      < input
          type = "text"
          placeholder = "Type the Ingredient"
          autoComplete = "Off"
          className = "app__input"
          value = {query}
          onChange={(e) => {setQuery(e.target.value);}}
          />
          <select className="app__healthLabels">
            <option value="vegan" onClick={() => {setHealthLabel("vegan")}}>vegan</option>
            <option value="vegetarian" onClick={() => {setHealthLabel("vegetarian")}}>vegetarian</option>
            <option value="low-sugar" onClick={() => {setHealthLabel("low-sugar")}}>low-sugar</option>
            <option value="dairy-free" onClick={() => {setHealthLabel("dairy-free")}}>dairy-free</option>
            <option value="immuo-supportive" onClick={() => {setHealthLabel("immuo-supportive")}}>immuo-supportive</option>
            <option value="wheat-free" onClick={() => {setHealthLabel("wheat-free")}}>wheat-free</option>
          </select>
          <input type="submit" value="Get Recipe" className="app__submit" />
     </form>
     <div className="app_recipes">
      {recipes.map((recipe) => {
        return <Recipetile recipe={recipe} />;
      })}
     </div>
     <div className="app_Morebutton">
       <Morebutton />
     </div>
  </div>
  );
}

export default App;