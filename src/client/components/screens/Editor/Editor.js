import React from 'react';

import {Link} from 'react-router-dom';
import {Button, Icon} from 'semantic-ui-react';

import {CustomDragLayer} from 'Common';

import {Board, Figures, Controls} from './components';

import {Wrapper, Container, Description, Title} from './styled';

const Editor = () => (
    <Container>
        <Description secondary>
            <Button as={Link} to="/games" icon compact labelPosition="left">
                <Icon name="arrow left" />
                Back
            </Button>
            <Title>Board editor</Title>
        </Description>
        <Wrapper>
            <CustomDragLayer />
            <Board />
            <Figures />
        </Wrapper>
        <Controls />
    </Container>
);

export default Editor;
