import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from 'css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
    position: absolute;
    top: 0;
    justify-content: center;
    height: 100vh;
    z-index: 10;
    gap: 15px;
    overflow: hidden;
`;

const Title = styled.h1`
    font-size: 28px;
    font-family: Ssurround;
    text-align: center;
    line-height: 55px;
`;

const Explain = styled.div`
    font-family: SsurroundAir;
    font-size: 15px;
    color: var(--main-blue);
    line-height: 25px;
    text-align: center;
`;

const Bold = styled.span`
    font-weight: bold;
`;

const CloudBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TargetName = styled.div`
    color: black;
    font-family: Ssurround;
`;

const Noitce = styled.div`
    font-family: SsurroundAir;    
`;

const Label = styled.label`
    width: auto;
    word-break: keep-all;
`;

const Input = styled.input`
    font-family: SsurroundAir;
    background-color: #EEEEEE;
    border-radius: 30px;
    height: 45px;
    padding: 20px;
    box-sizing: border-box;
`;

const RoutineBox = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-family: SsurroundAir;
`;

const SubmitBlockBtn = styled.div`
    position: fixed;
    bottom: 20px;
    z-index: 99;
    background-color: white;
    border: none;
    width: 200px;
    height: 50px;
`;

const PrivateBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: SsurroundAir;
    gap: 5px;
`;

const CheckBox = styled.input``;

const PrivateLabel = styled.label``;

const RoutinePeriod = ({getPeriod, getFrequency, period, frequency, need, getIsPrivate, isPrivate}) => {

    const onChange = e => {
        const name = e.target.getAttribute('name');
        if (name === "period") {
            getPeriod(e.target.value);
        }
        if (name === "frequency") {
            getFrequency(e.target.value);
        }
        if (name === 'isPrivate') {
            getIsPrivate(e.target.checked);
        }
    }
    
    return (
        <>
        <Container>
            <Title>
                루틴으로 만들어봅시다.
            </Title>
            <Explain>
                ex) <Bold>1주일</Bold>에 <Bold>3회</Bold> <Bold>운동</Bold>
            </Explain>
            <CloudBox>
                <TargetName>
                    {period && `${period}에`} {frequency} {need}
                </TargetName>
            </CloudBox>
            <RoutineBox>
                <Label>주기</Label>
                <Input name="period" value={period} type="text" onChange={onChange} placeholder='얼마나 자주 할까요?' />
            </RoutineBox>
            <RoutineBox>
                <Label>빈도 수</Label>
                <Input name="frequency" value={frequency} type="text" onChange={onChange} placeholder={period ? `${period}에 몇 번 할까요?` : "몇 번이나 할까요?"} />
            </RoutineBox>
            <PrivateBox>
                <CheckBox name="isPrivate" id="is-private" type="checkbox" checked={isPrivate} onChange={onChange} />
                <PrivateLabel htmlFor='is-private'>이 루틴은 비밀로 할래요.</PrivateLabel>
            </PrivateBox>
        </Container>
        {!frequency | !period && <SubmitBlockBtn></SubmitBlockBtn>}
        </>
    );
};

export default RoutinePeriod;