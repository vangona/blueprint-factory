import React, { useState } from 'react';
import styled from 'styled-components';
import NextBtn from 'components/btn/NextBtn';
import { defaultContainer } from 'css/styleConstants';
import valueGuide from 'assets/db/value/valueGuide';
import PrevBtn from 'components/btn/PrevBtn';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
`;

const Comment = styled.div`
  font-family: SsurroundAir;
  width: 80%;
  word-break: keep-all;
  white-space: pre-line;
  line-height: 160%;
`;

const MvpValueGuide = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const onClickNext = () => {
    setPage(page + 1);
  }

  const onClickPrev = () => {
    setPage(page - 1);
  }

  const onClickReturn = () => {
    navigate('/guide');
  }

  const onClickNavigate = () => {
    navigate('/value');
  }

  return (
    <Container>
      <Comment>
        {valueGuide[page]}
      </Comment>
      {page > 0 
        ? <PrevBtn onClick={onClickPrev} /> 
        : <PrevBtn onClick={onClickReturn} />
      }
      {page < valueGuide.length - 1 
        ? <NextBtn onClick={onClickNext} /> 
        : <NextBtn onClick={onClickNavigate} />
      }
    </Container>
  );
};

export default MvpValueGuide;