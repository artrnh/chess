import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Button, Icon, Divider} from 'semantic-ui-react';

import {Wrapper, GameDescription, Text, Players} from './styled';

const iconsByRules = {
    Classic: 'chess pawn',
    Horde: 'th'
};

@inject('game')
@observer
class Description extends Component {
    static propTypes = {
        leaveGame: PropTypes.func.isRequired,
        game: PropTypes.shape({rules: PropTypes.string}).isRequired
    };

    render() {
        const {
            leaveGame,
            game: {rules}
        } = this.props;

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
                    <Icon name={iconsByRules[rules]} size="big" color="grey" />
                    <Text>
                        {`${rules} • Unlimited`}
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
