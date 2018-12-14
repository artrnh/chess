import React from 'react';
import { render } from 'react-dom';

import { enableLogging } from 'mobx-logger';
import { Provider } from 'mobx-react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

import stores from 'Stores';

enableLogging();

const app = (
  <Provider {...stores}>
    <DragDropContextProvider backend={HTML5Backend}>
      <App />
    </DragDropContextProvider>
  </Provider>
);

render(app, document.getElementById('root'));
