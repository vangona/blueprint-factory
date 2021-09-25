import React from "react";
import styled from "styled-components";
import TodoList from "./TodoList";

const Container = styled.div`
    justify-content: center;
    align-items: center;
`;

const TargetComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TargetName = styled.h1`
    font-size: 18px;
    margin-bottom: 10px;
`;

const Target = () => {
    return (
        <Container>
            <TargetComponent>
                {/* <TargetName>붕어빵틀 사기</TargetName>
                <TodoList /> */}
            </TargetComponent>
        </Container>
    )
}

export default Target;