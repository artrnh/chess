import React, {Component} from 'react';

import {observable, runInAction} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

import {getSocketUrl} from 'Utils/url';

import {Board, Description, Controls} from './components';

import {Wrapper} from './styled';

@inject('game', 'user', 'gamesList')
@observer
class Game extends Component {
    static propTypes = {
        game: PropTypes.shape({
            board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
            moveFigure: PropTypes.func,
            canMove: PropTypes.func,
            initBoard: PropTypes.func
        }).isRequired,
        user: PropTypes.shape({
            joinGame: PropTypes.func,
            leaveGame: PropTypes.func
        }).isRequired,
        gamesList: PropTypes.shape({
            leaveGame: PropTypes.func
        }).isRequired,
        match: PropTypes.shape({
            params: PropTypes.object
        }).isRequired,
        history: PropTypes.shape({
            goBack: PropTypes.func
        }).isRequired
    };

    @observable socket = null;

    async componentDidMount() {
        const {
            game: {initGame, connectUser, disconnectUser, setError},
            match: {params},
            user: userStore,
            gamesList: {getAllGames}
        } = this.props;

        await getAllGames();
        await initGame(params.id);

        const url = getSocketUrl();
        console.log(`Socket.IO connected to server: ${url}`);

        const socket = openSocket(url);
        socket.emit('joinGame', {userId: userStore._id, gameId: params.id});

        socket.on('joinGame', ({user, gameId}) => {
            connectUser(user);
            userStore.joinGame(user._id, gameId);
        });

        socket.on('joinGameFailed', errorMessage => {
            setError(errorMessage);
        });

        socket.on('leaveGame', ({user}) => {
            disconnectUser(user);
            userStore.leaveGame(user._id);
        });

        runInAction(() => {
            this.socket = socket;
        });
    }

    leaveGame = () => {
        const {
            history,
            game: {disconnectUser},
            user,
            gamesList,
            match: {params}
        } = this.props;

        disconnectUser(user.userData);
        user.leaveGame(user._id);
        gamesList.leaveGame(user._id, params.id);

        this.socket.emit('leaveGame', {userId: user._id, gameId: params.id});
        history.push('/games');
    };

    render() {
        // TODO: Повесить лоадер
        return this.socket ? (
            <Wrapper>
                <Description leaveGame={this.leaveGame} />
                <Board socket={this.socket} />
                <Controls />
            </Wrapper>
        ) : null;
    }
}

export default Game;
