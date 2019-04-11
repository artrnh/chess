import React from 'react';

import PropTypes from 'prop-types';
import {DragLayer} from 'react-dnd';

import {Icon} from 'Common';

import {Layer, DraggedItem} from './styled';

const CustomDragLayer = ({item, itemType, isDragging, currentOffset}) =>
    !isDragging ? null : (
        <Layer>
            <DraggedItem offset={currentOffset}>
                <Icon name={itemType} color={item.figure.color} />
            </DraggedItem>
        </Layer>
    );

CustomDragLayer.defaultProps = {
    item: {},
    itemType: '',
    currentOffset: {}
};

CustomDragLayer.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string,
        position: PropTypes.arrayOf(PropTypes.number),
        moved: PropTypes.bool
    }),
    itemType: PropTypes.string,
    isDragging: PropTypes.bool.isRequired,
    currentOffset: PropTypes.shape({x: PropTypes.number, y: PropTypes.number})
};

const collect = monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
});

export default DragLayer(collect)(CustomDragLayer);
