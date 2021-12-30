import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { useNavigate } from "react-router-dom";
import { defaultContainer } from "../css/styleConstants";

const Container = styled.div`
  ${defaultContainer}
`;

const TargetMindmap = ({userObj}) => {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
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
        $("CheckBox", "Horizontal",
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
          $(go.Shape, "RoundedRectangle",
            new go.Binding("fill", "type", typeColorConverter)
          ),
          $(go.Panel, "Vertical",
            { margin: 10 },
            $("Button", 
              {
                "ButtonBorder.fill" : null,
                "ButtonBorder.stroke" : null,
              },
              $(go.TextBlock,
                  {
                    stretch: go.GraphObject.Horizontal,
                    font: "bold 12pt Kyobo Handwriting",
                    stroke: "white",
                  },
                  new go.Binding("text", "name")
              ),
              { click: (e, obj) => {navigate(`/blueprint/${obj.part.data.key}`)}, }
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
                      itemTemplate: actionTemplate,
                    },
                    new go.Binding("itemArray", "actions")
                  )
                )
              )
            ),
            $(go.Panel,
              { height: 17 },
              $("TreeExpanderButton")  
            ),
          );

      myDiagram.nodeTemplate.contextMenu = 
        $("ContextMenu",
              $("ContextMenuButton",
                $(go.TextBlock, "하위 목표 만들기"),
                {
                  click: function(e, obj) {
                    const node = obj.part.adornedPart;
                    if (node !== null) {
                      navigate({
                        pathname: `/blueprint/maker/${node.data.key}`,
                        state: {parent: node.data.key}
                      })
                    }
                  }
                }
              ),
              $("ContextMenuButton",
                $(go.TextBlock, "목표 수정하기"),
                {
                  click: function(e, obj) {
                    const node = obj.part.adornedPart;
                    if (node !== null) {
                      navigate({
                        pathname: `/blueprint/${node.data.type}/${node.data.key}`,
                        state: {parent: node.data.key, type: "shortterm"}
                      })
                    }
                  }
                }
              ),
              $("ContextMenuButton",
                $(go.TextBlock, "계획 세우기"),
                {
                  click: function(e, obj) {
                    const node = obj.part.adornedPart;
                    if (node !== null) {
                      navigate({
                        pathname: "/blueprint/maker",
                        state: {parent: node.data.key, type: "plan"}
                      })
                    }
                  }
                }
              ),
              $("ContextMenuButton",
                $(go.TextBlock, "루틴 만들기"),
                {
                  click: function(e, obj) {
                    const node = obj.part.adornedPart;
                    if (node !== null) {
                      navigate({
                        pathname: "/blueprint/maker",
                        state: {parent: node.data.key, type: "routine"}
                      })
                    }
                  }
                }
              )
        )
      
      // define a Link template that routes orthogonally, with no arrowhead
      myDiagram.linkTemplate =
        $(go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, // the link's path shape
            { strokeWidth: 3, stroke: "#555" })
        );

      // it's best to declare all templates before assigning the model
      myDiagram.model = new go.TreeModel(models);
          return myDiagram;
      };
      
    const getModels = () => {
      const dream = {
        key: 'dream',
        name: `행복한 사람`,
        type: 'dream',
      };

    //   const dataArr = targets.map((target) => ({
    //     key: `${target.targetId}`, 
    //     parent: `${target.parentId
    //       ? target.parentId 
    //       : target.type === 'longterm'
    //       ? 'dream'
    //       : target.type === 'shortterm'
    //       ? 'dream'
    //       : 1
    //     }`,
    //     type: `${target.type}`,
    //     name: `${target.display}`,
    //     actions: Array.isArray(target.displayContent) ? target.displayContent.map((need, index) => (
    //       {text: `${need}`}
    //       )
    //     )
    //     : target.displayContent && [{text: target.displayContent}]
    //   }));

      const data = {
        key: 1,
        parent: "dream",
        type: "longterm",
        name: "돈",
        actions: "100만원"
      }

      setModels([dream, data]);
      setIsLoading(false);
    };

    useEffect(() => {
      getModels();
    }, [])

    const handleModelChange = (changes) => {
        console.log('GoJS Model changed!');
    };

    return (
        <Container> 
            {isLoading
            ? "Loading..."
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