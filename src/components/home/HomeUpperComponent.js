import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
`;

const HomeUpperComponent = () => {
    return (
        <Container>
            Upper
        </Container>
    );
};

export default HomeUpperComponent;