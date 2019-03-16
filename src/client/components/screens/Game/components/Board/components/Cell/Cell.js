import React from 'react';

import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

import {FigureTypes} from 'Models/Figure';

import {Figure} from './components';

const cellTarget = {
    canDrop(props, monitor) {
        const {x, y, turn, userColor} = props;
        const {figure} = monitor.getItem();

        return props.canMove(figure, x, y, turn, userColor);
    },

    drop(props, monitor) {
        const {figure} = monitor.getItem();
        props.moveFigure(figure, props.x, props.y);
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});

const Cell = ({color, canDropColor, figure, connectDropTarget, canDrop}) =>
    connectDropTarget(
        <div
            style={{
                width: 64,
                height: 64,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: canDrop ? canDropColor : color
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
