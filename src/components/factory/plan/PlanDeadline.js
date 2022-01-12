import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';
import img from "../../../img/deadline.png";

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
    width: 40%;
`;

const Explain = styled.div`
    font-family: SsurroundAir;
    font-size: 15px;
    color: var(--main-blue);
`;

const StepContainer = styled.div`
margin-top: 10px;
display: flex;
flex-direction: column;
gap: 10px;
font-family: SsurroundAir;
`;

const StepBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

const Step = styled.div`
    width: auto;
`;

const Input = styled.input`
    ${targetFactoryContentInput};
    height: 14px;
    padding: 15px;
    font-size: 10px;
    width: auto;
`;

const PlanDeadline = ({getDeadlineArr, deadlineArr, explainArr, target}) => {

    const onChange = e => {
        getDeadlineArr(e);
    }

    return (
        <Container>
            <Title>
                <Bold>각 단계</Bold>를 <br /> 
                <Bold>언제까지</Bold> 이루면 될까요?
            </Title>
            <Img src={img}/>
            <Explain>
                현실적 일정을 고려해봐요!
            </Explain>
            <StepContainer>
                {explainArr.map((step, index) => (
                    <StepBox key={index}>
                        <Step>{index + 1}단계 : {step}</Step>
                        <Input id={index} type="date" value={deadlineArr[index]} onChange={onChange}/>
                    </StepBox>
                ))}
            </StepContainer>
        </Container>
    );
};

export default PlanDeadline;