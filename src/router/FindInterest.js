import React from 'react';
import styled from 'styled-components';
import InterestFactory from '../components/factory/interest/InterestFactory';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
`;

const FindInterest = () => {
    return (
        <Container>
            <InterestFactory />
        </Container>
    );
};

export default FindInterest;