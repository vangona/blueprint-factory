import React from "react";
import styled from "styled-components";

const ParentContainer = styled.div``;

const ParentTitle = styled.div``;

const ParentExplain = styled.div``;

const ParentDeadline = styled.div``;

function Parent({ parent }) {
  const Time = new Date(parent.deadline.seconds * 1000);
  console.log(Time);
  const Year = Time.getFullYear();
  const Month = Time.getMonth() + 1;
  const DateTime = Time.getDate();
  const deadlineTime = `${Year}-${Month > 9 ? Month : `0${Month}`}-${
    DateTime > 9 ? DateTime : `0${DateTime}`
  }`;

  return (
    <ParentContainer>
      <ParentTitle>{parent.name}</ParentTitle>
      <ParentExplain>{parent.explain}</ParentExplain>
      <ParentDeadline>{deadlineTime}까지</ParentDeadline>
    </ParentContainer>
  );
}

export default Parent;
