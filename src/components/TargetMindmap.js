import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { useNavigate } from "react-router-dom";
import { defaultBtnAction, defaultContainer, defaultShadow } from "../css/styleConstants";
import { dbService } from "../fBase";

const Container = styled.div`
  ${defaultContainer}
`;

const Title = styled.h1`
  font-family: Ssurround;
  font-size: 25px;
  margin-top: 20px;
`;

const ZoomToFit = styled.button`
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  background-color: var(--main-blue);
  font-family: Ssurround;
  ${defaultShadow};
  ${defaultBtnAction};
`;

const TargetMindmap = ({ userObj }) => {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    const initDiagram = () => {
      const $ = go.GraphObject.make;

      const myDiagram =
        $(go.Diagram,
          {
            "undoManager.isEnabled": true,
            layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 }),
            "contextMenuTool.showContextMenu" : makeContextMenu,
            maxSelectionCount: 1,
            initialAutoScale: go.Diagram.Uniform,
          });

      function nodeDoubleClick(e, obj) {
        const clicked = obj.part;
        if (clicked !== null) {
          navigate(`/blueprint/${clicked.data.key}`);
        }
      }
      
      function makeContextMenu(cm, obj) {
        const data = obj.part.data;

        while (cm.elements.count > 0) cm.removeAt(0);
        cm.add(
          $("ContextMenuButton",
            $(go.TextBlock, "목표를 달성했어요"),
            {
              click: function(e, obj) {
                const node = obj.part.adornedPart;
                dbService.collection("targets").doc(`${node.data.key}`).update({
                  isComplished: true,
                }).then(() => {
                  alert("축하드려오");
                }).catch(error => {
                  console.log(error.message);
                })
              }
            }
          )          
        )
        switch(data.type) {
          case 'longterm' :
            makeLongtermContextmenu(cm);
            break;
          case 'shortterm' :
            makeShorttermContextmenu(cm);
            break;
          case 'plan' :
            makePlanContextmenu(cm);
            break;
          case 'routine' :
            makeRoutineContextmenu(cm);
            break;
          default :
            makeIncompleteContextmenu(cm);
        }

        go.ContextMenuTool.prototype.showContextMenu.call(this, cm, obj);
      }

      function makeLongtermContextmenu(cm) {
        // cm.add(
        //   $("ContextMenuButton",
        //     $(go.TextBlock, "목표 수정하기"),
        //     {
        //       click: function(e, obj) {
        //         const node = obj.part.adornedPart;
        //         if (node !== null) {
        //           navigate({
        //             pathname: `/blueprint/edit/${node.data.type}/${node.data.key}`,
        //             state: {type: "edit"}
        //           })
        //         }
        //       }
        //     }
        //   )
        // )
        cm.add(
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
          )
        )
        cm.add(
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
          )
        )
        cm.add(
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
        cm.add(
          $("ContextMenuButton",
            $(go.TextBlock, "삭제하기"),
            {
              click: async function(e, obj) {
                const node = obj.part.adornedPart;
                if (node !== null) {
                  await dbService.collection("targets").doc(`${node.data.key}`).delete()
                  .then(()=>{
                    alert('성공');
                  }).catch(error => {
                    console.log(error.message);
                  })
                }
              }
            }
          )
        )
      }

      function makeShorttermContextmenu(cm) {
        // cm.add(
        //   $("ContextMenuButton",
        //     $(go.TextBlock, "목표 수정하기"),
        //     {
        //       click: function(e, obj) {
        //         const node = obj.part.adornedPart;
        //         if (node !== null) {
        //           navigate({
        //             pathname: `/blueprint/edit/${node.data.type}/${node.data.key}`,
        //             state: {type: "edit"}
        //           })
        //         }
        //       }
        //     }
        //   )
        // )
        cm.add(
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
          )
        )
        cm.add(
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
          )
        )
        cm.add(
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
        cm.add(
          $("ContextMenuButton",
            $(go.TextBlock, "삭제하기"),
            {
              click: async function(e, obj) {
                const node = obj.part.adornedPart;
                if (node !== null) {
                  await dbService.collection("targets").doc(`${node.data.key}`).delete()
                  .then(()=>{
                    alert('성공');
                  }).catch(error => {
                    console.log(error.message);
                  })
                }
              }
            }
          )
        )
      }

      function makePlanContextmenu(cm) {
        // cm.add(
        //   $("ContextMenuButton",
        //     $(go.TextBlock, "계획 수정하기"),
        //     {
        //       click: function(e, obj) {
        //         const node = obj.part.adornedPart;
        //         if (node !== null) {
        //           navigate({
        //             pathname: `/blueprint/edit/${node.data.type}/${node.data.key}`,
        //             state: {type: "edit"}
        //           })
        //         }
        //       }
        //     }
        //   )
        // )
        cm.add(
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
          )
        )
        cm.add(
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
          )
        )
        cm.add(
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
        cm.add(
          $("ContextMenuButton",
            $(go.TextBlock, "삭제하기"),
            {
              click: async function(e, obj) {
                const node = obj.part.adornedPart;
                if (node !== null) {
                  await dbService.collection("targets").doc(`${node.data.key}`).delete()
                  .then(()=>{
                    alert('성공');
                  }).catch(error => {
                    console.log(error.message);
                  })
                }
              }
            }
          )
        )
      }     
      
      function makeRoutineContextmenu(cm) {
        // cm.add(
        //   $("ContextMenuButton",
        //     $(go.TextBlock, "루틴 수정하기"),
        //     {
        //       click: function(e, obj) {
        //         const node = obj.part.adornedPart;
        //         if (node !== null) {
        //           navigate({
        //             pathname: `/blueprint/edit/${node.data.type}/${node.data.key}`,
        //             state: {type: "edit"}
        //           })
        //         }
        //       }
        //     }
        //   )
        // )
        cm.add(
          $("ContextMenuButton",
            $(go.TextBlock, "삭제하기"),
            {
              click: async function(e, obj) {
                const node = obj.part.adornedPart;
                if (node !== null) {
                  await dbService.collection("targets").doc(`${node.data.key}`).delete()
                  .then(()=>{
                    alert('성공');
                  }).catch(error => {
                    console.log(error.message);
                  })
                }
              }
            }
          )
        )
      }      

      function makeIncompleteContextmenu(cm) {
        cm.add(
          $("ContextMenuButton",
            $(go.TextBlock, "작성 완료하기"),
            {
              click: function(e, obj) {
                const node = obj.part.adornedPart;
                if (node !== null) {
                  navigate({
                    pathname: `/blueprint/edit/target/${node.data.key}`,
                    state: {type: "edit"}
                  })
                }
              }
            }
          )
        )
        cm.add(
          $("ContextMenuButton",
            $(go.TextBlock, "삭제하기"),
            {
              click: async function(e, obj) {
                const node = obj.part.adornedPart;
                if (node !== null) {
                  await dbService.collection("targets").doc(`${node.data.key}`).delete()
                  .then(()=>{
                    alert('성공');
                  }).catch(error => {
                    console.log(error.message);
                  })
                }
              }
            }
          )
        )
      }

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

      function isComplishedPainter(isComplished) {
        if(isComplished) {
          return "lightgreen";
        } else {
          return "white";
        }
      }      
      
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
            { 
              font: "10pt SsurroundAir, sans-serif",
              alignment: go.Spot.Center,
            },
            new go.Binding("text")
          )
        )

      myDiagram.nodeTemplate =
        $(go.Node, "Vertical",

        new go.Binding("isTreeExpanded").makeTwoWay(),
        new go.Binding("wasTreeExpanded").makeTwoWay(),

        { deletable: false, 
          toolTip: tooltiptemplate, 
          selectionObjectName: "BODY", 
          contextMenu: $("ContextMenu"),
          click: (e, obj) => {
            myDiagram.commandHandler.scrollToPart(myDiagram.findNodeForKey(obj.part.data.key));
            myDiagram.commandHandler.resetZoom();
          },
          doubleClick: nodeDoubleClick,
        },

        new go.Binding("text", "name"),

        $(go.Panel, "Auto",
          { name: "BODY" },
          $(go.Shape, "RoundedRectangle",
            {
              portId: "",
              fromLinkable: true,
              toLinkable: true,
              cursor: "pointer",
              fill: "white",
              strokeWidth: 3,
            },
            new go.Binding("fill", "isComplished", isComplishedPainter),
            new go.Binding("stroke", "type", typeColorConverter),
          ),
          $(go.Panel, "Vertical",
            { 
              margin: 10,
              cursor: "pointer",
            },
              $(go.TextBlock,
                  {
                    stretch: go.GraphObject.Horizontal,
                    font: "bold 12pt SsurroundAir",
                    stroke: "black",
                    textAlign: "center",
                  },
                  new go.Binding("text", "name")
            ),
            $(go.Panel, "Vertical",
                { 
                  stretch: go.GraphObject.Horizontal,
                  visible: false,
                },
                new go.Binding("visible", "actions", function(acts) {
                  return (Array.isArray(acts) && acts.length > 0);
                }),
                $(go.Panel, "Table",
                  { 
                    stretch: go.GraphObject.Horizontal,
                  },
                  // $(go.TextBlock, 
                  //   {
                  //     alignment: go.Spot.Left,
                  //     font: "10pt Kyobo Handwriting, sans-serif",
                  //   },
                  // ),
                  $("PanelExpanderButton", "COLLAPSIBLE",
                    { 
                      column: 1, 
                      alignment: go.Spot.Right,
                    }
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
      
      // define a Link template that routes orthogonally, with no arrowhead
      myDiagram.linkTemplate =
        $(go.Link, go.Link.Orthogonal,
          {
            corner: 10,
            deletable: false, 
            relinkableFrom: true, 
            relinkableTo: true,
          },
          $(go.Shape, // the link's path shape
            { strokeWidth: 3, stroke: "#555" })
        );

      document.getElementById('zoom-to-fit').addEventListener('click', () => {
        myDiagram.commandHandler.zoomToFit();
      });

      // it's best to declare all templates before assigning the model
      myDiagram.model = new go.TreeModel(models);
          return myDiagram;
          
    };
      
    const getModels = () => {
      const dataArr = userObj.targets.map((target) => {
        const Time = new Date(target.deadline.seconds * 1000);
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
        isComplished: target.isComplished,
        deadline: deadlineTime,
        remain: remainTime,
        isOpen: target.isOpen,
      })});
      
      if (dataArr.length) {
        setModels(dataArr);
      } else {
        const initNode = {
          key: "",
          parent: "",
          type: "longterm",
          name: "첫번째 목표 만들기",
          actions: "",
          deadline: "",
          remain: "",
          isComplished: false,
          isOpen: false,
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
            :
            <>
            <Title>
              {userObj.displayName}님의 청사진
            </Title>
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={models}
                onModelChange={handleModelChange}
            />
            <ZoomToFit id="zoom-to-fit">전체 보기</ZoomToFit>
            </>
            }
            
        </Container>
    )
}

export default TargetMindmap;