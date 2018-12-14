import React, { Component } from 'react';

import _ from 'lodash';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { FigureTypes } from 'Models/Figure';
import Figure from './Figure';

const cellTarget = {
  drop(props, monitor) {
    props.moveFigure(monitor.getItem().figure, props.x, props.y);
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

const Cell = ({ color, figure, connectDropTarget, isOver, canDrop }) =>
  connectDropTarget(
    <div
      style={{
        width: 64,
        height: 64,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
      }}
      color={color}
    >
      {!_.isEmpty(figure) ? <Figure {...figure} /> : null}
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
    position: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default DropTarget(FigureTypes, cellTarget, collect)(Cell);
