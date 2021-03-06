import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import ConnectedIntlProvider from './modules/intl/components/ConnectedIntlProvider';
import { setLocale } from './modules/intl/redux/intlReducer';
import configureStore, { history } from './redux/configureStore';
import * as serviceWorker from './serviceWorker';
import './setupTheme';

addLocaleData(locale_en);

const store = configureStore({});

store.dispatch(setLocale('en'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConnectedIntlProvider>
        <App />
      </ConnectedIntlProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
