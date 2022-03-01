import React from "react";
import styled from "styled-components";
import SettingLowerComponent from "../components/settings/SettingLowerComponent";
import SettingUpperComponent from "../components/settings/SettingUpperComponent";
import { defaultContainer } from "../css/styleConstants";

const Container = styled.div`
  ${defaultContainer};
`;

function Setting({ userObj }) {
  return (
    <Container>
      <SettingUpperComponent userObj={userObj} />
      <SettingLowerComponent userObj={userObj} />
    </Container>
  );
}

export default Setting;
