import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import styled from "styled-components";
import { defaultBtnAction } from "../../css/styleConstants";

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px;
  right: 20px;
  z-index: 50;
  background-color: #3f5dac;
  border: none;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  font-size: 30px;
  ${defaultBtnAction};
`;

function NextBtn({ page, setPage }) {
  return (
    <Btn onClick={() => setPage(page + 1)}>
      <IoMdArrowRoundForward style={{ fill: "white" }} />
    </Btn>
  );
}

export default NextBtn;
