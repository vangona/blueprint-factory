import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DreamFinding from "../components/finding/DreamFinding";
import LongtermFinding from "../components/finding/LongtermFinding";
import ShorttermFinding from "../components/finding/ShorttermFinding";
import PlanFinding from "../components/finding/PlanFinding";
import RoutineFinding from "../components/finding/RoutineFinding";

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const GoalStateBtn = styled.button``;

const Goal = ({userObj}) => {
    const [goalState, setGoalState] = useState("");

    const sendGoalState = (state) => {
        setGoalState(state);
    }

    const onClick = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "dream") {
            setGoalState("dream")
        }
        if (name === "longterm") {
            setGoalState("longterm")
        }
        if (name === "shortterm") {
            setGoalState("shortterm")
        }
        if (name === "plan") {
            setGoalState("plan")
        }
        if (name === "routine") {
            setGoalState("routine")
        }
    }

    useEffect(() => {
    }, [])
    
    return (
        <Container>
            {!goalState &&
            <>
                <GoalStateBtn onClick={onClick} name="dream">꿈</GoalStateBtn>
                <GoalStateBtn onClick={onClick} name="longterm">장기 목표</GoalStateBtn>
                <GoalStateBtn onClick={onClick} name="shortterm">단기 목표</GoalStateBtn>
                <GoalStateBtn onClick={onClick} name="plan">계획</GoalStateBtn>
                <GoalStateBtn onClick={onClick} name="routine">루틴</GoalStateBtn>
            </>
            }
            {goalState === "dream" &&
            <DreamFinding userObj={userObj} sendGoalState={sendGoalState} />}
            {goalState === "longterm" &&
            <LongtermFinding userObj={userObj} sendGoalState={sendGoalState} />}
            {goalState === "shortterm" &&
            <ShorttermFinding userObj={userObj} sendGoalState={sendGoalState} />}
            {goalState === "plan" &&
            <PlanFinding userObj={userObj} sendGoalState={sendGoalState} />}
            {goalState === "routine" &&
            <RoutineFinding userObj={userObj} sendGoalState={sendGoalState} />}
        </Container>
    )
}

export default Goal;