import React from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import { defaultContainer, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';
import img from "../../../img/digit.png";

const Container = styled.div`
    ${defaultContainer};
    ${targetFactoryContent};
    gap: 10px;
`;

const Title = styled.div`
    ${targetFactoryContentTitle};
    font-size: 25px;
`;

const Bold = styled.span`
    ${targetFactoryContentTitle};
    color: var(--main-blue);
`;

const Img = styled.img`
    width: 70%;
`;

const Explain = styled.div`
    font-family: SsurroundAir;
`;

const Input = styled.input`
    ${targetFactoryContentInput};
`;

const ShorttermDigit = ({getDigit, target}) => {
    const [digit, setDigit] = useState('');

    const onChange = e => {
        setDigit(e.target.value);
        getDigit(e.target.value);
    }

    return (
        <Container>
            <Title>
                {target}(을)를 <br /> 
                <Bold>'숫자'</Bold>로 나타내 볼까요?
            </Title>
            <Img src={img}/>
            <Explain>
                ex) 독서하기 ={'>'} 한 달 3권 이상 독서하기
            </Explain>
            <Input type="text" value={digit} onChange={onChange}/>
        </Container>
    );
};

export default ShorttermDigit;