import React from "react";
import styled from "styled-components";
import TodoList from "./TodoList";

const Container = styled.div`
    background-color: wheat;
    height: 70vh;
    width: 100vw;
`;

const TargetComponent = styled.div``;

const TargetName = styled.h1`
    font-size: 18px;
    margin-bottom: 10px;
`;

const Target = () => {
    return (
        <Container>
            <TargetComponent>
                <TargetName>붕어빵틀 사기</TargetName>
                <TodoList />
            </TargetComponent>
        </Container>
    )
}

export default Target;