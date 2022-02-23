import React from 'react';
import styled from 'styled-components';
import { blockBtn, defaultContainer } from 'css/styleConstants';
import cloud from "assets/img/cloud.png"

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
    font-size: 25px;
    font-family: Ssurround;
    text-align: center;
    line-height: 55px;
`;

const Bold = styled.span`
    color: var(--main-blue);
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

const BlockBtn = styled.div`
    ${blockBtn};
`;

const LongtermName = ({parent, target, getTarget}) => {

    const onChange = e => {
        getTarget(e.target.value);
    }
    
    return (
        <>
        <Container>
            <Title>
                {parent && parent.id !== 'new' 
                ?
                    <>
                        <Bold>{parent.name}</Bold>을(를) 위해 <br />
                        필요한 <Bold>장기 목표</Bold>가 무엇인가요?
                    </>
                :
                    <> 
                        <Bold>이루고 싶은 목표</Bold>가 무엇인가요?
                    </>
                }
            </Title>
            <CloudBox>
                <TargetName>
                    {target}
                </TargetName>
                <Cloud src={cloud} />
            </CloudBox>
            <Input value={target} type="text" onChange={onChange} />
            <Noitce>
                {target && "다 썼다면 다음으로 넘어가봅시다."}
            </Noitce>
        </Container>
        {!target && <BlockBtn></BlockBtn>}
        </>
    );
};

export default LongtermName;