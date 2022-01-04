import React, { useState } from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../css/styleConstants';
import { authService } from '../fBase';

const Container = styled.div`
    ${ defaultContainer }
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 22px;
    font-weight: bold;
`;

const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const AuthBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

const AuthLabel = styled.label``;

const AuthInput = styled.input``;

const AuthBtn = styled.button``;

const Auth = () => {
    const [loginState, setLoginState] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            .then(console.log('success'))
            .catch(error => {
                console.log(error.message)
            });
        } else {
            await authService.signInWithEmailAndPassword(email, password)
            .then(console.log('success'))
            .catch(error => {
                console.log(error.messsage);
            })
        }
    }

    const onClick = (e) => {
        e.preventDefault();
        setLoginState(!loginState);
    }

    return (
    <Container>
        <Title>
            회원가입
        </Title>
        <AuthForm onSubmit={onSubmit}>
            <AuthBox>
                <AuthLabel>
                    ID : 
                </AuthLabel>
                <AuthInput name="email" onChange={onChange} value={email} type="email" />
            </AuthBox>
            <AuthBox>
                <AuthLabel>
                    Password :
                </AuthLabel>
                <AuthInput name="password" onChange={onChange} value={password} type="password" />
            </AuthBox>
            <AuthInput type="submit" value={loginState ? "로그인" : "회원가입"} />
            <AuthBtn onClick={onClick}>{!loginState ? "로그인하기" : "회원가입하기"}</AuthBtn>
        </AuthForm>
    </Container>
    );
}

export default Auth;
