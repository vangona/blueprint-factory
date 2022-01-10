import React from 'react';
import styled from 'styled-components';
import { blockBtn, defaultContainer, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';
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
    color: var(--main-blue);
    font-family: SsurroundAir;
`;

const Input = styled.input`
    ${targetFactoryContentInput};
`;

const BlockBtn = styled.div`
    ${blockBtn}
`;

const LongtermDesire = ({getDesire, desire, target}) => {

    const onChange = e => {
        getDesire(e.target.value);
    }

    return (
        <>
        <Container>
            <Title>
                {target}(을)를 <br /> 
                원하는 이유가 무엇이신가요?
            </Title>
            <Img src={img}/>
            <Explain>
                ex) 재테크 공부 ={'>'} 돈을 불리고 싶어서
            </Explain>
            <Input type="text" value={desire} onChange={onChange}/>
        </Container>
        {!desire && <BlockBtn></BlockBtn>}
        </>
    );
};

export default LongtermDesire;