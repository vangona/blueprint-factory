import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LongtermFinding from "../components/finding/LongtermFinding";
import ShorttermFinding from "../components/finding/ShorttermFinding";
import PlanFinding from "../components/finding/PlanFinding";
import RoutineFinding from "../components/finding/RoutineFinding";
import { useLocation } from "react-router-dom";
import { dbService } from "../fBase";

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
    const [parent, setParent] = useState("");

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

    const getParent = (parentId) => {
        dbService.collection(`${userObj.uid}`).doc(`${parentId}`).get().then((snapshot) => {
            const data = snapshot.data();
            setParent(data);
        })
    }

    useEffect(() => {
        if (location.state) {
            getParent(location.state.parent);
            setGoalState(location.state.type);
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
            <LongtermFinding targets={targets} userObj={userObj} sendGoalState={sendGoalState} goHome={goHome} parent={parent} />
            </>
            }      
            {goalState === "shortterm" &&
            <>
            <ShorttermFinding targets={targets} userObj={userObj} goHome={goHome} parent={parent} />
            </>
            }                       
            {goalState === "plan" &&
            <>
            <PlanFinding targets={targets}  userObj={userObj} sendGoalState={sendGoalState} goHome={goHome} parent={parent} />
            </>
            }
            {goalState === "routine" &&
            <>
            <RoutineFinding targets={targets} userObj={userObj} sendGoalState={sendGoalState} goHome={goHome} parent={parent} />
            </>
            }
        </Container>
    )
}

export default Todos;