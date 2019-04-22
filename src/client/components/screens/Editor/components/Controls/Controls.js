import React, {Component} from 'react';

import {observable, action, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';

import {Form, Button, Icon} from 'semantic-ui-react';
import {Wrapper} from './styled';

@inject('editor', 'user', 'routing')
@observer
class Controls extends Component {
    @observable name = '';

    @observable color = 'white';

    @observable rules = 'Classic';

    @observable loading = false;

    @action.bound
    changeFieldValue = (e, {name, value}) => {
        this[name] = value;
    };

    createGame = async () => {
        const {editor, user, routing} = this.props;

        if (!this.name) return;

        this.loading = true;

        const {_id: gameId} = await editor.createGame(
            this.name,
            user._id,
            this.rules
        );

        user.setColor(user._id, this.color);

        runInAction(() => {
            this.loading = false;
        });

        routing.history.push(`/games/${gameId}`);
    };

    render() {
        return (
            <Wrapper>
                <Form>
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
                    />

                    <Form.Select
                        name="rules"
                        label="Rules"
                        placeholder="Choose your rules..."
                        options={[{text: 'Classic', value: 'Classic'}]}
                        onChange={this.changeFieldValue}
                        value={this.rules}
                    />

                    <Button onClick={this.createGame} fluid>
                        <Icon name="save" />
                        Continue from here
                    </Button>
                </Form>
            </Wrapper>
        );
    }
}

export default Controls;
