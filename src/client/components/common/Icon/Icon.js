import React from 'react';

import PropTypes from 'prop-types';

import 'Assets/icons';

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
