import React, {Component} from 'react';

import {observable, action} from 'mobx';
import {inject, observer} from 'mobx-react';

import {Popup, Checkbox} from 'semantic-ui-react';
import {Figure, Delete} from './components';
import {Wrapper, Container, ToggleWrapper} from './styled';

import getFigures from './utils/figuresData';

@inject('editor')
@observer
class Figures extends Component {
    @observable color = 'white';

    @action.bound
    changeColor() {
        this.color = this.color === 'white' ? 'black' : 'white';
    }

    render() {
        const {
            editor: {deleteFigure}
        } = this.props;

        const trigger = (
            <ToggleWrapper>
                <Checkbox slider onChange={this.changeColor} />
            </ToggleWrapper>
        );

        return (
            <Container>
                <Wrapper inverted tertiary>
                    {getFigures(this.color).map(figure => (
                        <Figure key={figure.id} {...figure} />
                    ))}
                    <Delete deleteFigure={deleteFigure} />
                </Wrapper>

                <Popup
                    trigger={trigger}
                    content="Switch figures color"
                    position="right center"
                    inverted
                />
            </Container>
        );
    }
}

export default Figures;
