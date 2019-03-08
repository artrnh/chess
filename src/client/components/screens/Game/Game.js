import React, {Component} from 'react';

import {observable, runInAction} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

import {Button} from 'semantic-ui-react';

import {getSocketUrl} from 'Utils/url';

import {Board} from './components';

import {Wrapper} from './styled';

@inject('game', 'user')
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
        match: PropTypes.shape({
            params: PropTypes.object
        }).isRequired,
        history: PropTypes.shape({
            goBack: PropTypes.func
        }).isRequired
    };

    @observable socket = null;

    componentDidMount() {
        const {
            game: {initGame, connectUser, disconnectUser, setError},
            match: {params},
            user
        } = this.props;

        initGame(params.id);

        const url = getSocketUrl();
        console.log(`Socket.IO connected to server: ${url}`);

        const socket = openSocket(url);
        socket.emit('joinGame', {userId: user._id, gameId: params.id});

        socket.on('joinGame', ({userId, gameId}) => {
            connectUser(userId);
            user.joinGame(gameId);
        });

        socket.on('joinGameFailed', errorMessage => {
            setError(errorMessage);
        });

        socket.on('leaveGame', ({userId}) => {
            disconnectUser(userId);
            user.leaveGame();
        });

        runInAction(() => {
            this.socket = socket;
        });
    }

    leaveGame = () => {
        const {
            history,
            user,
            match: {params}
        } = this.props;

        this.socket.emit('leaveGame', {userId: user._id, gameId: params.id});
        history.goBack();
    };

    render() {
        // TODO: Повесить лоадер
        return this.socket ? (
            <Wrapper>
                <Button color="red" onClick={this.leaveGame}>
                    Leave Game
                </Button>
                <Board socket={this.socket} />
            </Wrapper>
        ) : null;
    }
}

export default Game;
