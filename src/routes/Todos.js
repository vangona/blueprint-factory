import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LongtermFinding from "../components/finding/LongtermFinding";
import ShorttermFinding from "../components/finding/ShorttermFinding";
import PlanFinding from "../components/finding/PlanFinding";
import RoutineFinding from "../components/finding/RoutineFinding";
import { useLocation } from "react-router-dom";

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const GoalStateBtn = styled.button`
    width: 150px;
    border: black 1px solid;
    border-radius: 15px;
    padding: 3px;
    color: black;
    background-color: transparent;
    margin: 10px;
    :hover {
        cursor: pointer;
    }
`;

const Todos = ({userObj, targets}) => {
    const location = useLocation();
    const [goalState, setGoalState] = useState("");
    const [parentId, setParentId] = useState("");

    const sendGoalState = (state) => {
        setGoalState(state);
    }

    const onClick = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "target") {
            setGoalState("target");
        }
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

    const goHome = () => {
        setGoalState("");
    }

    useEffect(() => {
        if (location.state) {
            setParentId(location.state.parent);
        }
    }, [])
    
    return (
        <Container>
            {!goalState &&
                <>
                    <GoalStateBtn onClick={onClick} name="longterm">장기 목표 세우기</GoalStateBtn>
                    <GoalStateBtn onClick={onClick} name="shortterm">단기 목표 세우기</GoalStateBtn>
                    <GoalStateBtn onClick={onClick} name="plan">계획 세우기</GoalStateBtn>
                    <GoalStateBtn onClick={onClick} name="routine">루틴 세우기</GoalStateBtn>
                </>
            }
            {goalState === "longterm" &&
            <>
            <LongtermFinding targets={targets} userObj={userObj} sendGoalState={sendGoalState} goHome={goHome} />
            </>
            }      
            {goalState === "shortterm" &&
            <>
            <ShorttermFinding targets={targets} userObj={userObj} goHome={goHome} />
            </>
            }                       
            {goalState === "plan" &&
            <>
            <PlanFinding targets={targets}  userObj={userObj} sendGoalState={sendGoalState} goHome={goHome} />
            </>
            }
            {goalState === "routine" &&
            <>
            <RoutineFinding targets={targets} userObj={userObj} sendGoalState={sendGoalState} goHome={goHome} />
            </>
            }
        </Container>
    )
}

export default Todos;