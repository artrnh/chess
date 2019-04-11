import React, {Component} from 'react';

import {observable, runInAction} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';

import {Board} from './components';

import {Wrapper} from './styled';

class Editor extends Component {
    render() {
        return (
            <Wrapper>
                <Board />
            </Wrapper>
        );
    }
}

export default Editor;
