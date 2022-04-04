import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_FAILURE,
  RECEIVE_CURRENCIES_SUCCESS,
  SET_EXPENSE,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
      isFetching: false,
    };
  case RECEIVE_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  default:
    return state;
  }
};

export default wallet;
