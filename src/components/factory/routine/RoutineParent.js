import React from "react";
import styled from "styled-components";
import { defaultContainer } from "css/styleConstants";
import cloud from "assets/img/background/bottom-cloud.png";

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  position: fixed;
  top: 0;
  background-color: #e4efff;
  z-index: 9;
  gap: 10px;
`;

const Bold = styled.span`
  font-family: Ssurround;
  color: #3e83e2;
`;

const Title = styled.div`
  font-size: 25px;
  font-family: Ssurround;
  text-align: center;
  line-height: 50px;
  color: #061437;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 70%;
  font-family: SsurroundAir;
  line-height: 20px;
`;

const Explain = styled.div`
  word-break: keep-all;
  text-align: center;
`;

const Deadline = styled.div``;

const BottomCloud = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: 20%;
`;

function RoutineParent({ userObj, parent }) {
  const Time = new Date(parent.deadline.seconds * 1000);
  console.log(Time);
  const Year = Time.getFullYear();
  const Month = Time.getMonth() + 1;
  const DateTime = Time.getDate();
  const deadlineTime = `${Year}-${Month > 9 ? Month : `0${Month}`}-${
    DateTime > 9 ? DateTime : `0${DateTime}`
  }`;

  return (
    <Container>
      <Title>
        <Bold>{parent.name}</Bold>(을)를 위한 <br />
        <Bold>루틴</Bold>을 세워봅시다!
      </Title>
      <Content>
        <Explain>{parent.explain}</Explain>
        {parent.deadline && <Deadline>{deadlineTime}까지</Deadline>}
      </Content>
      <BottomCloud src={cloud} />
    </Container>
  );
}

export default RoutineParent;
