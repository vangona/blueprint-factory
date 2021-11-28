import React, { useEffect, useState } from "react";
import styled, { withTheme } from "styled-components";
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
  const [models, setModels] = useState([]);
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
      
      function tooltipTextConverter(name) {
        var str = "";
        str += name;
        return str;
      }
      
      var tooltiptemplate =
      $("ToolTip",
        { "Border.fill": "whitesmoke", "Border.stroke": "black" },
        $(go.TextBlock,
          {
            font: "bold 8pt Helvetica, bold Arial, sans-serif",
            wrap: go.TextBlock.WrapFit,
            margin: 5
          },
          new go.Binding("text", "", tooltipTextConverter))
      );

      function typeColorConverter(type) {
        if (type === "longterm") return 'blue';
        if (type === "shortterm") return 'red';
        if (type === "plan") return 'skyblue';
        if (type === "routine") return 'orange';
        return "black";
      }

      myDiagram.nodeTemplate =
        $(go.Node, "Auto",
        { deletable: false, toolTip: tooltiptemplate },
        new go.Binding("text", "name"),
          $(go.Shape, "Rectangle",
          {
            fill: "lightgray",
            stroke: null, strokeWidth: 0,
            stretch: go.GraphObject.Fill,
            alignment: go.Spot.Center
          },
          new go.Binding("fill", "type", typeColorConverter)),
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

      // it's best to declare all templates before assigning the model
      myDiagram.model = new go.TreeModel(
        [
          ...models
        ]);

          return myDiagram;

      };
      
    const getModels = () => {
      const dream = {
        key: 'dream',
        name: `${userObj.dream}한 사람`,
        type: 'dream',
      }
      const data = targets.map((target) => ({
        key: `${target.targetId}`, 
        parent: `${target.parentId 
          ? target.parentId 
          : target.type === 'longterm'
          ? 'dream'
          : 1
        }`,
        type: `${target.type}`,
        name: `${target.display}`
      }));
      setModels([dream, ...data]);
    };

    const handleModelChange = (changes) => {
        console.log('GoJS Model changed!');
    };

    useEffect(() => {
      getModels();
    })

    return (
        <Container> 
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={models}
                onModelChange={handleModelChange} 
            />
        </Container>
    )
}

export default TargetMindmap;