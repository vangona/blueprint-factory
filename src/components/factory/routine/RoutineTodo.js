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

const Input = styled.input`
    font-family: SsurroundAir;
    background-color: #EEEEEE;
    border-radius: 30px;
    width: 80%;
    height: 45px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    ::placeholder {
        text-align: center;
    }
`;


const RoutineTodo = ({getNeed, need, parent}) => {

    const onChange = e => {
        getNeed(e.target.value);
    }
    
    return (
        <Container>
            <Title>
                {parent.name}을(를) 위해 <br />
                반복해야하는 것이 있나요?
            </Title>
            <Input name="need" value={need} type="text" onChange={onChange} placeholder='목표 행동' />
            <Noitce>
                {need && "다 썼다면 다음으로 넘어가봅시다."}
            </Noitce>
        </Container>
    );
};

export default RoutineTodo;