import { getTodayExchangeWatch, getTodayExchangeFlow } from './sagas';
import { getTodayExchange } from './api';
import { getTodayExchangeRequest, getTodayExchangeSuccess, getTodayExchangeFailure } from './reducers';
import { takeLatest, call, put } from 'redux-saga/effects';

describe('#getTodayExchangeWatch', () => {
  it('Should call takeLatest', () => {
    const sagaIterator = getTodayExchangeWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(getTodayExchangeRequest, getTodayExchangeFlow));
  });
});

describe('#getTodayExchangeFlow', () => {
  describe('without error', () => {
    const sagaIterator = getTodayExchangeFlow();

    it('call getTodayExchange', () => {
      expect(sagaIterator.next().value).toEqual(call(getTodayExchange));
    });

    it('put getTodayExchangeSuccess with data from call', () => {
      expect(sagaIterator.next({ data: 'test' }).value).toEqual(put(getTodayExchangeSuccess('test')));
    });
  });

  describe('with error', () => {
    const sagaIterator = getTodayExchangeFlow();

    it('call getTodayExchange', () => {
      expect(sagaIterator.next().value).toEqual(call(getTodayExchange));
    });

    it('put getTodayExchangeFailure with error from getTodayExchange', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(getTodayExchangeFailure(error)));
    });
  });
});
