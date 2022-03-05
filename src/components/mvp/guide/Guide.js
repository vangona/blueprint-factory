import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

const FindValueBtn = styled.button``;

const Guide = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/value');
  }

  useEffect(() => {
  }, []);

  return (
    <Container>
      먼저 가치관을 찾아봐요.
      <FindValueBtn onClick={onClick} >
        가치관 찾으러가기
      </FindValueBtn>
    </Container>
  );
};

export default Guide;