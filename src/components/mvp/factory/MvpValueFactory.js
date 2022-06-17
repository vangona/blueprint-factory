import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultContainer } from "css/styleConstants";
import valueDB from "assets/db/value/valueDB";

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: Ssurround;
`;

const ValueTitle = styled.div`
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const ValueLabel = styled.label`
  font-family: SsurroundAir;
  margin: 10px;
  max-width: 80vw;
  text-indent: 1rem;
  word-break: keep-all;
  line-height: 160%;
  white-space: pre-line;
`;

const ValueImg = styled.img`
  width: 80vw;
  height: auto;
`;

const ValueInput = styled.textarea`
  width: 80vw;
  height: 10vh;
  padding: 10px;
  font-family: SsurroundAir;
`;

function MvpValueFactory({ page, value, setValue }) {

  const onChange = (e) => {
    setValue(e.target.value);
  }

  useEffect(() => {
  }, []);

  return (
    <Container>
      <ValueTitle>
        {valueDB[page].title}
      </ValueTitle>
      <ValueImg src={valueDB[page].img} alt="사진이 없네용" />
      <ValueLabel htmlFor="input__Value">{valueDB[page].question}</ValueLabel>
      <ValueInput
        id="input__Value"
        value={value}
        onChange={onChange}
      />
    </Container>
  );
}

export default MvpValueFactory;
