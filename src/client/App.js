import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Navigation from 'Common/Navigation';
import Layout from 'Common/Layout';
import GamesList from 'Pages/GamesList';
import Game from 'Pages/Game';

const App = () => (
  <>
    <Navigation />
    <Layout>
      <Switch>
        <Route exact path="/">
          <Redirect to="/games" />
        </Route>

        <Route path="/games/:id" component={Game} />
        <Route path="/games" component={GamesList} />
      </Switch>
    </Layout>
  </>
);

export default App;
