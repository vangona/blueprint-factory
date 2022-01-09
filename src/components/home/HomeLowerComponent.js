import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
`;

const HomeLowerComponent = () => {
    return (
        <Container>
            Lower
        </Container>
    );
};

export default HomeLowerComponent;