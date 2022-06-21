import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getDrinkById } from '../services';
import { favoriteDrink } from '../helps/localStore';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/CardDetails.css';
import '../styles/ProgressFood.css';

function DrinkProgress() {
  const { id: ID } = useParams();
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isCopy, setCopy] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isPressed, setIsPressed] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchApiById = async () => {
      const res = await getDrinkById(ID);
      setDrinkDetails(res[0]);
    };
    fetchApiById();
    const saveDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = saveDrink?.some((recipe) => recipe.id === ID);
    setFavorite(isFavorite);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ingridientAndMesure = Object.entries(drinkDetails);
    const allIngredient = ingridientAndMesure
      .filter(([ingredient]) => ingredient.includes('strIngredient'));
    setIngredients(allIngredient);
    const allMeasure = ingridientAndMesure
      .filter(([measure]) => measure.includes('strMeasure'));
    setMeasures(allMeasure);
  }, [drinkDetails]);

  const handleClick = ({ target }) => {
    const ingredientFilter = ingredients.filter((i) => i[1] === target.name
     && i[1] !== null)[0][1];
    // const ingredientPress = ingredientFilter.filter((ele) => ele.length === 1);
    // -> comentado por enquanto, estava quebrando o código.
    // bem como removido set do estado e função do localstorge.
    setIsPressed([...isPressed, ingredientFilter]);
    if (isPressed.includes(target.name)) {
      setIsPressed(isPressed.filter((e) => e !== target.name));
    }

    const justIngredients = ingredients.filter((ele) => ele[1] !== null);
    if (isPressed.length === justIngredients.length - 1) { // verificação do botão
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // chamar a função do localStorage, passar o estado atual como parametro, enviar a função no getItem
    console.log(justIngredients);
    console.log(isPressed);
  };

  const handleCopy = (idDrink) => {
    copy(`http://localhost:3000/drinks/${idDrink}`);
    setCopy(!isCopy);
  };

  const handleFavorite = () => {
    favoriteDrink(drinkDetails);
    const saveDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = saveDrink?.some((recipe) => recipe.id === ID);
    setFavorite(isFavorite);
  };

  return (
    <div className="cardDetails-page">
      <div className="cardDetails">
        <img
          data-testid="recipe-photo"
          alt={ drinkDetails?.strDrink }
          src={ drinkDetails?.strDrinkThumb }
          className="img-cardDetails"
        />

        <h3
          data-testid="recipe-title"
          className="title-cardDetails"
        >
          { drinkDetails?.strDrink }
        </h3>

        <div className="div-buttons">

          <button
            type="button"
            data-testid="share-btn"
            className="share-btn"
            onClick={ () => handleCopy(drinkDetails.idDrink) }
          >
            { isCopy ? 'Link copied!' : 'Compartilhar'}
          </button>

          {
            !favorite ? (
              <button
                type="button"
                onClick={ () => handleFavorite() }
                data-testid="favorite-btn"
                className="favorite-btn"
                src={ whiteHeartIcon }
              >
                <img src={ whiteHeartIcon } alt="favorite" />
              </button>
            ) : (
              <button
                type="button"
                onClick={ () => handleFavorite() }
                data-testid="favorite-btn"
                className="favorite-btn"
                src={ blackHeartIcon }
              >
                <img src={ blackHeartIcon } alt="favorite" />
              </button>
            )
          }
        </div>

        <p
          data-testid="recipe-category"
          className="recipe-category"
        >
          { drinkDetails?.strAlcoholic }
        </p>

        <div className="div-lista-ingredientes">
          <div className="ingredients-cardDetails">
            { ingredients
            && ingredients.map(([, ingredient], index) => ingredient && (
              <label
                htmlFor={ ingredient }
                data-testid={ `${index}-ingredient-step` }
                key={ index }
                className={ isPressed.includes(ingredient) ? 'btn-pressed' : '' }
              >
                <input
                  id={ ingredient }
                  type="checkbox"
                  onChange={ handleClick }
                  checked={ isPressed.includes(ingredient) }
                  key={ index }
                  name={ ingredient }
                  value={ ingredient }
                />

                {`${ingredient} - ${measures[index][1]}`}
              </label>
            ))}
          </div>
        </div>

        <p
          data-testid="instructions"
          className="instructions"
        >
          { drinkDetails?.strInstructions }
        </p>

        <button
          data-testid="finish-recipe-btn"
          className="start-recipe-btn"
          type="button"
          disabled={ isDisabled }
          onClick={ () => history.replace('/done-recipes') }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default DrinkProgress;
