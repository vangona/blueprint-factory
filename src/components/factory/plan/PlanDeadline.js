import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  blockBtn,
  defaultBtnAction,
  defaultContainer,
  factoryImg,
  targetFactoryContent,
  targetFactoryContentInput,
  targetFactoryContentTitle,
} from "css/styleConstants";
import img from "assets/img/finder/deadline.png";
import StepInput from "./StepInput";

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
  ${factoryImg};
`;

const Explain = styled.div`
  font-family: SsurroundAir;
  font-size: 15px;
  color: var(--main-blue);
`;

const StepContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: SsurroundAir;
`;

const BlockBtn = styled.div`
  ${blockBtn};
`;

function PlanDeadline({
  getDeadlineArr,
  deadlineArr,
  deadlineState,
  explainArr,
  target,
}) {
  const Time = new Date(Date.now());
  const YearTime = Time.getFullYear();
  const MonthTime =
    Time.getMonth() + 1 < 10
      ? "0" + `${Time.getMonth() + 1}`
      : `${Time.getMonth() + 1}`;
  const DateTime =
    Time.getDate() < 10 ? "0" + `${Time.getDate()}` : `${Time.getDate()}`;

  return (
    <>
      <Container>
        <Title>
          <Bold>각 단계</Bold>를 <br />
          <Bold>언제까지</Bold> 이루면 될까요?
        </Title>
        <Img src={img} />
        <Explain>현실적 일정을 고려해봐요!</Explain>
        <StepContainer>
          {explainArr.map((step, index) => (
            <StepInput
              key={index}
              step={step}
              getDeadlineArr={getDeadlineArr}
              deadlineArr={deadlineArr}
              index={index}
              minDate={`${YearTime}-${MonthTime}-${DateTime}`}
              maxDate={`${YearTime + 1}-${MonthTime}-${DateTime}`}
            />
          ))}
        </StepContainer>
      </Container>
      {!deadlineState && <BlockBtn />}
    </>
  );
}

export default PlanDeadline;
