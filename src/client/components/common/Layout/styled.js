import styled from 'styled-components';

import media from 'Utils/media';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    width: 60%;
    padding: 20px;

    ${media.tablet`width: 80%;`}
    ${media.phone`width: 100%;`}
`;
