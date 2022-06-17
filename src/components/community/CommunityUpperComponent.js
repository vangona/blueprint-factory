import React from "react";
import styled from "styled-components";
import { ImCloud } from "react-icons/im";
import { defaultContainer } from "css/styleConstants";
import SearchBar from "components/common/SearchBar";

const Container = styled.div`
  ${defaultContainer};
  justify-content: flex-start;
  height: 20vh;
  background: rgb(86, 124, 233);
  background: linear-gradient(
    180deg,
    rgba(86, 124, 233, 1) 0%,
    rgba(172, 190, 255, 1) 100%
  );
`;

const Cloud = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 45px;
  transform: scaleX(-1);
`;

function UpperComponent({ getSearchWord, searchWord }) {
  return (
    <Container>
      <Cloud>
        <ImCloud style={{ fill: "white", color: "white" }} />
      </Cloud>
      <SearchBar getSearchWord={getSearchWord} searchWord={searchWord} />
    </Container>
  );
}

export default UpperComponent;
