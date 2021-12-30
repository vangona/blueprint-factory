import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer}
`;

const TargetFactory = () => {
    return (
        <Container>
            TargetFactory
        </Container>
    );
};

export default TargetFactory;