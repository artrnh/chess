import React from 'react';

import {CustomDragLayer} from 'Common';

import {Board, Figures, Controls} from './components';

import {Wrapper, Container, Title} from './styled';

const Editor = () => (
    <Container>
        <Title secondary>Board editor</Title>
        <Wrapper>
            <CustomDragLayer />
            <Board />
            <Figures />
        </Wrapper>
        <Controls />
    </Container>
);

export default Editor;
