import React from 'react';

import styled from 'styled-components';

import media from 'Utils/media';

const Layout = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 60%;
  padding: 20px;

  ${media.tablet`width: 80%;`}
  ${media.phone`width: 100%;`}
`;

export default Layout;
