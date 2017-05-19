import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import imageApp from './reducers';
import App from './components/App';

// FIXME: DEBUG
import { fetchImages } from './actions';

/*
const images = [
  {
    id: '58f9d7845bd2a211bad6125e',
    index: 0,
    picture: 'http://lorempixel.com/200/200/',
    caption: 'Deserunt nisi adipisicing incididunt eu consequat consequat dolore veniam id.',
    latitude: -21.931627,
    longitude: 75.697354,
    tags: ['velit', 'irure', 'proident', 'consequat', 'esse', 'sit', 'aliqua'],
  },
  {
    id: '58f9d7844394fca353528d08',
    index: 1,
    picture: 'http://lorempixel.com/200/200/',
    caption: 'Occaecat magna officia occaecat anim consequat officia.',
    latitude: 82.268248,
    longitude: -163.237659,
    tags: ['amet', 'eiusmod', 'ad', 'quis', 'adipisicing', 'aliquip', 'amet'],
  },
];
*/

const store = createStore(imageApp, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

store.dispatch(fetchImages(0));
