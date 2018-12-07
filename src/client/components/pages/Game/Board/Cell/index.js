import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cell = props => <Square color={props.color} />;

Cell.propTypes = {
  color: PropTypes.string.isRequired,
};

const Square = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${props => props.color};
`;

export default Cell;
