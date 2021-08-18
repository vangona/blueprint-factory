import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Target from "../components/Target";
import TargetFinding from "../components/TargetFinding";

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const Targets = styled.div``;

const Goal = () => {
    const [dream, setDream] = useState("");
    useEffect(() => {
        if(localStorage.getItem("dream")) {
            setDream(localStorage.getItem("dream"))
        }
    }, [])
    return (
        <Container>
            <TargetFinding dream={dream}>
            </TargetFinding>
            <Targets>
                <Target></Target>
            </Targets>
        </Container>
    )
}

export default Goal;