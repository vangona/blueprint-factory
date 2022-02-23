import React, { useState } from 'react';
import styled from 'styled-components';
import NextBtn from '../components/btn/NextBtn';
import ValueFactory from '../components/factory/value/ValueFactory';
import { defaultContainer } from '../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
`;

const FindValue = () => {
    const [page, setPage] = useState(1);

    return (
        <Container>
            <ValueFactory />
            <NextBtn page={page} setPage={setPage} />
        </Container>
    );
};

export default FindValue;