import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NextBtn from "components/btn/NextBtn";
import { defaultContainer } from "css/styleConstants";
import MvpValueFactory from "components/mvp/factory/MvpValueFactory";
import PrevBtn from "components/btn/PrevBtn";
import valueDB from "assets/db/value/valueDB";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  ${defaultContainer};
`;

function MvpFindValue() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [valueArr, setValueArr] = useState(Array.from({ length : valueDB.length }, () => ''));
  const [page, setPage] = useState(0);

  const onClickResult = () => {
    const tempArr = [...valueArr];
    tempArr[page] = value;

    const answerArr = [];
    for (let i = 0; i < tempArr.length; i++) {
      answerArr[i] = {
        'question' : valueDB[i].revealed,
        'answer' : tempArr[i]
      }
    }

    localStorage.setItem('blueprint-factory_answer', JSON.stringify(answerArr));

    navigate('/result');
  }

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
  
  const onClickReturn = () => {
    navigate('/guide/value');
  }

  useEffect(() => {
    if (localStorage.getItem('blueprint-factory_answer')) {
      const answerArr = JSON.parse(localStorage.getItem('blueprint-factory_answer'));
      console.log(answerArr);
      setTimeout(() => {
        setValueArr([...answerArr]);
        setValue(answerArr[0].answer);  
      })
    }
  }, [])

  return (
    <Container>
      {page >= 0 && <MvpValueFactory page={page} value=
      {value} setValue={setValue} />}
      <PrevBtn onClick=
        {page > 0
          ? onClickPrev
          : onClickReturn
        }
      />
      {page < valueDB.length && value && 
        <NextBtn onClick=
          {page === valueDB.length - 1 
            ? onClickResult 
            : onClickNext
          } 
        />
      }
    </Container>
  );
}

export default MvpFindValue;
