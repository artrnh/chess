import React from 'react';

import {Loader as Spinner} from 'semantic-ui-react';

import {Wrapper} from './styled';

const Loader = () => (
    <Wrapper>
        <Spinner active size="massive" inline="centered" />
    </Wrapper>
);

export default Loader;
