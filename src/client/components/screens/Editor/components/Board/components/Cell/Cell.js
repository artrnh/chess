import React from 'react';

import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

import {FigureTypes} from 'Models/Figure';

import {Figure} from './components';

const cellTarget = {
    drop(props, monitor) {
        const {figure} = monitor.getItem();
        props.moveFigure(figure, props.x, props.y);
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
});

const Cell = ({color, figure, connectDropTarget}) =>
    connectDropTarget(
        <div
            style={{
                width: 64,
                height: 64,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color
            }}
            color={color}
        >
            {figure.id ? <Figure {...figure} /> : null}
        </div>
    );

Cell.propTypes = {
    color: PropTypes.string,
    moveFigure: PropTypes.func.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    figure: PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string,
        position: PropTypes.arrayOf(PropTypes.number)
    })
};

export default DropTarget(Object.values(FigureTypes), cellTarget, collect)(
    Cell
);
