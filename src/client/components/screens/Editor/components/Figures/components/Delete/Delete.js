import React from 'react';

import {PropTypes} from 'prop-types';
import {DropTarget} from 'react-dnd';

import {FigureTypes} from 'Models/Figure';

import {DeleteIcon} from './styled';

const deleteTarget = {
    drop(props, monitor) {
        const {figure} = monitor.getItem();
        props.deleteFigure(figure);
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
});

const Delete = ({connectDropTarget}) =>
    connectDropTarget(
        <div>
            <DeleteIcon name="trash alternate outline" color="black" />
        </div>
    );

Delete.propTypes = {
    connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(Object.values(FigureTypes), deleteTarget, collect)(
    Delete
);
