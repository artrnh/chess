import React from 'react';

import PropTypes from 'prop-types';
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

@inject('gamesList')
@observer
class CreateModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    gamesList: PropTypes.shape({ gamesList: PropTypes.array }).isRequired,
  };

  @observable name = '';

  @action.bound
  changeFieldValue = field => e => {
    this[field] = e.target.value;
  };

  createRoom = () => {
    const { gamesList, toggle } = this.props;

    gamesList.createGame(this.name);
    toggle();
  };

  render() {
    const { isOpen, toggle } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create game</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Provide name for your game..."
                onChange={this.changeFieldValue('name')}
                value={this.name}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          {' '}
          <Button color="primary" onClick={this.createRoom}>
            Create game
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateModal;
