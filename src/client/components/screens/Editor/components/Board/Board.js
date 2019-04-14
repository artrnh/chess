import React, {Component} from 'react';

import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';

import {Cell} from './components';

import {BoardContainer} from './styled';

@inject('editor')
@observer
class Board extends Component {
    static propTypes = {
        editor: PropTypes.shape({
            board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object))
        }).isRequired
    };

    render() {
        const {
            editor: {board, moveFigure}
        } = this.props;

        return (
            <BoardContainer>
                {board.map(row =>
                    row.map(({x, y, figure}) => (
                        <Cell
                            key={y + x}
                            x={x}
                            y={y}
                            color={(x + y) % 2 ? '#B58763' : '#F0DAB5'}
                            figure={figure}
                            moveFigure={moveFigure}
                        />
                    ))
                )}
            </BoardContainer>
        );
    }
}

export default Board;
