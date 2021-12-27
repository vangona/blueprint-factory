import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const GoalDetail = () => {
    const { id } = useParams();

    return (
        <Container>
            {id}
        </Container>
    )
}

export default GoalDetail;