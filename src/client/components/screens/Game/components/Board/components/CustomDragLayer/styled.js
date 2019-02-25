import styled from 'styled-components';

export const Layer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const DraggedItem = styled.div.attrs(({ offset }) => ({
  style: !offset
    ? { display: 'none' }
    : { transform: `translate(${offset.x}px, ${offset.y}px)` },
}))``;
