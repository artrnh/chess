import React from 'react';
import { render } from 'react-dom';

import { enableLogging } from 'mobx-logger';
import { Provider } from 'mobx-react';
import { DragDropContextProvider } from 'react-dnd';
import MouseBackEnd from 'react-dnd-mouse-backend';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

import stores from 'Stores';

enableLogging();

const app = (
  <Provider {...stores}>
    <DragDropContextProvider backend={MouseBackEnd}>
      <App />
    </DragDropContextProvider>
  </Provider>
);

render(app, document.getElementById('root'));
