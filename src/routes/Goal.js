import React from "react";
import styled from "styled-components";
import Target from "../components/Target";
import TargetFinding from "../components/TargetFinding";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const Targets = styled.div``;

const Goal = () => {
    return (
        <Container>
            <TargetFinding></TargetFinding>
            {/* <Targets>
                <Target></Target>
            </Targets> */}
        </Container>
    )
}

export default Goal;