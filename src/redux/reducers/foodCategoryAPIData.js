import { FOOD_CATEGORY_DATA } from '../actions';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FOOD_CATEGORY_DATA:
    return action.payload;
  default:
    return [...state];
  }
};

export default reducer;
