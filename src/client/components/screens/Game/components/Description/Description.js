import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Button, Icon, Divider} from 'semantic-ui-react';

import {Wrapper, GameDescription, Text, Players} from './styled';

@inject('game')
@observer
class Description extends Component {
    static propTypes = {
        leaveGame: PropTypes.func.isRequired
    };

    render() {
        const {leaveGame} = this.props;

        return (
            <Wrapper>
                <Button
                    color="red"
                    inverted
                    compact
                    animated
                    fluid
                    onClick={leaveGame}
                >
                    <Button.Content visible>Leave Game</Button.Content>
                    <Button.Content hidden>
                        <Icon name="arrow left" />
                    </Button.Content>
                </Button>

                <GameDescription>
                    <Icon name="cogs" size="big" color="grey" />
                    <Text>
                        Classic • Unlimited
                        <br />
                        Playing right now
                    </Text>
                </GameDescription>

                <Divider />

                <Players>
                    <Text>
                        <Icon name="circle outline" color="grey" />
                        Anonymous
                    </Text>
                    <Text>
                        <Icon name="circle" color="grey" />
                        Anonymous
                    </Text>
                </Players>
            </Wrapper>
        );
    }
}

export default Description;
