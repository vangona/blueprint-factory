import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { useNavigate } from "react-router-dom";
import { defaultContainer } from "../css/styleConstants";
import { dbService } from "../fBase";

const Container = styled.div`
  ${defaultContainer}
`;

const TargetMindmap = ({ userObj }) => {
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
        if (type === "incomplete") return 'green';
        return "black";
      }

      const actionTemplate = 
        $(go.Panel,
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
            {
              portId: "",
              fromLinkable: true,
              toLinkable: true,
              cursor: "pointer",
            },
            new go.Binding("fill", "type", typeColorConverter),
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
                    textAlign: "center",
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
                $(go.TextBlock, "목표 수정하기"),
                {
                  click: function(e, obj) {
                    const node = obj.part.adornedPart;
                    if (node !== null) {
                      navigate({
                        pathname: `/blueprint/edit/${node.data.type === "incomplete" ? "target" : node.data.type}/${node.data.key}`,
                        state: {type: "edit"}
                      })
                    }
                  }
                }
              ),
              $("ContextMenuButton",
                $(go.TextBlock, "하위 목표 만들기"),
                {
                  click: function(e, obj) {
                    const node = obj.part.adornedPart;
                    if (node !== null) {
                      navigate({
                        pathname: `/blueprint/targets${node.data.key ? '/' + node.data.key : ''}`,
                        state: {type: "targets"}
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
                        pathname: `/blueprint/plan/${node.data.key}`,
                        state: {type : "plan"}
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
                        pathname: `/blueprint/routine/${node.data.key}`,
                        state: {type: "routine"}
                      })
                    }
                  }
                }
              )
        )
      
      // define a Link template that routes orthogonally, with no arrowhead
      myDiagram.linkTemplate =
        $(go.Link, go.Link.Orthogonal,
          { corner: 5, relinkableFrom: true, relinkableTo: true },
          $(go.Shape, // the link's path shape
            { strokeWidth: 3, stroke: "#555" })
        );

      // it's best to declare all templates before assigning the model
      myDiagram.model = new go.TreeModel(models);
          return myDiagram;
      };
      
    const getModels = () => {
      const dataArr = userObj.targets.map((target) => {
        const Time = new Date(target.deadline.seconds * 1000);
        console.log(Time);
        const Year = Time.getFullYear();
        const Month = Time.getMonth() + 1;
        const DateTime = Time.getDate();
        const remainTime = Time - Date.now();
        const deadlineTime = `${Year}-${Month > 9 ? Month : '0' + Month}-${DateTime > 9 ? DateTime : '0' + DateTime}`;
        return ({
        key: `${target.id}`, 
        parent: `${target.parentId}`,
        type: `${target.type}`,
        name: !target.deadline ? `${target.name}` : `${target.name} \n ${deadlineTime}까지`,
        actions: Array.isArray(target.explain) ? target.explain.map((need, index) => (
          {text: `${need}`}
          )
        )
        : target.explain && [{text: target.explain}],
        deadline: deadlineTime,
        remain: remainTime,
      })});
      
      if (dataArr.length) {
        setModels(dataArr);
      } else {
        const initNode = {
          key: "",
          parent: "",
          type: "",
          name: "첫번째 목표 만들기",
          actions: "",
          deadline: "",
          remain: "",
        }
        setModels([initNode]);
      }
      setIsLoading(false);
    };

    useEffect(() => {
      getModels();
    }, [])

    const handleModelChange = async (changes) => {
        await dbService.collection("targets").doc(`${changes.modifiedNodeData[0].key}`).update({
          parentId: changes.modifiedNodeData[0].parent
        }).then(() => {
          console.log("success");
        }).catch((error) => {
          console.log(error.message);
        })
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