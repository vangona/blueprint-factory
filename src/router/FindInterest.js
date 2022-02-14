import React, { useState } from 'react';
import styled from 'styled-components';
import NextBtn from '../components/btn/NextBtn';
import InterestFactory from '../components/factory/interest/InterestFactory';
import ValueFactory from '../components/factory/value/ValueFactory';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
`;

const FindInterest = () => {
    const [page, setPage] = useState(1);

    return (
        <Container>
            {page === 1 && <InterestFactory />}
            {page === 2 && <ValueFactory />}
            <NextBtn page={page} setPage={setPage} />
        </Container>
    );
};

export default FindInterest;