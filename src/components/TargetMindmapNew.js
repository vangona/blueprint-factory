import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { useNavigate } from "react-router-dom";
import { defaultContainer } from "../css/styleConstants";

const Container = styled.div`
  ${defaultContainer}
`;

const TargetMindmapNew = ({ userObj }) => {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    const initDiagram = () => {
      var $ = go.GraphObject.make;

      var myDiagram =
        $(go.Diagram, 
          {
            layout: $(go.ForceDirectedLayout),
                "undoManager.isEnabled": true,
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
        if (type === "target") return 'blue';
        if (type === "plan") return 'skyblue';
        if (type === "routine") return 'orange';
        return "black";
      }

      function isCompleteColorConverter(isComplete) {
        if (isComplete) return 'blue';
        return 'yellow';
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
          $(go.Shape, 
            {
                figure: "RoundedRectangle",
                parameter1: 10,
                fill: "orange",  // default fill color
                portId: "",
                fromLinkable: true,
                fromSpot: go.Spot.AllSides,
                toLinkable: true,
                toSpot: go.Spot.AllSides,
                cursor: "pointer"
            },
            new go.Binding("fill", "type", typeColorConverter),
            new go.Binding("fill", "isComplete", isCompleteColorConverter)
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
                $(go.TextBlock, "목표 수정하기"),
                {
                  click: function(e, obj) {
                    const node = obj.part.adornedPart;
                    if (node !== null) {
                      navigate({
                        pathname: `/blueprint/edit/${node.data.type}/${node.data.key}`,
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
                        pathname: `/blueprint/targets/${node.data.key}`,
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
    $(MultiArrowLink,  // subclass of Link, defined below
        {
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true
        },
        $(go.Shape,
        { isPanelMain: true },
        new go.Binding("fill", "color"))
        // no arrowhead is defined here -- they are hard-coded in MultiArrowLink.makeGeometry
    );

    // it's best to declare all templates before assigning the model
    myDiagram.model = new go.GraphLinksModel(models);
        return myDiagram;
    };

    function MultiArrowLink() {
        go.Link.call(this);
        this.routing = go.Link.Orthogonal;
        }
        go.Diagram.inherit(MultiArrowLink, go.Link);
    
        // produce a Geometry from the Link's route
        MultiArrowLink.prototype.makeGeometry = function() {
        // get the Geometry created by the standard behavior
        var geo = go.Link.prototype.makeGeometry.call(this);
        if (geo.type !== go.Geometry.Path || geo.figures.length === 0) return geo;
        var mainfig = geo.figures.elt(0);  // assume there's just one PathFigure
        var mainsegs = mainfig.segments;
    
        var arrowLen = 8;  // length for each arrowhead
        var arrowWid = 3;  // actually half-width of each arrowhead
        var fx = mainfig.startX;
        var fy = mainfig.startY;
        for (var i = 0; i < mainsegs.length; i++) {
            var a = mainsegs.elt(i);
            // assume each arrowhead is a simple triangle
            var ax = a.endX;
            var ay = a.endY;
            var bx = ax;
            var by = ay;
            var cx = ax;
            var cy = ay;
            if (fx < ax - arrowLen) {
            bx -= arrowLen; by += arrowWid;
            cx -= arrowLen; cy -= arrowWid;
            } else if (fx > ax + arrowLen) {
            bx += arrowLen; by += arrowWid;
            cx += arrowLen; cy -= arrowWid;
            } else if (fy < ay - arrowLen) {
            bx -= arrowWid; by -= arrowLen;
            cx += arrowWid; cy -= arrowLen;
            } else if (fy > ay + arrowLen) {
            bx -= arrowWid; by += arrowLen;
            cx += arrowWid; cy += arrowLen;
            }
            geo.add(new go.PathFigure(ax, ay, true)
            .add(new go.PathSegment(go.PathSegment.Line, bx, by))
            .add(new go.PathSegment(go.PathSegment.Line, cx, cy).close()));
            fx = ax;
            fy = ay;
        }
    
        return geo;
        };
      
    const getModels = () => {
      const dream = {
        key: 'dream',
        name: `행복한 사람`,
        type: 'dream',
      };

      const dataArr = userObj.targets.map((target) => ({
        key: `${target.id}`, 
        parent: `${target.parentId}`,
        type: `${target.type}`,
        name: `${target.name}`,
        actions: Array.isArray(target.explain) ? target.explain.map((need, index) => (
          {text: `${need}`}
          )
        )
        : target.explain && [{text: target.explain}],
        deadline: `${target.deadline}`,
        isComplete: target.isComplete
      }));

      setModels([dream, ...dataArr]);
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

export default TargetMindmapNew;