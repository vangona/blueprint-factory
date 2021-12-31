import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer}
`;

const RoutineFactory = () => {
    return (
        <Container>
            RoutineFactory
        </Container>
    );
};

export default RoutineFactory;