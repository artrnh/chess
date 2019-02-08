import React, { Component } from 'react';

import { observable, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

import { getSocketUrl } from 'Utils/url';

import Board from './Board';

@inject('game')
@observer
class Game extends Component {
  static propTypes = {
    game: PropTypes.shape({
      board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
      moveFigure: PropTypes.func,
      canMove: PropTypes.func,
      initBoard: PropTypes.func,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  @observable socket = null;

  componentDidMount() {
    const {
      game: { initGame },
      match: { params },
    } = this.props;

    initGame(params.id);

    const url = getSocketUrl();
    console.log(`Socket.IO connected to server: ${url}`);

    const socket = openSocket(url);

    runInAction(() => {
      this.socket = socket;
    });
  }

  render() {
    // TODO: Повесить лоадер
    return this.socket ? <Board socket={this.socket} /> : null;
  }
}

export default Game;
