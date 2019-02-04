import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styled';

const Layout = ({ children }) => <Container>{children}</Container>;

Layout.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Layout;
