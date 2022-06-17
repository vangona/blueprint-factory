import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 70%;
  max-height: 70%;
`;

function DoughnutChart({ compishmentRate }) {
  const data = [
    { name: "complished", value: compishmentRate, color: "#BBD0FF" },
  ];

  return (
    <Container>
      <PieChart
        data={data}
        reveal={compishmentRate}
        lineWidth={18}
        background="#F5F5F5"
        lengthAngle={360}
        rounded
        animate
        label={({ dataEntry }) => `${dataEntry.value}%`}
        labelStyle={{
          fontFamily: "SSurround",
          fontSize: "22px",
          fill: "#5390E2",
        }}
        labelPosition={0}
      />
    </Container>
  );
}
export default DoughnutChart;
