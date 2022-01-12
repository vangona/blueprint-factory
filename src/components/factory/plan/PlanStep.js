import React from 'react';
import styled from 'styled-components';
import { blockBtn, defaultBtnAction, defaultContainer, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';
import img from "../../../img/need.png";

const Container = styled.div`
    ${defaultContainer};
    ${targetFactoryContent};
    gap: 15px;
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
    text-align: center;
    font-family: SsurroundAir;
    font-size: 15px;
    color: var(--main-blue);
    line-height: 25px;
`;

const InputBox = styled.div`
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const Input = styled.input`
    ${targetFactoryContentInput};
`;

const Plus = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    background-color: #3F5DAC;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 30px;
    color: white;
    ${defaultBtnAction};
`;

const NeedContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: SsurroundAir;
`;

const NeedBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

const StepIndex = styled.span``;

const Need = styled.div``;

const DeleteBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    background-color: #3F5DAC;
    border: none;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    font-size: 15px;
    color: white;
    ${defaultBtnAction};
`;

const BlockBtn = styled.div`
    ${blockBtn};
`;

const PlanStep = ({getStep, step, stepArr, onClickStep, onClickDelete, target}) => {

    const onChange = e => {
        getStep(e.target.value);
    }

    return (
        <>
        <Container>
            <Title>
                <Bold>{target}</Bold> <br /> 
                <Bold>단계를</Bold> 나눠봅시다.
            </Title>
            <Img src={img}/>
            <Explain>
                계획을 오늘 당장 실행하기 어렵다면, <br />
                청사진으로 돌아가서 목표를 더 쪼개봅시다!
            </Explain>
            <InputBox>    
                <Input type="text" value={step} onChange={onChange}/>
                <Plus onClick={onClickStep}>+</Plus>
            </InputBox>
            <Explain>
                {stepArr.length === 0 && 'Hint : 1단계는 오늘이라도 할 수 있어야해요!'}
            </Explain>
            <NeedContainer>
                {stepArr.map((step, index) => (
                    <NeedBox key={index} id={index}>
                        <StepIndex>{index + 1}단계 : </StepIndex>
                        <Need>{step}</Need>
                        <DeleteBtn onClick={onClickDelete}>-</DeleteBtn>
                    </NeedBox>
                ))}
            </NeedContainer>
            <Explain>
                {stepArr.length === 1 && 'Hint : 단계가 끝나면 다음 단계를 할 수 있어야해요!'}
            </Explain>
        </Container>
        {!stepArr.length && <BlockBtn></BlockBtn>}
        </>
    );
};

export default PlanStep;