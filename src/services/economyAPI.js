const fetchCurrencyAPI = () => {
  const BASE_URL = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(BASE_URL)
    .then((response) => (
      response
        .json()
        .then(
          (json) => json,
        )));
};

fetchCurrencyAPI().then((json) => console.log(json));
export default fetchCurrencyAPI;
