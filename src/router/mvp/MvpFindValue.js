import React, { useState } from "react";
import styled from "styled-components";
import NextBtn from "components/btn/NextBtn";
import { defaultContainer } from "css/styleConstants";
import MvpValueFactory from "components/mvp/factory/MvpValueFactory";
import PrevBtn from "components/btn/PrevBtn";
import valueDB from "assets/db/value/valueDB";

const Container = styled.div`
  ${defaultContainer};
`;

function MvpFindValue() {
  const [value, setValue] = useState('');
  const [valueArr, setValueArr] = useState(Array.from({ length : valueDB.length }, () => ''));
  const [page, setPage] = useState(0);

  const onClickNext = () => {
    const tempArr = [...valueArr];
    tempArr[page] = value;
    setValueArr([...tempArr]);
    setValue(valueArr[page + 1]);
    setPage(page + 1);
  }

  const onClickPrev = () => {
    const tempArr = [...valueArr];
    tempArr[page] = value;
    setValueArr([...tempArr]);
    setValue(valueArr[page - 1]);
    setPage(page - 1);
  }

  return (
    <Container>
      <MvpValueFactory page={page} value={value} setValue={setValue} />
      {page > 0 && <PrevBtn onClick={onClickPrev} />}
      {page < valueDB.length - 1 && value && <NextBtn onClick={onClickNext} />}
    </Container>
  );
}

export default MvpFindValue;
