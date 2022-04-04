const fetchCurrencyAPI = () => {
  const BASE_URL = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(BASE_URL)
    .then((response) => (
      response
        .json()
        .then(
          (json) => ((response.ok) ? Promise.resolve(json) : Promise.reject(json)),
        )));
};

export default fetchCurrencyAPI;
