import styled from 'styled-components';

import { Button, ListGroupItem } from 'reactstrap';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const CreateGameButton = styled(Button).attrs({ color: 'primary' })`
  align-self: flex-end;
  margin-left: 10px;
`;

export const Game = styled(ListGroupItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  padding-right: 0;
`;

export const GameTitle = styled(Button).attrs({ color: 'link' })`
  padding: 0;
`;
