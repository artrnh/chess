import React from 'react';

import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';

import { getSocketUrl } from 'Utils/url';

import { Table, Button, Icon, Message } from 'semantic-ui-react';
import { Wrapper, Header } from './styled';

import { CreateModal } from './components';

@inject('gamesList')
@observer
class GamesList extends React.Component {
  static propTypes = {
    gamesList: PropTypes.shape({
      games: PropTypes.array,
      getAllGames: PropTypes.func,
    }).isRequired,
  };

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

  renderGames = () => {
    const { gamesList } = this.props;

    // TODO: Повесить лоадер
    if (!gamesList.games.length)
      return (
        <Message info>
          <Message.Header>There are no currently active games!</Message.Header>
          <p>Be the first one and create it by yourself.</p>
        </Message>
      );

    return (
      <Table color="grey">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Players</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {gamesList.games.map(game => (
            <Table.Row key={game._id}>
              <Table.Cell width={10} verticalAlign="middle">
                {game.name}
              </Table.Cell>

              <Table.Cell width={3} verticalAlign="middle">
                {`${game.users.length}/2`}
              </Table.Cell>

              <Table.Cell width={3} verticalAlign="middle">
                <Link to={`/games/${game._id}`}>
                  <Button positive animated>
                    <Button.Content visible>Join</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </Link>

                <Button
                  negative
                  animated
                  onClick={() => gamesList.deleteGame(game._id)}
                >
                  <Button.Content visible>Delete</Button.Content>
                  <Button.Content hidden>
                    <Icon name="delete" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  render() {
    return (
      <Wrapper>
        <Header as="h2">
          Currently active games
          <div>
            <Button color="yellow">
              <Icon name="redo" />
              Refresh
            </Button>

            <CreateModal />
          </div>
        </Header>

        {this.renderGames()}
      </Wrapper>
    );
  }
}

export default GamesList;
