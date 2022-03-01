import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { defaultBtnAction, defaultContainer } from "../../css/styleConstants";
import BackgroundTopCloud from "../background/BackgroundTopCloud";

const Container = styled.div`
  ${defaultContainer}
  justify-content: center;
  gap: 30px;
`;

const Notice = styled.div`
  color: var(--main-blue);
  font-family: Ssurround;
  font-size: 22px;
  z-index: 99;
`;

const BackBtn = styled.div`
  ${defaultBtnAction};
  z-index: 99;
  font-family: SsurroundAir;
  border: 1px solid black;
  padding: 10px 15px;
  border-radius: 10px;
`;

function NotFound() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackgroundTopCloud />
      <Notice>앗! 여기는 아무것도 없네요!</Notice>
      <BackBtn onClick={onClick}>돌아가기</BackBtn>
    </Container>
  );
}

export default NotFound;
