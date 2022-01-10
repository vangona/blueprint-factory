import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';
import DoughnutChart from './DoughnutChart';
import cloud from "../../img/cloud.png"

const Container = styled.div`
    ${defaultContainer};
    align-items: flex-start;
`;

const Cloud = styled.img`
    position: absolute;
    width: 20%;
    top: 20px;
    right: 40%;
    left: 40%;
`;

const Title = styled.div`
    margin-top: 30px;
    margin-left: 30px;
    font-family: Ssurround;
    font-size: 25px;
`;

const Bold = styled.span`
    color: var(--main-blue);
`;

const ChartContainer = styled.div`
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HomeUpperComponent = ({userObj}) => {
    return (
        <Container>
            <Cloud src={cloud} />
            <Title>
                <Bold>{userObj.displayName}</Bold>님의 <br />
                오늘의 <Bold>구름</Bold>
            </Title>
            <ChartContainer>
                <DoughnutChart />
            </ChartContainer>
        </Container>
    );
};

export default HomeUpperComponent;