import React, { useState } from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../../css/styleConstants';
import Wordcloud from './Wordcloud';

const Container = styled.div`
    ${defaultContainer};
    justify-content: center;
    align-items: center;
`;

const ValueFactory = () => {
    const [value, setValue] = useState('');

    const onChange = e => {
        e.preventDefault();

        setValue(e.target.value);
    }

    return (
        <Container>
            <Wordcloud />
        </Container>
    );
};

export default ValueFactory;