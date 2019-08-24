import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './reducers';
import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './sagas';

export const history = createBrowserHistory();

const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default function configureStore(preloadedState: any) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        sagaMiddleware,
        // ... other middlewares ...
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
