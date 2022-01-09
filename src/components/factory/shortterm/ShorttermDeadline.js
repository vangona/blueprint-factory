import React from 'react';
import styled from 'styled-components';
import { defaultContainer, targetFactoryContent, targetFactoryContentInput, targetFactoryContentTitle } from '../../../css/styleConstants';
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

const ShorttermDeadline = ({getDeadline, deadline, target}) => {

    const onChange = e => {
        getDeadline(e.target.value);
    }

    return (
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
    );
};

export default ShorttermDeadline;