import React from 'react';

import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import openSocket from 'socket.io-client';

import {getSocketUrl} from 'Utils/url';

import {Table, Button, Icon, Message} from 'semantic-ui-react';
import {Loader} from 'Common';
import {Wrapper, Header} from './styled';

import {CreateModal} from './components';

const iconsByRules = {
    Classic: 'chess pawn',
    Horde: 'th',
    Chess960: 'random'
};

@inject('gamesList', 'user')
@observer
class GamesList extends React.Component {
    static propTypes = {
        gamesList: PropTypes.shape({
            games: PropTypes.array,
            getAllGames: PropTypes.func,
            loading: PropTypes.bool
        }).isRequired,
        user: PropTypes.shape({
            setColor: PropTypes.func
        }).isRequired
    };

    async componentDidMount() {
        const {gamesList} = this.props;

        await gamesList.getAllGames();

        const url = getSocketUrl();
        console.log(`Socket.IO connected to server: ${url}`);

        const socket = openSocket(url);

        socket.on('joinGame', ({user, gameId}) => {
            gamesList.joinGame(user, gameId);
        });

        socket.on('leaveGame', ({user, gameId}) => {
            gamesList.leaveGame(user, gameId);
        });
    }

    joinGame = (userId, color) => async () => {
        const {user} = this.props;

        await user.setColor(userId, color);
    };

    deleteGame = id => () => {
        const {gamesList} = this.props;

        gamesList.deleteGame(id);
    };

    renderGame = game => {
        const {user} = this.props;
        const {_id, name, users, creator, rules} = game;

        const whiteUser = users.find(u => u.color === 'white');
        const blackUser = users.find(u => u.color === 'black');
        const isFull = users.length >= 2;

        return (
            <Table.Row key={_id} disabled={isFull}>
                <Table.Cell width={4} verticalAlign="middle">
                    {name}
                </Table.Cell>

                <Table.Cell width={4} verticalAlign="middle">
                    <Icon name={iconsByRules[rules]} color="grey" />
                    {rules}
                </Table.Cell>

                <Table.Cell width={4} verticalAlign="middle">
                    {`${users.length}/2`}
                </Table.Cell>

                <Table.Cell width={3} verticalAlign="middle">
                    <Button
                        as={Link}
                        to={`/games/${_id}`}
                        onClick={this.joinGame(user._id, 'white')}
                        disabled={isFull || !!whiteUser}
                        color="grey"
                        animated
                        compact
                    >
                        <Button.Content visible>Join as White</Button.Content>
                        <Button.Content hidden>
                            <Icon name="arrow right" />
                        </Button.Content>
                    </Button>

                    <Button
                        as={Link}
                        to={`/games/${_id}`}
                        onClick={this.joinGame(user._id, 'black')}
                        disabled={isFull || !!blackUser}
                        color="black"
                        animated
                        compact
                    >
                        <Button.Content visible>Join as Black</Button.Content>
                        <Button.Content hidden>
                            <Icon name="arrow right" />
                        </Button.Content>
                    </Button>
                </Table.Cell>

                <Table.Cell width={1} verticalAlign="middle">
                    {creator === user._id && (
                        <Button
                            disabled={isFull}
                            onClick={this.deleteGame(_id)}
                            color="red"
                            inverted
                            animated
                            compact
                        >
                            <Button.Content visible>Delete</Button.Content>
                            <Button.Content hidden>
                                <Icon name="delete" />
                            </Button.Content>
                        </Button>
                    )}
                </Table.Cell>
            </Table.Row>
        );
    };

    renderGamesList = () => {
        const {
            gamesList: {games, loading}
        } = this.props;

        if (loading) return <Loader />;

        if (!games.length)
            return (
                <Message info>
                    <Message.Header>
                        There are no currently active games!
                    </Message.Header>
                    <p>Be the first one and create it by yourself.</p>
                </Message>
            );

        return (
            <Table color="grey">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Rules</Table.HeaderCell>
                        <Table.HeaderCell>Players</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>

                <Table.Body>{games.map(this.renderGame)}</Table.Body>
            </Table>
        );
    };

    render() {
        const {
            gamesList: {getAllGames, loading}
        } = this.props;

        return (
            <Wrapper>
                <Header as="h2">
                    Currently active games
                    <div>
                        <Button
                            color="yellow"
                            onClick={getAllGames}
                            disabled={loading}
                        >
                            <Icon name="redo" />
                            Refresh
                        </Button>

                        <CreateModal />
                    </div>
                </Header>

                {this.renderGamesList()}
            </Wrapper>
        );
    }
}

export default GamesList;
