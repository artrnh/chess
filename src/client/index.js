import React from 'react';
import {render} from 'react-dom';

import {enableLogging} from 'mobx-logger';
import {Provider} from 'mobx-react';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import {Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import {DragDropContextProvider} from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';

import stores from 'Stores';
import App from './App';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
stores.routing = routingStore;

const history = syncHistoryWithStore(browserHistory, routingStore);

enableLogging();

const app = (
    <Provider {...stores}>
        <Router history={history}>
            <DragDropContextProvider
                backend={TouchBackend({enableMouseEvents: true})}
            >
                <App />
            </DragDropContextProvider>
        </Router>
    </Provider>
);

render(app, document.getElementById('root'));
