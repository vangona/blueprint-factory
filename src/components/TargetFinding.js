import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30vh;
    background-color: wheat;
`;

const Dream = styled.h1`
    margin: 15px;
    font-size: 25px;
    font-weight: bold;
`;

const Question = styled.span`
    font-size: 1rem;
    margin-bottom: 20px;
`;

const AnswerContainer = styled.div`
    display: flex;
`;

const AnswerInput = styled.input``;

const AnswerBtn = styled.button``;

const TargetFinding = ({dream}) => {
    const [goalFindingState, setGoalFindingState] = useState(false);

    const clickFindingGoal = (e) => {
        if (e.target.innerHTML === "예") {
            setGoalFindingState(true)
        }
        if (e.target.innerHTML === "아니요") {
            setGoalFindingState(false)
        }
    }

    return (
        <Container>
            <Dream>{dream && `내 꿈은 ${dream}`}</Dream>
            {!goalFindingState && (
                <>
                    <Question>목표를 찾고 있나요?</Question>
                    <AnswerContainer>
                        <AnswerBtn onClick={clickFindingGoal}>예</AnswerBtn>
                        <AnswerBtn onClick={clickFindingGoal}>아니요</AnswerBtn>
                    </AnswerContainer>
                </>
            )}
            {goalFindingState && (
                <>
                    <Question>목표가 있나요?</Question>
                    <AnswerContainer>
                        <AnswerInput type="text" />
                        <AnswerBtn onClick={clickFindingGoal}>예</AnswerBtn>
                        <AnswerBtn onClick={clickFindingGoal}>아니요</AnswerBtn>
                    </AnswerContainer>
                </>
            )}
        </Container>
    )
}

export default TargetFinding;