import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Divider, Icon, Button, Popup} from 'semantic-ui-react';

import {Wrapper, Container, Turn, Actions} from './styled';

@inject('game', 'user')
@observer
class Controls extends Component {
    static propTypes = {
        game: PropTypes.shape({turn: PropTypes.string}).isRequired,
        user: PropTypes.shape({color: PropTypes.string}).isRequired
    };

    renderTrigger = name => (
        <Button icon basic>
            <Icon name={name} />
        </Button>
    );

    render() {
        const {
            game: {turn},
            user
        } = this.props;

        return (
            <Container>
                <Turn visible={user.color !== turn}>Waiting for opponent</Turn>
                <Wrapper>
                    <Icon name="circle" color="olive" />
                    Anonymous
                    <Divider />
                    <Actions>
                        <Button.Group size="big">
                            <Popup
                                trigger={this.renderTrigger('sync alternate')}
                                content="Flip board"
                                position="bottom center"
                                inverted
                            />

                            <Popup
                                trigger={this.renderTrigger('close')}
                                content="Abort game"
                                position="bottom center"
                                inverted
                            />

                            <Popup
                                trigger={this.renderTrigger('handshake')}
                                content="Offer draw"
                                position="bottom center"
                                inverted
                            />

                            <Popup
                                trigger={this.renderTrigger('flag')}
                                content="Resign"
                                position="bottom center"
                                inverted
                            />
                        </Button.Group>
                    </Actions>
                    <Divider />
                    <Icon name="circle" color="olive" />
                    Anonymous
                </Wrapper>
                <Turn visible={user.color === turn}>Your turn</Turn>
            </Container>
        );
    }
}

export default Controls;
