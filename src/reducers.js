import { createActions } from 'redux-actions';

const {
  getTodayExchangeRequest,
  getTodayExchangeSuccess,
  getTodayExchangeFailure,
} = createActions({
  GET_TODAY_EXCHANGE_REQUEST: null,
  GET_TODAY_EXCHANGE_SUCCESS: null,
  GET_TODAY_EXCHANGE_FAILURE: null,
});

export {
  getTodayExchangeRequest,
  getTodayExchangeSuccess,
  getTodayExchangeFailure,
};
