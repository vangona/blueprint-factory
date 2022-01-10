import React from 'react';
import { useState } from 'react/cjs/react.development';
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TargetName = styled.div`
    position: absolute;
    color: white;
    font-family: Ssurround;
`;

const Cloud = styled.img`
    width: 100%;
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
`;

const PlanName = ({name, getName}) => {

    const onChange = e => {
        getName(e.target.value);
    }
    
    return (
        <Container>
            <Title>
                먼저 계획 이름을 <br />
                써볼까요?
            </Title>
            <CloudBox>
                <TargetName>
                    {name}
                </TargetName>
                <Cloud src={cloud} />
            </CloudBox>
            <Input value={name} type="text" onChange={onChange} />
            <Noitce>
                {name && "다 썼다면 다음으로 넘어가봅시다."}
            </Noitce>
        </Container>
    );
};

export default PlanName;