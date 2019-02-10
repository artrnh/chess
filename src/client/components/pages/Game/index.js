import React, { Component } from 'react';

import { observable, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

import { getSocketUrl } from 'Utils/url';

import Board from './Board';

import { Wrapper, LeaveButton } from './styled';

@inject('game', 'user')
@observer
class Game extends Component {
  static propTypes = {
    game: PropTypes.shape({
      board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
      moveFigure: PropTypes.func,
      canMove: PropTypes.func,
      initBoard: PropTypes.func,
    }).isRequired,
    user: PropTypes.shape({
      joinGame: PropTypes.func,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func,
    }).isRequired,
  };

  @observable socket = null;

  componentDidMount() {
    const {
      game: { initGame, connectUser, disconnectUser, setError },
      match: { params },
      user,
    } = this.props;

    initGame(params.id);

    const url = getSocketUrl();
    console.log(`Socket.IO connected to server: ${url}`);

    const socket = openSocket(url);
    socket.emit('joinGame', { userId: user._id, gameId: params.id });

    socket.on('joinGame', ({ userId, gameId }) => {
      connectUser(userId);
      user.joinGame(gameId);
    });

    socket.on('joinGameFailed', errorMessage => {
      setError(errorMessage);
    });

    socket.on('leaveGame', ({ userId }) => {
      user.joinGame();
      disconnectUser(userId);
    });

    runInAction(() => {
      this.socket = socket;
    });
  }

  goBack = () => {
    const {
      history,
      user,
      match: { params },
    } = this.props;

    this.socket.emit('leaveGame', { userId: user._id, gameId: params.id });
    history.goBack();
  };

  render() {
    // TODO: Повесить лоадер
    return this.socket ? (
      <Wrapper>
        <LeaveButton color="danger" onClick={this.goBack}>
          Leave Game
        </LeaveButton>
        <Board socket={this.socket} />
      </Wrapper>
    ) : null;
  }
}

export default Game;
