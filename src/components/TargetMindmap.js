import React from "react";
import styled from "styled-components";
import ReactFlow from "react-flow-renderer";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const TargetMindmap = () => {

    const elements = [
        { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
        // you can also pass a React Node as a label
        { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
        { id: 'e1-2', source: '1', target: '2', animated: true },
      ];

    return (
        <Container> 
            <ReactFlow elements={elements} />;
        </Container>
    )
}

export default TargetMindmap;