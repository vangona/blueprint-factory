import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import { dbService } from '../../fBase';

const Container = styled.div`
    ${defaultContainer};
`;

const TodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
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
    gap: 10px;
    margin-bottom: 5px;
`;

const Todo = styled.label`
    color: white;
    font-family: SsurroundAir;
    ${defaultBtnAction};
`;

const TodoCheckBox = styled.input`
    ${defaultBtnAction};
`;

const HomeLowerComponent = ({userObj, todayTargets, todaySteps}) => {

    const onClickCheckBox = (e, target) => {
        const name = e.target.getAttribute('name');
        if (name === 'step') {
            dbService.collection('steps').doc(`${target.id}`).update({
                isComplished: !target.isComplished,
            })
        }
        if (name === 'target') {
            dbService.collection('targets').doc(`${target.id}`).update({
                isComplished: !target.isComplished,
            })
        }
    }

    return (
        <Container>
            <TodoContainer>
                <TodoTitle>
                    오늘 마감인 목표
                </TodoTitle>
                {todayTargets.length || todaySteps.length
                ? 
                <>
                    {todayTargets.map((target, index) => (
                        <TodoBox key={index}>
                            <TodoCheckBox id={target.id} type="checkbox" name="target" checked={target.isComplished} readOnly onClick={(e) => {
                                e.preventDefault();
                                if (target.isComplished) {
                                    window.confirm("앗 실수로 누르셨었나요?") &&
                                    onClickCheckBox(e, target);    
                                } else {
                                    window.confirm("목표를 달성 하셨나요?") &&
                                    onClickCheckBox(e, target);    
                                }
                            }} />
                            <Todo style={{color: target.isComplished ? "yellow" : null, textDecorationLine: target.isComplished ? 'line-through' : null}} 
                                htmlFor={target.id}>{target.name}</Todo>
                        </TodoBox>
                    ))}
                    {todaySteps.map((target, index) => (
                        <TodoBox key={index}>
                            <TodoCheckBox id={target.id} type="checkbox" name="step" checked={target.isComplished} readOnly onClick={(e) => {
                                e.preventDefault();
                                if (target.isComplished) {
                                    window.confirm("앗 실수로 누르셨었나요?") &&
                                    onClickCheckBox(e, target);    
                                } else {
                                    window.confirm("목표를 달성 하셨나요?") &&
                                    onClickCheckBox(e, target);    
                                }
                            }} />
                            <Todo style={{color: target.isComplished ? "yellow" : null, textDecorationLine: target.isComplished ? 'line-through' : null}}  
                                htmlFor={target.id}>{target.name} - {target.explain}</Todo>
                        </TodoBox>
                    ))}
                </>
                : <Todo>
                    오늘 마감인 목표가 없습니다.
                </Todo>
                }
            </TodoContainer>
        </Container>
    );
};

export default HomeLowerComponent;