import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

import stores from 'Stores';

import { createBoard } from 'Utils/board';
console.log(createBoard());

const app = (
  <Provider {...stores}>
    <App />
  </Provider>
);

render(app, document.getElementById('root'));
