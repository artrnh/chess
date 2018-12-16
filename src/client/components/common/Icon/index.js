import React from 'react';

import PropTypes from 'prop-types';

import 'Assets/icons/bishop-black.svg';
import 'Assets/icons/king-black.svg';
import 'Assets/icons/knight-black.svg';
import 'Assets/icons/pawn-black.svg';
import 'Assets/icons/queen-black.svg';
import 'Assets/icons/rook-black.svg';
import 'Assets/icons/bishop-white.svg';
import 'Assets/icons/king-white.svg';
import 'Assets/icons/knight-white.svg';
import 'Assets/icons/pawn-white.svg';
import 'Assets/icons/queen-white.svg';
import 'Assets/icons/rook-white.svg';

const Icon = ({ name, color }) => (
  <svg width="64" height="64">
    <use xlinkHref={`#${name}-${color}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Icon;
