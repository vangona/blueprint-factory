import React, { useEffect, useState } from 'react';
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
    font-family: Ssurround;
    margin-bottom: 20px;
    font-size: 20px;
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

const HomeLowerComponent = ({userObj}) => {
    const [todayTargets, setTodayTargets] = useState('');

    const getTodayTarget = () => {
        const today = new Date(Date.now());
        const filtered = userObj.targets.filter(el => {
            const Time = new Date(el.deadline.seconds * 1000);
            const YearTime = Time.getFullYear();
            const MonthTime = Time.getMonth() + 1;
            const DateTime = Time.getDate();
            return Boolean(DateTime === today.getDate() && MonthTime === today.getMonth() + 1 && YearTime === today.getFullYear());
        })
        setTodayTargets(filtered);
    }

    useEffect(() => {
        getTodayTarget();
    }, []);

    return (
        <Container>
            <TodoContainer>
                <TodoTitle>
                    오늘 마감인 목표
                </TodoTitle>
                {todayTargets.length 
                ? todayTargets.map((target, index) => (
                    <TodoBox key={index}>
                        <TodoCheckBox type="checkbox" />
                        <Todo>{target.name}</Todo>
                    </TodoBox>
                ))
                : <Todo>
                    오늘 마감인 목표가 없습니다.
                </Todo>
                }
            </TodoContainer>
        </Container>
    );
};

export default HomeLowerComponent;