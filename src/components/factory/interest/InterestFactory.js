import React, { useState } from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../../css/styleConstants';
import { questions } from '../value/valueDB';

const Container = styled.div`
    ${defaultContainer};
    justify-content: center;
    align-items: center;
`;

const InterestBox = styled.div``;

const InterestLabel = styled.label``;

const InterestInput = styled.input``;

const InterestFactory = () => {
    const [interest, setInterest] = useState('');

    const onChange = e => {
        e.preventDefault();

        setInterest(e.target.value);
    }

    return (
        <Container>
            <InterestBox>
                <InterestLabel htmlFor='input__interest'>
                    {questions[Math.floor(Math.random() * questions.length)]}
                </InterestLabel>
                <InterestInput id='input__interest' type="text" value={interest} onChange={onChange} />
            </InterestBox>
        </Container>
    );
};

export default InterestFactory;