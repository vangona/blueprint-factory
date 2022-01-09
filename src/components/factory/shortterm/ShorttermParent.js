import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../../css/styleConstants';
import cloud from "../../../img/bottom-cloud.png"

const Container = styled.div`
    ${defaultContainer};
    justify-content: center;
    position: fixed;
    top: 0;
    background-color: #E4EFFF;
    z-index: 9;
`;

const Bold = styled.span`
    font-family: Ssurround;
    color: #3E83E2;
`;

const Content = styled.div`
    font-size: 25px;
    font-family: Ssurround;
    text-align: center;
    line-height: 50px;
    color: #061437;
`;

const BottomCloud = styled.img`
    position: absolute;
    bottom: 0;
    width: 100%;
    max-height: 20%;
`;

const ShorttermParent = ({userObj, parent}) => {
    return (
        <Container>
            <Content>
                <Bold>{parent.name}</Bold>에 대한 <br />
                <Bold>단기 목표</Bold>를 만들어봅시다!
            </Content>
            <BottomCloud src={cloud} />
        </Container>
    );
};

export default ShorttermParent;