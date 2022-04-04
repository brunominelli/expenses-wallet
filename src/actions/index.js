import fetchCurrencyAPI from '../services/economyAPI';

export const USER_LOGIN = 'USER_LOGIN';
export const SET_EXPENSE = 'SET_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const RECEIVE_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';

export const userLogin = (email) => ({ type: USER_LOGIN, email });

export const setExpense = (expense) => ({ type: SET_EXPENSE, expense });

export const requestCurrencies = () => ({ type: REQUEST_CURRENCIES });

const receiveCurrenciesSuccess = (json) => ({
  type: RECEIVE_CURRENCIES_SUCCESS,
  currencies: json,
});

const receiveCurrenciesFailure = (error) => ({
  type: RECEIVE_CURRENCIES_SUCCESS,
  error,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetchCurrencyAPI()
      .then(
        (json) => dispatch(receiveCurrenciesSuccess((json))),
        (error) => dispatch(receiveCurrenciesFailure(error.message)),
      );
  };
}
