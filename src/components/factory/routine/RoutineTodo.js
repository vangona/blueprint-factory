import React from "react";
import styled from "styled-components";
import { blockBtn, defaultContainer } from "css/styleConstants";

const Container = styled.div`
  ${defaultContainer};
  position: absolute;
  top: 0;
  justify-content: center;
  height: 100vh;
  z-index: 50;
  gap: 15px;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 28px;
  font-family: Ssurround;
  text-align: center;
  line-height: 55px;
`;

const CloudBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TargetName = styled.div`
  color: black;
  font-family: Ssurround;
`;

const Explain = styled.div`
  font-family: SsurroundAir;
  font-size: 15px;
  color: var(--main-blue);
  line-height: 25px;
  text-align: center;
`;

const Noitce = styled.div`
  font-family: SsurroundAir;
`;

const Input = styled.input`
  font-family: SsurroundAir;
  background-color: #eeeeee;
  border-radius: 30px;
  width: 80%;
  height: 45px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  ::placeholder {
    text-align: center;
  }
`;

const BlockBtn = styled.div`
  ${blockBtn};
`;

function RoutineTodo({ getNeed, need, parent }) {
  const onChange = (e) => {
    getNeed(e.target.value);
  };

  return (
    <>
      <Container>
        <Title>
          {parent.name}을(를) 위해 <br />
          반복해야하는 것이 있나요?
        </Title>
        <Explain>
          만약 쓰기 어렵다면, 청사진으로 돌아가서 <br />
          하위 목표를 더 여러 개로 쪼개야해요!
        </Explain>
        <Input
          name="need"
          value={need}
          type="text"
          onChange={onChange}
          placeholder="목표 행동"
        />
        <Noitce>{need && "다 썼다면 다음으로 넘어가봅시다."}</Noitce>
      </Container>
      {!need && <BlockBtn />}
    </>
  );
}

export default RoutineTodo;
