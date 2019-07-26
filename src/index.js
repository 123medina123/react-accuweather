import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/App';
import reducers from './reducers';

const store = createStore(rootReducer);

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>, document.getElementById('root'));
