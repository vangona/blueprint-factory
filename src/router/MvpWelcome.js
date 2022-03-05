import MoveBtn from 'components/common/MoveBtn';
import { authService } from 'fBase';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: black;
`;

const MvpVideo = styled.iframe`
  padding: 10px;
  width: 100vw;
  height: 56.25vw;
  max-height: 100vh;
  max-width: 177.78vh;
`;

const MvpWelcome = () => {
  const onClick = () => {
    authService.signInAnonymously().then(id => console.log(id));
  }

  return (
    <Container>
      <Title>
        청사진 제작소
      </Title>
      <MvpVideo 
        src="https://www.youtube.com/embed/tBlGPyAcYPw" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </MvpVideo>
      <MoveBtn value={'Mvp 보러가기'} route={'/mvp'} prevFunc={onClick} />
    </Container>
  );
};

export default MvpWelcome;