import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Target from "../components/Target";
import TargetFinding from "../components/TargetFinding";

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Targets = styled.div`
    display:flex;
    justify-content: center;
    width: 100%;
    align-items: center;;
`;

const Goal = ({userObj}) => {
    const [dream, setDream] = useState("");
    useEffect(() => {
        if(localStorage.getItem("dream")) {
            setDream(localStorage.getItem("dream"))
        }
    }, [])
    return (
        <Container>
            <TargetFinding userObj={userObj}>
            </TargetFinding>
            <Targets>
                <Target></Target>
            </Targets>
        </Container>
    )
}

export default Goal;