import styled from 'styled-components';

import {Segment} from 'semantic-ui-react';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 250px;
`;

export const Wrapper = styled(Segment)`
    width: 100%;
    margin: 5px 0 !important;
    margin-left: 20px !important;
    color: #767676;
`;

export const Turn = styled.span`
    visibility: ${props => (props.visible ? 'visible' : 'hidden')};
    font-weight: bold;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: center;
`;
