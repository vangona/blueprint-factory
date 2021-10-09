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
    margin-top: 50px;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const GoalStateBtn = styled.button`
    width: 150px;
    border: white 1px solid;
    border-radius: 15px;
    padding: 3px;
    color: white;
    background-color: transparent;
    margin: 10px;
    :hover {
        cursor: pointer;
    }
`;

const PrevBtn = styled.button``;

const Goal = ({userObj, targets}) => {
    const [goalState, setGoalState] = useState("");

    const sendGoalState = (state) => {
        setGoalState(state);
    }

    const onClick = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "prev") {
            setGoalState("");
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

    useEffect(() => {
    }, [])
    
    return (
        <Container>
            {!goalState &&
            <>
                <GoalStateBtn onClick={onClick} name="dream">꿈 찾기</GoalStateBtn>
                <GoalStateBtn onClick={onClick} name="longterm">장기 목표 설정</GoalStateBtn>
                <GoalStateBtn onClick={onClick} name="shortterm">단기 목표 설정</GoalStateBtn>
                <GoalStateBtn onClick={onClick} name="plan">계획 세우기</GoalStateBtn>
                <GoalStateBtn onClick={onClick} name="routine">루틴 세우기</GoalStateBtn>
            </>
            }
            {goalState === "dream" &&
            <>
            <DreamFinding userObj={userObj} sendGoalState={sendGoalState} />
            <PrevBtn name="prev" onClick={onClick}>홈으로</PrevBtn>
            </>
            }
            {goalState === "longterm" &&
            <>
            <LongtermFinding userObj={userObj} sendGoalState={sendGoalState} />
            <PrevBtn name="prev" onClick={onClick}>홈으로</PrevBtn>
            </>
            }
            {goalState === "shortterm" &&
            <>
            <ShorttermFinding userObj={userObj} sendGoalState={sendGoalState} />
            <PrevBtn name="prev" onClick={onClick}>홈으로</PrevBtn>
            </>
            }
            {goalState === "plan" &&
            <>
            <PlanFinding targets={targets}  userObj={userObj} sendGoalState={sendGoalState} />
            <PrevBtn name="prev" onClick={onClick}>홈으로</PrevBtn>
            </>
            }
            {goalState === "routine" &&
            <>
            <RoutineFinding userObj={userObj} sendGoalState={sendGoalState} />
            <PrevBtn name="prev" onClick={onClick}>홈으로</PrevBtn>
            </>
            }
        </Container>
    )
}

export default Goal;