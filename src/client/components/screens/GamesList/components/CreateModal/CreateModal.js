import React from 'react';

import PropTypes from 'prop-types';
import {action, observable, runInAction} from 'mobx';
import {observer, inject} from 'mobx-react';

import {Modal, Button, Form, Icon} from 'semantic-ui-react';

@inject('gamesList', 'user', 'routing')
@observer
class CreateModal extends React.Component {
    static propTypes = {
        gamesList: PropTypes.shape({gamesList: PropTypes.array}).isRequired,
        user: PropTypes.shape({setColor: PropTypes.func}).isRequired,
        routing: PropTypes.shape({history: PropTypes.object}).isRequired
    };

    @observable opened = false;

    @observable name = '';

    @observable color = '';

    @observable rules = '';

    @observable loading = false;

    @action.bound
    changeFieldValue = (e, {name, value}) => {
        this[name] = value;
    };

    @action.bound
    createGame = async () => {
        const {gamesList, user, routing} = this.props;

        this.loading = true;

        if (!this.name || !this.color || !this.rules) return;

        const {_id: gameId} = await gamesList.createGame(
            this.name,
            user._id,
            this.rules
        );

        user.setColor(user._id, this.color);

        this.toggleModal();
        this.clearValues();

        runInAction(() => {
            this.loading = false;
        });

        routing.history.push(`/games/${gameId}`);
    };

    @action.bound
    clearValues() {
        this.name = '';
        this.color = '';
    }

    @action.bound
    toggleModal() {
        this.opened = !this.opened;
    }

    renderForm = () => (
        <Form onSubmit={this.createRoom}>
            <Form.Input
                name="name"
                label="Name"
                placeholder="Provide a name for your game..."
                onChange={this.changeFieldValue}
                value={this.name}
                required
            />

            <Form.Select
                name="color"
                label="Color"
                placeholder="Choose your color..."
                options={[
                    {text: 'White', value: 'white'},
                    {text: 'Black', value: 'black'}
                ]}
                onChange={this.changeFieldValue}
                value={this.color}
                required
            />

            <Form.Select
                name="rules"
                label="Rules"
                placeholder="Choose your rules set..."
                options={[
                    {text: 'Classic', value: 'Classic'},
                    {text: 'Horde', value: 'Horde'}
                ]}
                onChange={this.changeFieldValue}
                value={this.rules}
                required
            />
        </Form>
    );

    render() {
        const trigger = (
            <Button color="blue" onClick={this.toggleCreateModal}>
                <Icon name="chess knight" />
                Create game
            </Button>
        );

        return (
            <Modal
                open={this.opened}
                onOpen={this.toggleModal}
                onClose={this.toggleModal}
                trigger={trigger}
                size="tiny"
                centered={false}
            >
                <Modal.Header>Create game</Modal.Header>
                <Modal.Content>
                    <Modal.Description>{this.renderForm()}</Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={this.toggleModal}>
                        Cancel
                    </Button>
                    <Button
                        color="blue"
                        onClick={this.createGame}
                        disabled={this.loading}
                        loading={this.loading}
                    >
                        Create game
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CreateModal;
