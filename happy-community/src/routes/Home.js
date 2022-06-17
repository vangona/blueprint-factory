import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TargetMindmap from "../components/home/TargetMindmap";
import TodoList from "../components/home/TodoList";

const Contaier = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin-top: 100px;
    color: black;
    font-family: Kyobo Handwriting;
    font-size: 18px;
    line-height: 120%;
`;

const DisplayBtn = styled.button`
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 9;
`

const Home = ({userObj, targets}) => {
    const [displayState, setDisplayState] = useState(true);

    return (
            <Contaier>
                <DisplayBtn onClick={() => {setDisplayState(!displayState)}}>
                    {displayState ? "마인드맵으로 보기" : "할 일 목록으로 보기"}
                </DisplayBtn>
                {displayState 
                    ? <TodoList userObj={userObj} targets={targets} />
                    : 
                    <TargetMindmap userObj={userObj} targets={targets} />
                }
            </Contaier>
    )
};

export default Home;