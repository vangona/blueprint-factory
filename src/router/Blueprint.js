import AddBtn from "components/mindmap/AddBtn";
import React from "react";
import styled from "styled-components";
import PrevBtn from "../components/btn/PrevBtn";
import CytoscapeMindmap from "../components/mindmap/CytoscapeMindmap";
import { defaultContainer } from "../css/styleConstants";

const Container = styled.div`
  ${defaultContainer};
  padding-bottom: var(--nav-height);
  box-sizing: border-box;
`;

function Blueprint({ userObj }) {
  return (
    <Container>
      <PrevBtn />
      <CytoscapeMindmap userObj={userObj} />
      <AddBtn />
    </Container>
  );
}

export default Blueprint;
