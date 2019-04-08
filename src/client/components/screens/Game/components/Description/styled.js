import styled from 'styled-components';

import {Segment} from 'semantic-ui-react';

export const Wrapper = styled(Segment)`
    width: 250px;
    margin: 0 !important;
    margin-right: 20px !important;
`;

export const GameDescription = styled.div`
    display: flex;
    align-items: center;
    padding-top: 1rem;
    vertical-align: middle;
`;

export const Text = styled.p`
    margin: 0;
    margin-left: 10px;
    color: #767676;
`;

export const Players = styled.div`
    display: flex;
    flex-direction: column;
    vertical-align: middle;
`;
