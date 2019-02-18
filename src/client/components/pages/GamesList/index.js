import React from 'react';

import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';

import { getSocketUrl } from 'Utils/url';

import { ListGroup, ButtonGroup, Button, Alert } from 'reactstrap';
import { Wrapper, CreateGameButton, Title, Game, GameTitle } from './styled';

import CreateModal from './CreateModal';

@inject('gamesList')
@observer
class GamesList extends React.Component {
  static propTypes = {
    gamesList: PropTypes.shape({
      games: PropTypes.array,
      getAllGames: PropTypes.func,
    }).isRequired,
  };

  @observable createModalOpened = false;

  componentDidMount() {
    const { gamesList } = this.props;

    gamesList.getAllGames();

    const url = getSocketUrl();
    console.log(`Socket.IO connected to server: ${url}`);

    const socket = openSocket(url);

    socket.on('joinGame', ({ userId, gameId }) => {
      gamesList.joinGame(userId, gameId);
    });

    socket.on('leaveGame', ({ userId, gameId }) => {
      gamesList.leaveGame(userId, gameId);
    });
  }

  @action.bound
  toggleCreateModal() {
    this.createModalOpened = !this.createModalOpened;
  }

  renderGames = () => {
    const { gamesList } = this.props;

    // TODO: Повесить лоадер
    if (!gamesList.games.length)
      return (
        <Alert color="primary">There are no currently active games.</Alert>
      );

    return gamesList.games.map(game => (
      <Game key={game._id}>
        <GameTitle>{game.name}</GameTitle>
        {`${game.users.length}/2`}
        <ButtonGroup>
          <Button color="link">
            <Link to={`/games/${game._id}`}>Join</Link>
          </Button>

          <Button color="link" onClick={() => gamesList.deleteGame(game._id)}>
            Delete
          </Button>
        </ButtonGroup>
      </Game>
    ));
  };

  render() {
    return (
      <Wrapper>
        <Title>
          Currently active games
          <div>
            <Button color="warning">Refresh</Button>
            <CreateGameButton onClick={this.toggleCreateModal}>
              Create game
            </CreateGameButton>
          </div>
        </Title>

        <ListGroup>{this.renderGames()}</ListGroup>

        <CreateModal
          isOpen={this.createModalOpened}
          toggle={this.toggleCreateModal}
        />
      </Wrapper>
    );
  }
}

export default GamesList;
