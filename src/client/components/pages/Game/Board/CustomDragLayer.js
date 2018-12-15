import React from 'react';

import { DragLayer } from 'react-dnd';
import styled from 'styled-components';

import Icon from 'Common/Icon';

const CustomDragLayer = ({ item, itemType, isDragging, currentOffset }) =>
  !isDragging ? null : (
    <Layer>
      <DraggedItem offset={currentOffset}>
        <Icon name={itemType} color={item.figure.color} />
      </DraggedItem>
    </Layer>
  );

const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
});

const Layer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const DraggedItem = styled.div.attrs(({ offset }) => ({
  style: !offset
    ? { display: 'none' }
    : { transform: `translate(${offset.x}px, ${offset.y}px)` },
}))``;

export default DragLayer(collect)(CustomDragLayer);
