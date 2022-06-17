import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import styled from "styled-components";
import BackgroundBottomCloud from "../components/background/BackgroundBottomCloud";
import { defaultBtnAction, defaultContainer } from "../css/styleConstants";
import { authService, dbService } from "../fBase";

const Container = styled.div`
  ${defaultContainer}
  justify-content: center;
  align-items: center;
  height: 99vh;
  z-index: 11;
  gap: 20px;
  font-family: Ssurround;
`;

const Title = styled.h1`
  text-align: center;
  z-index: 11;
  font-size: 30px;
  font-weight: bold;
  font-family: Ssurround;
  color: var(--main-blue);
`;

const State = styled.div`
  text-align: center;
  z-index: 11;
  font-size: 22px;
  font-weight: bold;
  font-family: Ssurround;
  margin-bottom: 30px;
`;

const AuthForm = styled.form`
  z-index: 11;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  max-width: 70%;
`;

const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 11;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 80%;
`;

const AuthLabel = styled.label`
  font-size: 14px;
  z-index: 11;
`;

const AuthInput = styled.input`
  font-family: SsurroundAir;
  z-index: 11;
  width: auto;
`;

const AuthSubmit = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-family: SsurroundAir;
  padding: 5px 20px;
  z-index: 11;
  color: white;
  background-color: var(--main-blue);
  border-radius: 10px;
  ${defaultBtnAction};
`;

const AuthBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-family: SsurroundAir;
  padding: 5px 20px;
  z-index: 11;
  background-color: white;
  border-radius: 10px;
  ${defaultBtnAction};
`;

const Error = styled.div`
  word-break: keep-all;
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;

function Auth() {
  const [loginState, setLoginState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const name = e.target.getAttribute("name");
    if (name === "email") {
      setEmail(e.target.value);
    } else if (name === "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!loginState) {
      await authService
        .createUserWithEmailAndPassword(email, password)
        .then(async (user) => {
          await dbService
            .collection("users")
            .doc(`${user.uid}`)
            .set({
              uid: user.uid,
              displayName: "익명",
              photoURL: "",
              friends: [],
              targets: [],
            })
            .then(() => {
              alert("환영합니다.");
            });
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      await authService
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const onClickAnonymously = () => {
    authService
      .signInAnonymously()
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onClick = (e) => {
    e.preventDefault();
    setLoginState(!loginState);
  };

  return (
    <Container>
      <BackgroundBottomCloud />
      <Title>청사진 제작소</Title>
      <State>{loginState ? "로그인 하기" : "회원가입 하기"}</State>
      <AuthForm onSubmit={onSubmit}>
        <AuthBox>
          <AuthLabel>ID</AuthLabel>
          <AuthInput
            name="email"
            onChange={onChange}
            value={email}
            type="email"
          />
        </AuthBox>
        <AuthBox style={{ marginBottom: "20px" }}>
          <AuthLabel>Password</AuthLabel>
          <AuthInput
            name="password"
            onChange={onChange}
            value={password}
            type="password"
          />
        </AuthBox>
        {error && <Error>{error}</Error>}
        <AuthSubmit type="submit" value={loginState ? "로그인" : "회원가입"} />
        <AuthBtn onClick={onClick}>
          <FaExchangeAlt />
          {!loginState ? "로그인하기" : "회원가입하기"}
        </AuthBtn>
      </AuthForm>
      <AuthBtn onClick={onClickAnonymously}>일단 둘러볼게요!</AuthBtn>
    </Container>
  );
}

export default Auth;
