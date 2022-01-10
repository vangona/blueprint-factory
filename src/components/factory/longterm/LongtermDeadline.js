import React from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import { blockBtn, defaultContainer, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';
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
    width: 70%;
`;

const Explain = styled.div`
    font-family: SsurroundAir;
    font-size: 15px;
    color: var(--main-blue);
`;

const Input = styled.input`
    ${targetFactoryContentInput};
`;

const LifetimeBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: SsurroundAir;
`;

const CheckBox = styled.input`
    width: 15px;
    height: 15px;
`

const Label = styled.label``;

const BlockBtn = styled.div`
    ${blockBtn};
`;

const LongtermDeadline = ({getDeadline, deadline, target}) => {
    const [isLifetime, setIsLifetime] = useState(false);

    const onChange = e => {
        getDeadline(e.target.value);
    }

    const onChangeLifetime = e => {
        if(isLifetime === false) {
            getDeadline('');
        }
        setIsLifetime(!isLifetime);
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
            <LifetimeBox>
               <CheckBox id="lifetime" type="checkbox" onChange={onChangeLifetime} />
               <Label for="lifetime">평생동안 이룰 목표에요</Label>
            </LifetimeBox>
        </Container>
        {!deadline & !isLifetime && <BlockBtn></BlockBtn>}
        </>
    );
};

export default LongtermDeadline;