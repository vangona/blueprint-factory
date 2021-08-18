import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { authService } from "../fBase";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: black;
    z-index: 999;
`;

const Title = styled.h1`
    display: flex;
    color: white;
    margin-bottom: 30px;
    font-size: 20px;
    justify-content: center;
`;

const LoginContainer = styled(animated.div)`
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
`;
const LoginInput = styled.input`
    margin-left: 10px;
`;
const LoginBtn = styled.button`
    width: 100%;
`;

const IDContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Login = () => {
    const [flip, set] = useState(true);
    const id = useSpring({
        to: { opacity: 0 }, 
        from: { opacity: 1 },    
        reverse: flip,
        config: config.default
    })
    const history = useHistory();
    const clickBtn = () => {
        set(!flip)
        setTimeout(() => {history.push("/")}, 200)
    }
    return (
        <Container>
            <LoginContainer style={id}>
                <Title>
                    LOG IN
                </Title>
                <IDContainer>
                E-MAIL : <LoginInput />
                </IDContainer>
                <IDContainer>
                PASSWORD : <LoginInput />
                </IDContainer>
                <LoginBtn onClick={clickBtn}>Log in</LoginBtn>
            </LoginContainer>
        </Container>
    )
}

export default Login;