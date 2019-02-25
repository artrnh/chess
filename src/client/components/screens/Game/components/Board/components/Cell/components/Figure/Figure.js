import React from 'react';

import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import { Icon } from 'Common';

const figureSource = {
  beginDrag(props) {
    return {
      figure: props,
    };
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const Figure = ({ name, color, connectDragSource, isDragging }) =>
  connectDragSource(
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Icon name={name} color={color} />
    </div>
  );

Figure.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DragSource(props => props.name, figureSource, collect)(Figure);
