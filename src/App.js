import React, { Fragment, PureComponent } from 'react';
import './App.css';
import { getTodayExchange } from './api';

class App extends PureComponent {
  state = {
    isLoading: false,
    data: null,
  };
  downloadExchange = () => {
    this.setState({ isLoading: true });

    getTodayExchange().then(response => {
      this.setState({
        data: response.data,
        isLoading: false,
      });
    });
  };
  render() {
    const { isLoading, data } = this.state;
    if (isLoading) {
      return <p>Загрузка...</p>;
    }

    return (
      <div>
        {!data ? (
          <button onClick={this.downloadExchange}>
            Скачать
          </button>
        ) : (
          <Fragment>
            <h1>{`Курс рубля за ${data.date}`}</h1>
            {Object.entries(data.rates).map(
              ([key, value]) => (
                <p key={key}>
                  • {`100 RUB — ${value * 100} ${key}`}
                </p>
              ),
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
