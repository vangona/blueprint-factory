import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
    justify-content: center;
`;

const Loading = () => {
    return (
        <Container>
            Loading...
        </Container>
    );
};

export default Loading;