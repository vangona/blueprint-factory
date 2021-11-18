import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TargetMindmap = ({userObj, targets}) => {

  const [longterms, setLongterms] = useState('');
  const [shortterms, setShortterms] = useState('');
  const [plans, setPlans] = useState('');
  const [routines, setRoutines] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const getTargets = async () => {
      setLongterms(targets.filter(target => target.state === "ongoing" && target.type === "longterm"))
      setShortterms(targets.filter(target => target.state === "ongoing" && target.type === "shortterm"))
      setPlans(targets.filter(target => target.state === "ongoing" && target.type === "plan"))
      setRoutines(targets.filter(target => target.state === "ongoing" && target.type === "routine"))
      setIsLoading(false);
  }

  useEffect(() => {
    getTargets();
  }, [])

    const initDiagram = () => {
      var $ = go.GraphObject.make;

      var myDiagram =
        $(go.Diagram,
          {
            "undoManager.isEnabled": true,
            layout: $(go.TreeLayout,
                      { angle: 90, layerSpacing: 35 })
          });
      
      myDiagram.nodeTemplate =
        $(go.Node, "Horizontal",
          { background: "#44CCFF" },
          $(go.Picture,
            { margin: 10, width: 50, height: 50, background: "red" },
            new go.Binding("source")),
          $(go.TextBlock, "Default Text",
            { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
            new go.Binding("text", "name"))
        );
      
      // define a Link template that routes orthogonally, with no arrowhead
      myDiagram.linkTemplate =
        $(go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, // the link's path shape
            { strokeWidth: 3, stroke: "#555" })
        );
      
      const models = targets.map(target => ({
        key: `${target.targetId}`, parent: "3", name: `${target.targetId}`, source: "cat1.png"
      }))

      console.log(1)

      // it's best to declare all templates before assigning the model
      myDiagram.model = new go.TreeModel(
        [
          ...models,
          { key: "1",              name: "Don Meow",   source: "cat1.png" },
          { key: "2", parent: "1", name: "Demeter",    source: "cat2.png" },
          { key: "3", parent: "1", name: "Copricat",   source: "cat3.png" },
          { key: "4", parent: "3", name: "Jellylorum", source: "cat4.png" },
          { key: "5", parent: "3", name: "Alonzo",     source: "cat5.png" },
          { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" }
        ]);

          return myDiagram;

      };


    const handleModelChange = (changes) => {
        console.log('GoJS Model changed!');
    };

    return (
        <Container> 
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={        [
                  { key: "1",              name: "Don Meow",   source: "cat1.png" },
                  { key: "2", parent: "1", name: "Demeter",    source: "cat2.png" },
                  { key: "3", parent: "1", name: "Copricat",   source: "cat3.png" },
                  { key: "4", parent: "3", name: "Jellylorum", source: "cat4.png" },
                  { key: "5", parent: "3", name: "Alonzo",     source: "cat5.png" },
                  { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" }
                  ]}
                onModelChange={handleModelChange} 
            />
        </Container>
    )
}

export default TargetMindmap;