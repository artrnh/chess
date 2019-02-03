import React from 'react';

import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

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
  }

  @action.bound
  toggleCreateModal() {
    this.createModalOpened = !this.createModalOpened;
  }

  renderGames = () => {
    const { gamesList } = this.props;

    if (!gamesList.games.length)
      return (
        <Alert color="primary">There are no currently active games.</Alert>
      );

    return gamesList.games.map(game => (
      <Game key={game._id}>
        <GameTitle color="link">{game.name}</GameTitle>
        <ButtonGroup>
          <Link to={`/games/${game._id}`}>
            <Button color="link">Join</Button>
          </Link>

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
