import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';

const Container = styled.div`
    ${defaultContainer};
`;

const TodoContainer = styled.div`
    margin-top: 30px;
    background-color: #6F9AE9;
    padding: 20px;
    max-height: 50%;
    overflow: scroll;
    width: 80%;
    border-radius: 30px;
    box-sizing: border-box;
    ::-webkit-scrollbar {
        display: none;
        width: 10px;
    }
`;

const TodoTitle = styled.h1`
    color: white;
    font-family: SsurroundAir;
    margin-bottom: 20px;
`;

const TodoBox = styled.div`
    display: flex;
    margin-bottom: 5px;
`;

const Todo = styled.div`
    color: white;
    font-family: SsurroundAir;
`;

const TodoCheckBox = styled.input``;

const SettingLowerComponent = ({userObj}) => {
    return (
        <Container>
            <TodoContainer>
                <TodoTitle>
                    목표 목록
                </TodoTitle>
                {userObj.targets.map((target, index) => (
                    <TodoBox key={index}>
                        <TodoCheckBox type="checkbox" />
                        <Todo>{target.name}</Todo>
                    </TodoBox>
                ))}
            </TodoContainer>
        </Container>
    );
};

export default SettingLowerComponent;