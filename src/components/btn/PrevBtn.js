import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import styled from "styled-components";
import { defaultBtnAction } from "css/styleConstants";

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px;
  left: 20px;
  z-index: 50;
  background-color: #3f5dac;
  border: none;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  font-size: 30px;
  ${defaultBtnAction};
`;

function PrevBtn({ onClick, arg }) {
  return (
    <Btn onClick={() => onClick(arg)}>
      <IoMdArrowRoundBack style={{ fill: "white" }} />
    </Btn>
  );
}

export default PrevBtn;
