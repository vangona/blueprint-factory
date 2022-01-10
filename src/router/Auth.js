import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import styled from 'styled-components';
import BackgroundBottomCloud from '../components/background/BackgroundBottomCloud';
import { defaultBtnAction, defaultContainer } from '../css/styleConstants';
import { authService } from '../fBase';

const Container = styled.div`
    ${ defaultContainer }
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
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const AuthLabel = styled.label`
    z-index: 11;
`;

const AuthInput = styled.input`
    font-family: SsurroundAir;
    z-index: 11;
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
    ${defaultBtnAction};
`;

const Error = styled.div`
    word-break: keep-all;
    color: red;
    text-align: center;
    margin-bottom: 10px;
`;

const Auth = () => {
    const [loginState, setLoginState] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onChange = (e) => {
        const name = e.target.getAttribute('name');
        if (name === "email") {
            setEmail(e.target.value);
        } else if (name === "password") {
            setPassword(e.target.value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!loginState) {
            await authService.createUserWithEmailAndPassword(
                email,
                password
            )
            .then(() => {alert('환영합니다.')})
            .catch(error => {
                setError(error.message);
            });
        } else {
            await authService.signInWithEmailAndPassword(email, password)
            .then(() => {alert('어서오세요.')})
            .catch(error => {
                setError(error.message);
            })
        }
    }

    const onClick = (e) => {
        e.preventDefault();
        setLoginState(!loginState);
    }

    return (
    <Container>
        <BackgroundBottomCloud />
        <Title>
            뜬구름
        </Title>
        <State>
            {loginState ? "로그인 하기" : "회원가입 하기"}
        </State>
        <AuthForm onSubmit={onSubmit}>
            <AuthBox>
                <AuthLabel>
                    ID : 
                </AuthLabel>
                <AuthInput name="email" onChange={onChange} value={email} type="email" />
            </AuthBox>
            <AuthBox style={{marginBottom: "20px"}}>
                <AuthLabel>
                    Password :
                </AuthLabel>
                <AuthInput name="password" onChange={onChange} value={password} type="password" />
            </AuthBox>
            {error && <Error>{error}</Error>}
            <AuthSubmit type="submit" value={loginState ? "로그인" : "회원가입"} />
            <AuthBtn onClick={onClick}>
                <FaExchangeAlt /> 
                {!loginState ? "로그인하기" : "회원가입하기"}
            </AuthBtn>
        </AuthForm>
    </Container>
    );
}

export default Auth;
