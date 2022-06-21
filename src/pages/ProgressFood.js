import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { favoriteFood } from '../helps/localStore';
import { getFoodById } from '../services';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/CardDetails.css';
import '../styles/ProgressFood.css';

function ProgressFood() {
  const { id: ID } = useParams();
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [isCopy, setCopy] = useState(false);
  const [isPressed, setIsPressed] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchApiById = async () => {
      const res = await getFoodById(ID);
      setFoodDetails(res[0]);
    };
    fetchApiById();
    const saveDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = saveDrink?.some((recipe) => recipe.id === ID);
    setFavorite(isFavorite);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const MIN_LENGTH = 9;
    const MAX_LENGTH = 29;
    const START_MEASURE = 29;
    const END_MEASURE = 49;
    const ingredient = Object.values(foodDetails).slice(MIN_LENGTH, MAX_LENGTH);
    setIngredients(ingredient);
    const measure = Object.values(foodDetails).slice(START_MEASURE, END_MEASURE);
    setMeasures(measure);
  }, [foodDetails]);

  const handleClick = ({ target }) => {
    const ingredientFilter = ingredients.filter((i) => i === target.name && i !== '');
    setIsPressed([...isPressed, ...ingredientFilter]);
    if (isPressed.includes(target.name)) {
      setIsPressed(isPressed.filter((e) => e !== target.name));
    }
    const justIngredients = ingredients.filter((element) => element !== '');

    if (isPressed.length === justIngredients.length - 1) { // verificação do botão
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    verifyIsInProgressRecipe(ID, 'foods'); // localStorage
    JSON.parse(localStorage.getItem('verifyIsProgressRecipe'));
  };

  const handleFavorite = () => {
    favoriteFood(foodDetails);
    const saveDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = saveDrink.some((recipe) => recipe.id === ID);
    setFavorite(isFavorite);
  };

  const handleCopy = (idFood) => {
    copy(`http://localhost:3000/foods/${idFood}`);
    setCopy(!isCopy);
  };

  return (
    <div className="cardDetails-page">
      <div className="cardDetails">
        <img
          data-testid="recipe-photo"
          alt={ foodDetails?.strMeal }
          src={ foodDetails?.strMealThumb }
          className="img-cardDetails"
        />

        <h3
          data-testid="recipe-title"
          className="title-cardDetails"
        >
          { foodDetails?.strMeal }
        </h3>

        <div className="div-buttons">
          <button
            type="button"
            data-testid="share-btn"
            className="share-btn"
            onClick={ () => handleCopy(foodDetails.idMeal) }
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
          { foodDetails?.strCategory }
        </p>

        <div className="div-lista-ingredientes">

          <div className="ingredients-cardDetails">
            {ingredients
            && ingredients.map((ingredient, index) => ingredient && (
              <div key={ index }>
                <label
                  htmlFor={ ingredient }
                  className={ isPressed.includes(ingredient) ? 'btn-pressed' : '' } // inclui a classe
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    onChange={ handleClick }
                    checked={ isPressed.includes(ingredient) }
                    id={ ingredient }
                    type="checkbox"
                    key={ index }
                    name={ ingredient }
                    value={ ingredient }
                  />

                  {`${ingredient} - ${measures[index]}`}
                </label>
              </div>
            ))}
          </div>
        </div>

        <p
          data-testid="instructions"
          className="instructions"
        >
          { foodDetails?.strInstructions }
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

export default ProgressFood;
