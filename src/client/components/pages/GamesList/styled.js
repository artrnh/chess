import styled from 'styled-components';

import { Header as _Header } from 'semantic-ui-react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled(_Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
