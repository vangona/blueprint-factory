import React, { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  defaultBtnAction,
  defaultContainer,
  defaultTitle,
} from "css/styleConstants";
import BackgroundBottomCloud from "components/background/BackgroundBottomCloud";
import LongtermFactory from "components/factory/longterm/LongtermFactory";
import ShorttermFactory from "components/factory/shortterm/ShorttermFactory";

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  margin-bottom: 100px;
  z-index: 10;
  gap: 20px;
`;

const Title = styled.div`
  ${defaultTitle};
  position: absolute;
  top: 120px;
  font-size: 23px;
  z-index: 9;
  font-family: Ssurround;
`;

const ChoiceBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Longterm = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;
  gap: 10px;
`;

const Shortterm = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;
  gap: 10px;
`;

const ExplainBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  gap: 10px;
`;

const Explain = styled.div`
  font-family: SsurroundAir;
  text-align: center;
  line-height: 20px;
  font-size: 15px;
  z-index: 10;
`;

const ChoiceBtn = styled.button`
  padding: 10px 15px;
  border-radius: 15px;
  border: none;
  background-color: var(--main-blue);
  color: white;
  font-family: Ssurround;
  font-size: 18px;
  z-index: 10;
  ${defaultBtnAction};
`;

const ReturnBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 50;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  transform: scaleY(-1);
  :hover {
    cursor: pointer;
  }
  :active {
    transform: scaleY(-1) scale(0.98);
  }
`;

function TermChoice({ userObj, parent }) {
  const navigate = useNavigate();

  const onClick = (e) => {
    const name = e.target.getAttribute("name");
    if (name === "longterm") {
      navigate(`/blueprint/longterm${parent ? `/${parent.id}` : ""}`);
    }
    if (name === "shortterm") {
      navigate(`/blueprint/shortterm${parent ? `/${parent.id}` : ""}`);
    }
  };

  const onClickReturn = (e) => {
    e.preventDefault();
    navigate("/blueprint");
  };

  return (
    <Container>
      <BackgroundBottomCloud />
      <Title>?????? ????????? ???????????????????</Title>
      <ChoiceBox>
        <Longterm>
          <ChoiceBtn name="longterm" onClick={onClick}>
            ???????????? ?????????
          </ChoiceBtn>
          <ExplainBox>
            <Explain>
              1??? ????????? ????????? <br />
              ?????? ??? ?????????
            </Explain>
            <Explain>?????? ????????? ????????????</Explain>
            <Explain>????????? ?????????????????? ??????</Explain>
          </ExplainBox>
        </Longterm>
        <Shortterm>
          <ChoiceBtn name="shortterm" onClick={onClick}>
            ???????????? ?????????
          </ChoiceBtn>
          <ExplainBox>
            <Explain>1??? ??? ?????? ????????????.</Explain>
            <Explain>
              ?????? ?????? ?????????????????? <br /> ?????? ?????? ?????????.
            </Explain>
          </ExplainBox>
        </Shortterm>
      </ChoiceBox>
      <ReturnBtn onClick={onClickReturn}>
        <RiArrowGoBackLine />
      </ReturnBtn>
    </Container>
  );
}

export default TermChoice;
