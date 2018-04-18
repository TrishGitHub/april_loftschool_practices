import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getError, getIsLoading, getSeriesPreviewImages, getSeriesRequest } from 'ducks/series';
import { getShowRequest } from 'ducks/shows';
import './App.css';

class App extends PureComponent {
  componentDidMount() {
    const { getSeriesRequest, getShowRequest } = this.props;

    getSeriesRequest();
    getShowRequest();
  }

  render() {
    const { isLoading, error } = this.props;

    if (isLoading) return <p>Данные загружаются...</p>;
    if (error) return <p>Произошла сетевая ошибка</p>;

    return (
      <div>
        <h1>Firefly</h1>
        {this.renderSeriesList()}
      </div>
    );
  }

  renderSeriesList() {
    const { series } = this.props;

    return series.map(({ id, name, image }) => (
      <div key={id}>
        <img src={image} alt={name} />
      </div>
    ));
  }
}

const mapStateToProps = state => ({
  error: getError(state),
  isLoading: getIsLoading(state),
  series: getSeriesPreviewImages(state),
});

const mapDispatchToProps = { getSeriesRequest, getShowRequest };

export default connect(mapStateToProps, mapDispatchToProps)(App);
