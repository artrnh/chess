import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'Common/Icon';

const Cell = ({ color, figureColor, name }) => (
  <Square color={color}>
    <Icon name={name} color={figureColor} />
  </Square>
);

Cell.propTypes = {
  color: PropTypes.string.isRequired,
};

const Square = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
`;

export default Cell;
