import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../../css/styleConstants';
import cloud from "../../../img/cloud.png"

const Container = styled.div`
    ${defaultContainer};
    position: absolute;
    top: 0;
    justify-content: center;
    height: 100vh;
    z-index: 99;
    gap: 15px;
    overflow: hidden;
`;

const Title = styled.h1`
    font-size: 28px;
    font-family: Ssurround;
    text-align: center;
    line-height: 55px;
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


const RoutinePeriod = ({getPeriod, getFrequency, period, frequency, need}) => {

    const onChange = e => {
        const name = e.target.getAttribute('name');
        if (name === "period") {
            getPeriod(e.target.value);
        }
        if (name === "frequency") {
            getFrequency(e.target.value);
        }
    }
    
    return (
        <Container>
            <Title>
                루틴으로 만들어봅시다.
            </Title>
            <CloudBox>
                <TargetName>
                    {period && `${period}에` } {frequency} {need}
                </TargetName>
            </CloudBox>
            <RoutineBox>
                <Label>주기</Label>
                <Input name="period" value={period} type="text" onChange={onChange} placeholder='행동의 주기' />
            </RoutineBox>
            <RoutineBox>
                <Label>빈도 수</Label>
                <Input name="frequency" value={frequency} type="text" onChange={onChange} placeholder='주기 별 반복 횟수' />
            </RoutineBox>
            <Noitce>
                {frequency && period && "다 썼다면 다음으로 넘어가봅시다."}
            </Noitce>
        </Container>
    );
};

export default RoutinePeriod;