import React, {Component} from 'react';

import {CustomDragLayer} from 'Common';

import {Board, Figures} from './components';

import {Wrapper, Container} from './styled';

class Editor extends Component {
    render() {
        return (
            <Container>
                <Wrapper>
                    <CustomDragLayer />
                    <Board />
                    <Figures />
                </Wrapper>
            </Container>
        );
    }
}

export default Editor;
