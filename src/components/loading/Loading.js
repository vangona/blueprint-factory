import React from "react";
import styled from "styled-components";
import { defaultContainer } from "../../css/styleConstants";
import BackgroundTopCloud from "../background/BackgroundTopCloud";
import { LoadingComments } from "./LoadingDB";

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
`;

const Content = styled.div`
  font-family: Ssurround;
  font-size: 20px;
  color: var(--main-blue);
  z-index: 99;
  white-space: pre-wrap;
  line-height: 140%;
  text-align: center;
`;

function Loading() {
  const randNum = Math.floor(Math.random() * LoadingComments.length);

  return (
    <Container>
      <BackgroundTopCloud />
      <Content>{LoadingComments[randNum]}</Content>
    </Container>
  );
}

export default Loading;
