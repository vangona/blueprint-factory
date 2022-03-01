import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  defaultBtn,
  defaultBtnAction,
  defaultContainer,
} from "../../css/styleConstants";

const Container = styled.div`
  ${defaultContainer};
  z-index: 99;
`;

const SignoutBtn = styled.button`
  ${defaultBtnAction};
  ${defaultBtn};
  position: absolute;
  bottom: 100px;
`;

function SettingLowerComponent({ userObj }) {
  const navigate = useNavigate();

  return (
    <Container>
      <SignoutBtn
        onClick={() => {
          navigate("/signout");
        }}
      >
        로그아웃
      </SignoutBtn>
    </Container>
  );
}

export default SettingLowerComponent;
