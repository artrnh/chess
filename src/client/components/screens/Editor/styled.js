import styled from 'styled-components';

import {Segment} from 'semantic-ui-react';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Description = styled(Segment)`
    width: 250px;
    margin: 0 !important;
    margin-right: 20px !important;
`;

export const Title = styled.p`
    margin: 5px 0;
    font-size: 1.15rem;
    font-weight: 600;
`;
