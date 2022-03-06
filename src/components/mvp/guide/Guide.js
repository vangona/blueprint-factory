import NextBtn from 'components/btn/NextBtn';
import PrevBtn from 'components/btn/PrevBtn';
import { defaultBtnAction, defaultContainer } from 'css/styleConstants';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GuideDB from './GuideDB';

const Container = styled.div`
  ${defaultContainer};
  justify-content: center;
`;

const GuideImg = styled.img`
  width: 80vw;
  height: 80vw;
`;

const Comment = styled.div`
  text-align: center;
  white-space: pre-line;
  line-height: 160%;
  font-family: SsurroundAir;
`;

const FindValueBtn = styled.button`
  margin-top: 50px;
  font-family: Ssurround;
  padding: 10px 20px;
  background-color: white;
  color: var(--main-blue);
  border-radius: 20px;
  bottom: 10vh;
  ${defaultBtnAction};
`;

const Guide = () => {
  const [GuideImgSrc, setGuideImgSrc] = useState('');
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const onClickValue = () => {
    navigate('/value');
  }

  const onClickNext = () => {
    setPage(page + 1);
  }

  const onClickPrev = () => {
    setPage(page - 1);
  }
  
  useEffect(() => {
    setPage(0);
    setGuideImgSrc(GuideDB[0].imgSrc);
  }, []);

  return (
    <Container>
      <GuideImg src={GuideImgSrc} alt='' />
      <Comment>
        {GuideDB[page].comment}
      </Comment>
      {page !== 0 && <PrevBtn onClick={onClickPrev} />}
      {page < GuideDB.length - 1 && <NextBtn onClick={onClickNext} />}
      {page === GuideDB.length - 1 && <FindValueBtn onClick={onClickValue} >
        잊었던 목표 찾으러가기
      </FindValueBtn>}
    </Container>
  );
};

export default Guide;