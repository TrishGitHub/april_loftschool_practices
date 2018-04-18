import { createStore, compose, applyMiddleware } from 'redux';
import { getSeriesRequest, getSeriesSuccess, getSeriesFailure } from 'ducks/series';
import { getShowRequest, getShowSuccess, getShowFailure } from 'ducks/shows';
import rootReducer from './ducks';

const tvmazeShowFetchMiddleware = store => next => action => {
  if (action.type === getShowRequest.toString()) {
    fetch('http://api.tvmaze.com/shows/180?embed=cast', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(series => {
        store.dispatch(getShowSuccess(series, series.length));
      })
      .catch(error => {
        store.dispatch(getShowFailure(error));
      });
  }

  return next(action);
};
const tvmazeEpisodeFetchMiddleware = store => next => action => {
  if (action.type === getSeriesRequest.toString()) {
    fetch('http://api.tvmaze.com/shows/180/episodes', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(series => {
        store.dispatch(getSeriesSuccess(series, series.length));
      })
      .catch(error => {
        store.dispatch(getSeriesFailure(error));
      });
  }

  return next(action);
};

const createAppStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(tvmazeShowFetchMiddleware),
      applyMiddleware(tvmazeEpisodeFetchMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

  return store;
};

export default createAppStore;
