import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { defaultContainer } from 'css/styleConstants';
import { valueDB } from 'assets/db/value/valueDB.js';

const Container = styled.div`
    ${defaultContainer};
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-family: Ssurround;
`;

const ValueBox = styled.div``;

const ValueLabel = styled.label``;

const ValueImg = styled.img``;

const ValueInput = styled.input``;

const ValueFactory = () => {
    const [questionArr, setQuestionArr] = useState([]);
    const [index, setIndex] = useState('');
    const [question, setQuestion] = useState('');
    const [questionImg, setQuestionImg] = useState('');
    const [value, setValue] = useState('');

    const onChange = e => {
        e.preventDefault();

        setValue(e.target.value);
    }

    const getQuestion = () => {
        // 동적으로 이미지를 할당하기 위해서, require로 이미지를 불러올 수 있는 주소를 DB 배열에 입력해두고 질문에 맞는 이미지를 불러오게 함.
        const randumNum = Math.floor(Math.random() * valueDB.length);
        setIndex(randumNum);
        setQuestion(valueDB[randumNum][0]);
        setQuestionImg(valueDB[randumNum][1]);
    }

    useEffect(() => {
        getQuestion();
    }, []);

    return (
        <Container>
            <ValueLabel htmlFor='input__Value'>
                {question}
            </ValueLabel>
            <ValueImg src={questionImg} alt='사진이 없네용'/>
            <ValueInput id='input__Value' type="text" value={value} onChange={onChange} />
        </Container>
    );
};

export default ValueFactory;