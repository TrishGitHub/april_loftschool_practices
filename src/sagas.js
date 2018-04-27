import { takeLatest, call, put } from 'redux-saga/effects';
import { getTodayExchange } from './api';
import { getTodayExchangeRequest, getTodayExchangeSuccess, getTodayExchangeFailure } from './reducers';

export function* getTodayExchangeWatch() {
  yield takeLatest(getTodayExchangeRequest, getTodayExchangeFlow);
}

export function* getTodayExchangeFlow() {
  try {
    const response = yield call(getTodayExchange);
    yield put(getTodayExchangeSuccess(response.data));
  } catch (error) {
    yield put(getTodayExchangeFailure(error));
  }
}
