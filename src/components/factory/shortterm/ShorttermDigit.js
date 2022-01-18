import React from 'react';
import styled from 'styled-components';
import { blockBtn, defaultContainer, factoryImg, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';
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
    ${factoryImg};
`;

const Explain = styled.div`
    color: var(--main-blue);
    font-family: SsurroundAir;
`;

const Input = styled.input`
    ${targetFactoryContentInput};
`;

const BlockBtn = styled.div`
    ${blockBtn}
`;

const ShorttermDigit = ({getDigit, digit, target}) => {

    const onChange = e => {
        getDigit(e.target.value);
    }

    return (
        <>
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
        {!digit && <BlockBtn></BlockBtn>}
        </>
    );
};

export default ShorttermDigit;