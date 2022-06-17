import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultContainer } from "css/styleConstants";
import cloud from "assets/img/cloud.png";
import DoughnutChart from "./DoughnutChart";

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

function HomeUpperComponent({ userObj, todayTargets }) {
  const [compishmentRate, setComplishmentRate] = useState(0);

  const getComplishmentRate = () => {
    if (todayTargets.length === 0) {
      setComplishmentRate(100);
    } else {
      const complishedTarget = todayTargets.filter(
        (target) => target.isComplished === true
      );
      const rate = (complishedTarget.length / todayTargets.length) * 100;
      setComplishmentRate(rate);
    }
  };

  useEffect(() => {
    getComplishmentRate();
  });

  return (
    <Container>
      <Cloud src={cloud} />
      <Title>
        <Bold>{userObj.displayName}</Bold>님의 <br />
        오늘의 <Bold>뜬구름</Bold>
      </Title>
      <ChartContainer>
        <DoughnutChart compishmentRate={compishmentRate} />
      </ChartContainer>
    </Container>
  );
}

export default HomeUpperComponent;
