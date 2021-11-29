import React, { useEffect, useState } from "react";
import styled, { withTheme } from "styled-components";
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import Loading from "./Loading";

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
  const [isLoading, setIsLoading] = useState(true);

    const initDiagram = () => {
      var $ = go.GraphObject.make;

      var myDiagram =
        $(go.Diagram,
          {
            "undoManager.isEnabled": true,
            layout: $(go.TreeLayout,
                      { angle: 90, layerSpacing: 35 })
          });
      
      function tooltipTextConverter(target) {
        var str = "";
        str += JSON.stringify(target.name);
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

      const actionTemplate = 
        $(go.Panel, "Horizontal",
          $(go.TextBlock,
            { font: "10pt Verdana, sans-serif" },
            new go.Binding("text")
          )
        )

      myDiagram.nodeTemplate =
        $(go.Node, "Vertical",
        new go.Binding("isTreeExpanded").makeTwoWay(),
        new go.Binding("wasTreeExpanded").makeTwoWay(),
        { deletable: false, toolTip: tooltiptemplate, selectionObjectName: "BODY" },
        new go.Binding("text", "name"),

        $(go.Panel, "Auto",
          { name: "BODY" },
          $(go.Shape, "Rectangle",
            new go.Binding("fill", "type", typeColorConverter)
          ),
          $(go.Panel, "Vertical",
            { margin: 10 },
            $(go.TextBlock,
                {
                  stretch: go.GraphObject.Horizontal,
                  font: "bold 12pt Kyobo Handwriting",
                  stroke: "white"
                },
                new go.Binding("text", "name")
            ),
            $(go.Panel, "Vertical",
                { stretch: go.GraphObject.Horizontal, visible: false },
                new go.Binding("visible", "actions", function(acts) {
                  return (Array.isArray(acts) && acts.length > 0);
                }),
                $(go.Panel, "Table",
                  { stretch: go.GraphObject.Horizontal },
                  $(go.TextBlock, 
                    {
                      alignment: go.Spot.Left,
                      font: "10pt Handwriting, sans-serif"
                    }
                  ),
                  $("PanelExpanderButton", "COLLAPSIBLE",
                    { column: 1, alignment: go.Spot.Right }
                  )
                ),
                $(go.Panel, "Vertical",
                    {
                      name: "COLLAPSIBLE",
                      padding: 8,
                      stretch: go.GraphObject.Horizontal,
                      background: "white",
                      defaultAlignment: go.Spot.Left,
                      itemTemplate: actionTemplate
                    },
                    new go.Binding("itemArray", "actions")
                  )
                )
              )
            ),
            $(go.Panel,
              { height: 17 },
              $("TreeExpanderButton")  
            )
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
          : target.type === 'shortterm'
          ? 'dream'
          : 1
        }`,
        type: `${target.type}`,
        name: `${target.display}`,
        actions: target.needArr && target.needArr.map(need => (
          {text: need}
          )
        )
      }));
      setModels([dream, ...data]);
      setIsLoading(false);
    };

    const getTargets = () => {
      setLongterms(targets.filter(target => target.state === "ongoing" && target.type === "longterm"))
      setShortterms(targets.filter(target => target.state === "ongoing" && target.type === "shortterm"))
      setPlans(targets.filter(target => target.state === "ongoing" && target.type === "plan"))
      setRoutines(targets.filter(target => target.state === "ongoing" && target.type === "routine"))
      getModels();
    }

    useEffect(() => {
      getTargets();
    }, [])

    const handleModelChange = (changes) => {
        console.log('GoJS Model changed!');
    };

    return (
        <Container> 
            {isLoading
            ? <Loading />
            : <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={models}
                onModelChange={handleModelChange} 
            />}
        </Container>
    )
}

export default TargetMindmap;