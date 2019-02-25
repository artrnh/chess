import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Navigation, Layout } from 'Common';

import { Game, GamesList } from 'Screens';

@inject('user')
class App extends Component {
  static propTypes = {
    user: PropTypes.shape({
      initUser: PropTypes.func,
    }).isRequired,
  };

  componentDidMount() {
    const { user } = this.props;
    user.initUser();
  }

  render() {
    return (
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
  }
}

export default App;
