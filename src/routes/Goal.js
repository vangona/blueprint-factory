import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TargetMindmap from "../components/TargetMindmap";

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 100px;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 500px;
    box-sizing: border-box;
`;

const Goal = ({userObj, targets}) => {

    useEffect(() => {
    }, [])
    
    return (
        <Container>
            <TargetMindmap userObj={userObj} targets={targets} />
        </Container>
    )
}

export default Goal;