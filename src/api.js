import axios from 'axios';
export const getTodayExchange = () =>
  axios.get(
    'https://exchangeratesapi.io/api/latest?base=RUB',
  );
