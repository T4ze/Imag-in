import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import imageApp from './reducers';
import Base from './components/App';

import { fetchImages } from './actions';

const store = createStore(imageApp, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Base />
  </Provider>,
  document.getElementById('root'),
);

store.dispatch(fetchImages(0));
