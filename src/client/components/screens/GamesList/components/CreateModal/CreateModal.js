import React from 'react';

import PropTypes from 'prop-types';
import {action, observable} from 'mobx';
import {observer, inject} from 'mobx-react';

import {Modal, Button, Form} from 'semantic-ui-react';

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

    @action.bound
    changeFieldValue = (e, {name, value}) => {
        this[name] = value;
    };

    createRoom = async () => {
        const {gamesList, user, routing} = this.props;

        if (!this.name || !this.color) return;

        const {_id: gameId} = await gamesList.createGame(this.name);
        user.setColor(user._id, this.color);

        this.toggleModal();
        this.clearValues();

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

    render() {
        const trigger = (
            <Button color="blue" onClick={this.toggleCreateModal}>
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
                    <Modal.Description>
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
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={this.toggleModal}>
                        Cancel
                    </Button>
                    <Button color="blue" onClick={this.createRoom}>
                        Create game
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CreateModal;
