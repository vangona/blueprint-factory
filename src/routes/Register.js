import React, { useEffect, useState } from "react";
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
    z-index: 9;
`;

const QuestionContainer = styled(animated.div)`
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
    z-index: 9;
`;

const Title = styled.h1`
    display: flex;
    color: white;
    margin-bottom: 30px;
    font-size: 20px;
    justify-content: center;
    transition: 1s all ease-in-out;
`;

const AnswerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const AnswerInput = styled.input`
    box-sizing: border-box;
    height: 25px;
`;
const AnswerBtn = styled.button`
    height: 25px;
`;

const LoginContainer = styled(animated.div)`
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
    z-index: 9;
`;
const LoginInput = styled.input`
    margin-left: 10px;
`;
const LoginBtn = styled.button`
    width: 100%;
    :hover {
        cursor: pointer;
    }
`;

const IDContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const LoginStateChange = styled.div`
    :hover {
        cursor: pointer;
    }
    margin: 10px;
    font-size: 15px;
`;

const Register = () => {
    const [btnState, setBtnState] = useState(true);
    const [flip, set] = useState(true);
    const [loginState, setLoginState] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dream, setDream] = useState("");
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {target : {name, value}} = e;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        } else if (name === "dream") {
            setDream(value)
        }
    }

    const onLoginState = () => {
        setLoginState(!loginState)
    }

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
    const clickBtn = async (e) => {
        let data;
        e.preventDefault();
        if (e.target.innerText === "회원가입")
        try {
            data = await authService.createUserWithEmailAndPassword(
                email, 
                password
            )
            set(!flip)
        } catch (error) {
            if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                setError("입력하신 아이디가 없습니다.")
            } else {
                setError(error.message)
            }
        } else if (e.target.innerText === "로그인") {
            try {
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                )
            } catch (error) {
                setError(error.message)
            }
        }
    }
    const onLogin = () => {
        if (dream) {
            localStorage.setItem("dream", dream)
            setDream("")
        }
        set(!flip)
        setBtnState(!btnState)
    }

    useEffect(() => {
        if (localStorage.getItem("dream")) {
            set(!flip)
            setBtnState(!btnState)
        }
    }, [])

    return (
        <Container>
            {btnState ? (       
            <QuestionContainer style={question}>        
                <Title style={{fontSize: "15px"}}>
                어떤 사람이 되고 싶었나요?
                </Title>
                <AnswerContainer>
                    <AnswerInput name="dream" onChange={onChange} type="text" value={dream}/>
                    <AnswerBtn onClick={onLogin}>회원가입</AnswerBtn>
                </AnswerContainer>
            </QuestionContainer>
            ) : (
            <LoginContainer style={id}>
                <Title>
                    {loginState ? "로그인" : "회원가입"}
                </Title>
                <IDContainer>
                E-MAIL : <LoginInput name="email" value={email} onChange={onChange} />
                </IDContainer>
                <IDContainer>
                PASSWORD : <LoginInput name="password" value={password} onChange={onChange} type="password" />
                </IDContainer>
                <LoginBtn onClick={clickBtn}>       {loginState ? "로그인" : "회원가입"}</LoginBtn>
                <LoginStateChange onClick={onLoginState}>                    {!loginState ? "로그인" : "회원가입"}</LoginStateChange>
                <span className="error">{error}</span>
            </LoginContainer>
            )}
        </Container>
    )
}

export default Register;