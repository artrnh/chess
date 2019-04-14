import styled from 'styled-components';

import {Segment} from 'semantic-ui-react';

export const Container = styled.div`
    display: flex;
    height: 64px;
    margin-top: 15px;
`;

export const Wrapper = styled(Segment)`
    display: flex;
    align-self: center;
    margin-bottom: 0 !important;
    padding: 0 !important;
`;

export const ToggleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 64px;
    width: 64px;
    padding-left: 10px;
`;
