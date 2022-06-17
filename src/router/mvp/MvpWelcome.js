import BackgroundTopCloud from 'components/background/BackgroundTopCloud';
import MoveBtn from 'components/common/MoveBtn';
import { authService } from 'fBase';
import React from 'react';
import styled from 'styled-components';
import cloud from "assets/img/background/top-cloud.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 5vh;
`;

const CloudImg = styled.img`
  position: fixed;
  top: 0;
  height: 10%;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  font-family: Ssurround;
  font-size: 30px;
  color: var(--main-blue);
`;

const Explain = styled.h3`
  font-family: SsurroundAir;
  color: var(--main-blue);
  white-space: pre-line;
  text-align: center;
  line-height: 140%;
`;

const MvpVideo = styled.iframe`
  padding: 10px;
  width: 100vw;
  height: 56.25vw;
  max-height: 400px;
  max-width: 800px;
`;

const MvpWelcome = () => {
  const onClick = () => {
    authService.signInAnonymously().then(id => console.log(id));
  }

  return (
    <Container>
      <CloudImg src={cloud} />
      <TitleContainer>
        <Title>
          청사진 제작소
        </Title>
        <Explain>
          꿈부터 오늘 할 일까지 찾을 수 있게 도와주는 {`\n`}
          '온라인 목표관리 플랫폼
        </Explain>
      </TitleContainer>
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