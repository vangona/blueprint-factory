import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

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

const QuestionContainer = styled(animated.div)`
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    display: flex;
    color: white;
    margin-bottom: 30px;
    font-size: 20px;
    justify-content: center;
`;

const AnswerContainer = styled.div``;
const AnswerInput = styled.input``;
const AnswerBtn = styled.button``;

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

const Register = () => {
    const [btnState, setBtnState] = useState(true);
    const [flip, set] = useState(true);
    const question = useSpring({
        to: { opacity: 0 }, 
        from: { opacity: 1 },    
        reverse: flip,
        config: config.default
    })
    const id = useSpring({
        to: { opacity: 0 }, 
        from: { opacity: 1 },    
        reverse: !flip,
        config: config.default
    })
    const history = useHistory();
    const clickBtn = () => {
        set(!flip)
        setTimeout(() => {history.push("/")}, 200)
    }
    const onLogin = () => {
        set(!flip)
        setBtnState(!btnState)
    }
    return (
        <Container>
            {btnState ? (       
            <QuestionContainer style={question}>        
                <Title style={{fontSize: "15px"}}>
                어떤 사람이 되고 싶었나요?
                </Title>
                <AnswerContainer>
                    <AnswerInput type="text" />
                    <AnswerBtn onClick={onLogin}>Create ID</AnswerBtn>
                </AnswerContainer>
            </QuestionContainer>
            ) : (
            <LoginContainer style={id}>
                <Title>
                    CREATE ID
                </Title>
                <IDContainer>
                E-MAIL : <LoginInput />
                </IDContainer>
                <IDContainer>
                PASSWORD : <LoginInput />
                </IDContainer>
                <LoginBtn onClick={clickBtn}>Create ID</LoginBtn>
            </LoginContainer>
            )}
        </Container>
    )
}

export default Register;