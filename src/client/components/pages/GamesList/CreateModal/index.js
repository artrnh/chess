import React from 'react';

import PropTypes from 'prop-types';
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { Modal, Button, Form, Input } from 'semantic-ui-react';

@inject('gamesList')
@observer
class CreateModal extends React.Component {
  static propTypes = {
    gamesList: PropTypes.shape({ gamesList: PropTypes.array }).isRequired,
  };

  @observable opened = false;

  @observable name = '';

  @action.bound
  changeFieldValue = (e, { name, value }) => {
    this[name] = value;
  };

  createRoom = () => {
    const { gamesList } = this.props;

    if (!this.name) return;

    gamesList.createGame(this.name);
    this.toggleModal();
    this.clearValues();
  };

  @action.bound
  clearValues() {
    this.name = '';
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
              <Form.Field required>
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Provide a name for your game..."
                  onChange={this.changeFieldValue}
                  value={this.name}
                />
              </Form.Field>
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
