const fetchCurrencyAPI = () => {
  const BASE_URL = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(BASE_URL)
    .then((response) => (
      response
        .json()
        .then(
          (json) => Object.keys(json).reduce((acc, curr) => {
            if (curr !== 'USDT') acc.push(curr);
            return acc;
          }, []),
        )));
};

export default fetchCurrencyAPI;
