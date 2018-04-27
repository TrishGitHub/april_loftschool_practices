import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

jest.mock('./api.js');
const api = require('./api');

const TEST_EXCHANGE_DATA = { date: '10-10-10', rates: {} };

it('Should fetch exchange', () => {
  const wrapper = shallow(<App />);

  api.getTodayExchange = jest.fn(() => ({
    then: promiseCb => {
      promiseCb({ data: TEST_EXCHANGE_DATA });
    },
  }));

  wrapper.find('button').simulate('click');
  expect(api.getTodayExchange).toHaveBeenCalledTimes(1);

  expect(wrapper.state()).toEqual({
    isLoading: false,
    data: TEST_EXCHANGE_DATA,
  });
});

it('Should set isLoading: true on call downloadExchange', () => {
  const wrapper = shallow(<App />);

  api.getTodayExchange = jest.fn(() =>
    Promise.resolve({ data: TEST_EXCHANGE_DATA }),
  );

  wrapper.find('button').simulate('click');
  expect(wrapper.state()).toEqual({
    isLoading: true,
    data: null,
  });
});
