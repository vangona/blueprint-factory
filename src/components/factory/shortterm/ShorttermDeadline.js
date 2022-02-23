import React from 'react';
import styled from 'styled-components';
import { blockBtn, defaultContainer, factoryImg, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from 'css/styleConstants';
import img from "assets/img/finder/deadline.png";

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
    font-family: SsurroundAir;
    font-size: 15px;
    color: var(--main-blue);
`;

const Input = styled.input`
    ${targetFactoryContentInput};
`;

const BlockBtn = styled.div`
    ${blockBtn};
`;

const ShorttermDeadline = ({getDeadline, deadline, target}) => {

    const onChange = e => {
        getDeadline(e.target.value);
    }

    return (
        <>
        <Container>
            <Title>
                <Bold>{target}</Bold>(을)를 <br /> 
                <Bold>언제까지</Bold> 이루면 될까요?
            </Title>
            <Img src={img}/>
            <Explain>
                현실적 일정을 고려해봐요!
            </Explain>
            <Input type="date" value={deadline} onChange={onChange}/>
        </Container>
        {!deadline && <BlockBtn></BlockBtn>}
        </>
    );
};

export default ShorttermDeadline;