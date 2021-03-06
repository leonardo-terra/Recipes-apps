import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES } from '../helpers';
import { fetchDrinksIngredients } from '../helpers/fetchDrinkAPI';
import {
  action,
  DRINK_DATA,
  fetchIngredientsDrinkListThunk,
  INGREDIENTS_FILTER,
} from '../redux/actions';
import '../styles/Foods.css';

export default function ExploreDrinksIngredients() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchIngredientsDrinkListThunk());
  }, []);

  const ingredientsList = useSelector(
    ({ ingredientsDrinkList }) => ingredientsDrinkList,
  );

  const filterByIngredient = async (searchInput) => {
    const { drinks } = await fetchDrinksIngredients(searchInput);
    dispatch(action(DRINK_DATA, drinks));
    dispatch(action(INGREDIENTS_FILTER, false));
    history.push('/drinks');
  };

  return (
    <div>
      <Header title="Explore Ingredients" />
      {ingredientsList
        .filter((_, index) => index < FIRST_TWELVE_RECIPES)
        .map((ingredient, index) => (
          <button
            type="button"
            key={ ingredient.strIngredient1 }
            className="container"
            data-testid={ `${index}-ingredient` }
            onClick={ () => filterByIngredient(ingredient.strIngredient1) }
          >
            <Card
              style={ { width: '18rem' } }
              data-testid={ `${index}-ingredient-card` }
            >
              <Card.Img
                variant="top"
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                data-testid={ `${index}-card-img` }
              />
              <Card.Body>
                <Card.Title
                  data-testid={ `${index}-card-name` }
                >
                  { ingredient.strIngredient1 }
                </Card.Title>
              </Card.Body>
            </Card>
          </button>
        ))}
      <Footer />
    </div>
  );
}
