import React from "react";
import styled from "styled-components";

const Todo = styled.li`
    font-size: 15px;
    list-style: none;
`;

const TodoCheck = styled.input``;

const TodoList = () => {
    return (
    <>
        <Todo>
            <TodoCheck type="checkbox" />
            돈 모으기
        </Todo>
        <Todo>
        <TodoCheck type="checkbox" />
            붕어빵틀 구매하기
        </Todo>
    </>
)
}

export default TodoList;