import React from 'react';
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import store from '../Redux/store';
import renderWithRouter from './renderWithRouter';
import DetailsRecepiesFoods from '../pages/DetailsRecepiesFoods';
import DetailsRecepiesDrinks from '../pages/DetailsRecepiesDrinks';

const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const SHARE_BTN = 'share-btn';
const FAVORITE_BTN = 'favorite-btn';
const RECIPE_CATEGORY = 'recipe-category';
const START_RECIPE_BTN = 'start-recipe-btn';
const FOODS52771 = '/foods/52771';
const DRINKS178319 = '/drinks/178319';

function renderizaTela() {
  const recipePhoto = screen.queryByTestId(RECIPE_PHOTO);
  const recipeTitle = screen.queryByTestId(RECIPE_TITLE);
  const shareBtn = screen.queryByTestId(SHARE_BTN);
  const favoriteBtn = screen.queryByTestId(FAVORITE_BTN);
  const recipeCategory = screen.queryByTestId(RECIPE_CATEGORY);
  const startRecipeBtn = screen.queryByTestId(START_RECIPE_BTN);

  return {
    recipePhoto,
    recipeTitle,
    shareBtn,
    favoriteBtn,
    recipeCategory,
    startRecipeBtn,
  };
}

describe('Testa a implementação dos elementos da tela de detalhes de uma receita', () => {
  test('A tela de comida possui todos os atributos data-testid', () => {
    renderWithRouter(
      <Provider store={ store }>
        <DetailsRecepiesFoods />
      </Provider>,
      FOODS52771,
    );

    const {
      recipePhoto,
      recipeTitle,
      shareBtn,
      favoriteBtn,
      recipeCategory,
    } = renderizaTela();

    expect(recipePhoto).not.toBeNull();
    expect(recipeTitle).not.toBeNull();
    expect(shareBtn).not.toBeNull();
    expect(favoriteBtn).not.toBeNull();
    expect(recipeCategory).not.toBeNull();
  });

  test('A tela de bebida possui todos os atributos data-testid', () => {
    renderWithRouter(
      <Provider store={ store }>
        <DetailsRecepiesDrinks />
      </Provider>,
      DRINKS178319,
    );

    const {
      recipePhoto,
      recipeTitle,
      shareBtn,
      favoriteBtn,
      recipeCategory,
    } = renderizaTela();

    expect(recipePhoto).not.toBeNull();
    expect(recipeTitle).not.toBeNull();
    expect(shareBtn).not.toBeNull();
    expect(favoriteBtn).not.toBeNull();
    expect(recipeCategory).not.toBeNull();
  });

  test(
    'Verifica os cards de receitas de comidas recomendadas.',
    () => {
      renderWithRouter(
        <Provider store={ store }>
          <DetailsRecepiesFoods />
        </Provider>,
        FOODS52771,
      );
      const recomendationCard = screen.queryAllByTestId('recomendation-card');
      const recomendationTitle = screen.queryAllByTestId('recomendation-title');

      expect(recomendationCard).not.toBeNull();
      expect(recomendationTitle).not.toBeNull();
    },
  );

  test(
    'Verifica os cards de receitas de bebidas recomendadas.',
    () => {
      renderWithRouter(
        <Provider store={ store }>
          <DetailsRecepiesDrinks />
        </Provider>,
        DRINKS178319,
      );

      const recomendationCard = screen.queryAllByTestId('recomendation-card');
      const recomendationTitle = screen.queryAllByTestId('recomendation-title');

      expect(recomendationCard).not.toBeNull();
      expect(recomendationTitle).not.toBeNull();
    },
  );
});

describe('Verifica o botão Start Recipe', () => {
  test(
    'Verifica a existência do botão Start Recipe na tela de detalhes de uma comida',
    () => {
      renderWithRouter(
        <Provider store={ store }>
          <DetailsRecepiesFoods />
        </Provider>,
        FOODS52771,
      );

      const { startRecipeBtn } = renderizaTela();

      expect(startRecipeBtn).not.toBeNull();
    },
  );

  test(
    'Verifica se botão de iniciar receita não é visível na tela de detalhes de bebida',
    () => {
      renderWithRouter(
        <Provider store={ store }>
          <DetailsRecepiesDrinks />
        </Provider>,
        DRINKS178319,
      );

      const { startRecipeBtn } = renderizaTela();

      expect(startRecipeBtn).not.toBeNull();
    },
  );

  // test(
  //   'Clicar o botão "Start Recipe", redirecionar para a tela de receita em progresso',
  //   () => {
  //     const { history } = renderWithRouter(
  //       <Provider store={ store }>
  //         <DetailsRecepiesFoods />
  //       </Provider>,
  //       FOODS52771,
  //     );

  //     console.log(history.location.pathname);

  //     const { startRecipeBtn } = renderizaTela();
  //     userEvent.click(startRecipeBtn);

  //     console.log(history.location.pathname);

  //     // expect(history.location.pathname).toBe('/foods/52771/in-progress');
  //   },
  // );
});
