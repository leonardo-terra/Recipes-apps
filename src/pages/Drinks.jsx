import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES } from '../helpers';
import './Foods.css';
import '../App.css';
import { action, DRINK_DATA } from '../redux/actions';

export default function Drinks() {
  const allDrinks = useSelector(({ drinkData }) => drinkData);
  const dispatch = useDispatch();

  useEffect(() => {
    const URL_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const fetchName = async () => {
      const { drinks } = await fetch(URL_NAME).then((response) => response.json());
      dispatch(action(DRINK_DATA, drinks));
    };
    fetchName();
  }, []);

  return (
    <div>
      <Header title="Drinks" hasSearch />
      {
        allDrinks.filter((_, index) => index < FIRST_TWELVE_RECIPES)
          .map((drink, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ drink.idDrink }
              className="container"
            >
              <Card style={ { width: '18rem' } }>
                <Card.Img
                  data-testid={ `${index}-card-img` }
                  variant="top"
                  src={ drink.strDrinkThumb }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    {drink.strDrink}

                  </Card.Title>
                  <Button variant="primary">See more</Button>
                </Card.Body>
              </Card>
            </div>
          ))
      }
      <Footer />
    </div>
  );
}
