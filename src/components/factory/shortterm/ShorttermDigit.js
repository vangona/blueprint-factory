import React from 'react';
import styled from 'styled-components';
import { defaultContainer, targetFactoryContent, targetFactoryContentTitle } from '../../../css/styleConstants';
import img from "../../../img/digit.png";

const Container = styled.div`
    ${defaultContainer};
    ${targetFactoryContent};
`;

const Title = styled.div`
    ${targetFactoryContentTitle};
    font-size: 25px;
`;

const Img = styled.img`
    width: 70%;
`;

const Explain = styled.div``;

const ShorttermDigit = ({getDigit, target}) => {
    return (
        <Container>
            <Title>
                {target}(을)를 <br /> 
                '숫자'로 나타내 볼까요?
            </Title>
            <Img src={img}/>
        </Container>
    );
};

export default ShorttermDigit;