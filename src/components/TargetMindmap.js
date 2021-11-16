import React from "react";
import styled from "styled-components";
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const SavedDiagram = styled.textarea``;

const TargetMindmap = () => {
    let diagram;

    const initDiagram = () => {
        const $ = go.GraphObject.make;

        diagram =
            $(go.Diagram, 
                {
                    "commandHandler.copiesTree": true,
                    "commandHandler.copiesParentKey": true,
                    "commandHandler.deletesTree": true,
                    "draggingTool.dragsTree": true,
                    "undoManager.isEnabled": true,
                    model: $(go.GraphLinksModel,
                        {
                            linkKeyProperty: 'key'
                        })
                });

        diagram.addDiagramListener("Modified", function(e) {
            var button = document.getElementById("SaveButton");
            if (button) button.disabled = !diagram.isModified;
            var idx = document.title.indexOf("*");
            if (diagram.isModified) {
                if (idx < 0) document.title += "*";
            } else {
                if (idx >= 0) document.title = document.title.substr(0, idx);
            }
            });

        diagram.nodeTemplate =
            $(go.Node, 'Vertical',
                { selectionObjectName: "TEXT" },

                $(go.TextBlock,
                    { 
                        name: "TEXT",
                        minSize: new go.Size(30, 15),
                        editable: true 
                    },
                    new go.Binding('text').makeTwoWay(),
                    new go.Binding("scale", "scale").makeTwoWay(),
                    new go.Binding("font", "font").makeTwoWay()
                ),
                
                $(go.Shape, 'LineH',
                    { 
                        stretch: go.GraphObject.Horizontal,
                        strokeWidth: 3, height: 3,
                        portId: "", fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides
                    },
                    new go.Binding("stroke", "brush"),
                    new go.Binding("fromSpot", "dir", function (d) {
                        return spotConverter(d, true);
                    }),
                    new go.Binding("toSpot", "dir", function(d) {
                        return spotConverter(d, false);
                    })),
            
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            new go.Binding("locationSpot", "dir", function(d) {
                return spotConverter(d, false);
            })
            );

            diagram.nodeTemplate.selectionAdornmentTemplate = 
                $(go.Adornment, "Spot",
                    $(go.Panel, "Auto",
                        $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
                        $(go.Placeholder, { margin: new go.Margin(4, 4, 0, 4) })
                        ),
                        
                        $("Button",
                            {
                                alignment: go.Spot.Right,
                                alignmentFocus: go.Spot.Left,
                                click: addNodeAndLink
                            },
                            $(go.TextBlock, "+",
                                { font: "bold 8pt sans-serif" })
                            )
                        );

            diagram.nodeTemplate.contextMenu =
            $("ContextMenu",
                $("ContextMenuButton",
                    $(go.TextBlock, "Bigger"),
                    { click: function(e, obj) { changeTextSize(obj, 1.1); } }),
                    $("ContextMenuButton",
                    $(go.TextBlock, "Smaller"),
                    { click: function(e, obj) { changeTextSize(obj, 1 / 1.1); } }),
                    $("ContextMenuButton",
                    $(go.TextBlock, "Bold/Normal"),
                    { click: function(e, obj) { toggleTextWeight(obj); } }),
                    $("ContextMenuButton",
                    $(go.TextBlock, "Copy"),
                    { click: function(e, obj) { e.diagram.commandHandler.copySelection(); } }),
                    $("ContextMenuButton",
                    $(go.TextBlock, "Delete"),
                    { click: function(e, obj) { e.diagram.commandHandler.deleteSelection(); } }),
                    $("ContextMenuButton",
                    $(go.TextBlock, "Undo"),
                    { click: function(e, obj) { e.diagram.commandHandler.undo(); } }),
                    $("ContextMenuButton",
                    $(go.TextBlock, "Redo"),
                    { click: function(e, obj) { e.diagram.commandHandler.redo(); } }),
                    $("ContextMenuButton",
                    $(go.TextBlock, "Layout"),
                    {
                        click: function(e, obj) {
                        var adorn = obj.part;
                        adorn.diagram.startTransaction("Subtree Layout");
                        layoutTree(adorn.adornedPart);
                        adorn.diagram.commitTransaction("Subtree Layout");
                        }
                    }
                )
            );

            diagram.linkTemplate = 
                $(go.Link,
                    {
                        curve: go.Link.Bezier,
                        fromShortLength: -2,
                        toShortLength: -2,
                        selectable: false
                    },
                    $(go.Shape,
                        { strokeWidth: 3 },
                        new go.Binding("stroke", "toNode", function(n) {
                            if (n.data.brush) return n.data.brush;
                            return "black";
                        }).ofObject()
                    )
                  );

            diagram.contextMenu =
            $("ContextMenu",
              $("ContextMenuButton",
                $(go.TextBlock, "Paste"),
                { click: function (e, obj) { e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint); } },
                new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint); }).ofObject()),
              $("ContextMenuButton",
                $(go.TextBlock, "Undo"),
                { click: function(e, obj) { e.diagram.commandHandler.undo(); } },
                new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canUndo(); }).ofObject()),
              $("ContextMenuButton",
                $(go.TextBlock, "Redo"),
                { click: function(e, obj) { e.diagram.commandHandler.redo(); } },
                new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canRedo(); }).ofObject()),
              $("ContextMenuButton",
                $(go.TextBlock, "Save"),
                { click: function(e, obj) { save(); } }),
              $("ContextMenuButton",
                $(go.TextBlock, "Load"),
                { click: function(e, obj) { load(); } })
            );

            diagram.addDiagramListener("SelectionMoved", function(e) {
              var rootX = diagram.findNodeForKey(0).location.x;
              diagram.selection.each(function(node) {
                if (node.data.parent !== 0) return; // Only consider nodes connected to the root
                var nodeX = node.location.x;
                if (rootX < nodeX && node.data.dir !== "right") {
                  updateNodeDirection(node, "right");
                } else if (rootX > nodeX && node.data.dir !== "left") {
                  updateNodeDirection(node, "left");
                }
                layoutTree(node);
              });
            });

            load();
          };

          function spotConverter(dir, from) {
              if (dir === "left") {
                return (from ? go.Spot.Left : go.Spot.Right);
              } else {
                return (from ? go.Spot.Right : go.Spot.Left);
              }
            }

          function changeTextSize(obj, factor) {
            var adorn = obj.part;
            adorn.diagram.startTransaction("Change Text Size");
            var node = adorn.adornedPart;
            var tb = node.findObject("TEXT");
            tb.scale *= factor;
            adorn.diagram.commitTransaction("Change Text Size");
          }
      
          function toggleTextWeight(obj) {
            var adorn = obj.part;
            adorn.diagram.startTransaction("Change Text Weight");
            var node = adorn.adornedPart;
            var tb = node.findObject("TEXT");
            // assume "bold" is at the start of the font specifier
            var idx = tb.font.indexOf("bold");
            if (idx < 0) {
              tb.font = "bold " + tb.font;
            } else {
              tb.font = tb.font.substr(idx + 5);
            }
            adorn.diagram.commitTransaction("Change Text Weight");
          }

          function updateNodeDirection(node, dir) {
            diagram.model.setDataProperty(node.data, "dir", dir);
            // recursively update the direction of the child nodes
            var chl = node.findTreeChildrenNodes(); // gives us an iterator of the child nodes related to this particular node
            while (chl.next()) {
              updateNodeDirection(chl.value, dir);
            }
          }

          function addNodeAndLink(e, obj) {
            var adorn = obj.part;
            var diagram = adorn.diagram;
            diagram.startTransaction("Add Node");
            var oldnode = adorn.adornedPart;
            var olddata = oldnode.data;
            // copy the brush and direction to the new node data
            var newdata = { text: "idea", brush: olddata.brush, dir: olddata.dir, parent: olddata.key };
            diagram.model.addNodeData(newdata);
            layoutTree(oldnode);
            diagram.commitTransaction("Add Node");
      
            // if the new node is off-screen, scroll the diagram to show the new node
            var newnode = diagram.findNodeForData(newdata);
            if (newnode !== null) diagram.scrollToRect(newnode.actualBounds);
          }

          function layoutTree(node) {
            if (node.data.key === 0) {  // adding to the root?
              layoutAll();  // lay out everything
            } else {  // otherwise lay out only the subtree starting at this parent node
              var parts = node.findTreeParts();
              layoutAngle(parts, node.data.dir === "left" ? 180 : 0);
            }
          }

          function layoutAngle(parts, angle) {
            var layout = go.GraphObject.make(go.TreeLayout,
              {
                angle: angle,
                arrangement: go.TreeLayout.ArrangementFixedRoots,
                nodeSpacing: 5,
                layerSpacing: 20,
                setsPortSpot: false, // don't set port spots since we're managing them with our spotConverter function
                setsChildPortSpot: false
              });
            layout.doLayout(parts);
          }
      
          function layoutAll() {
            var root = diagram.findNodeForKey(0);
            if (root === null) return;
            diagram.startTransaction("Layout");
            // split the nodes and links into two collections
            var rightward = new go.Set(/*go.Part*/);
            var leftward = new go.Set(/*go.Part*/);
            root.findLinksConnected().each(function(link) {
              var child = link.toNode;
              if (child.data.dir === "left") {
                leftward.add(root);  // the root node is in both collections
                leftward.add(link);
                leftward.addAll(child.findTreeParts());
              } else {
                rightward.add(root);  // the root node is in both collections
                rightward.add(link);
                rightward.addAll(child.findTreeParts());
              }
            });
            // do one layout and then the other without moving the shared root node
            layoutAngle(rightward, 0);
            layoutAngle(leftward, 180);
            diagram.commitTransaction("Layout");
          }

          function save() {
            document.getElementById("mySavedModel").value = diagram.model.toJson();
            diagram.isModified = false;
          }
          function load() {
            diagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
          }

    const handleModelChange = (changes) => {
        console.log('GoJS Model changed!');
    };

    return (
        <Container> 
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={[
                    {"key":0, "text":"Mind Map", "loc":"0 0"},
                    {"key":1, "parent":0, "text":"Getting more time", "brush":"skyblue", "dir":"right", "loc":"77 -22"},
                    {"key":11, "parent":1, "text":"Wake up early", "brush":"skyblue", "dir":"right", "loc":"200 -48"},
                    {"key":12, "parent":1, "text":"Delegate", "brush":"skyblue", "dir":"right", "loc":"200 -22"},
                    {"key":13, "parent":1, "text":"Simplify", "brush":"skyblue", "dir":"right", "loc":"200 4"},
                    {"key":2, "parent":0, "text":"More effective use", "brush":"darkseagreen", "dir":"right", "loc":"77 43"},
                    {"key":21, "parent":2, "text":"Planning", "brush":"darkseagreen", "dir":"right", "loc":"203 30"},
                    {"key":211, "parent":21, "text":"Priorities", "brush":"darkseagreen", "dir":"right", "loc":"274 17"},
                    {"key":212, "parent":21, "text":"Ways to focus", "brush":"darkseagreen", "dir":"right", "loc":"274 43"},
                    {"key":22, "parent":2, "text":"Goals", "brush":"darkseagreen", "dir":"right", "loc":"203 56"},
                    {"key":3, "parent":0, "text":"Time wasting", "brush":"palevioletred", "dir":"left", "loc":"-20 -31.75"},
                    {"key":31, "parent":3, "text":"Too many meetings", "brush":"palevioletred", "dir":"left", "loc":"-117 -64.25"},
                    {"key":32, "parent":3, "text":"Too much time spent on details", "brush":"palevioletred", "dir":"left", "loc":"-117 -25.25"},
                    {"key":33, "parent":3, "text":"Message fatigue", "brush":"palevioletred", "dir":"left", "loc":"-117 0.75"},
                    {"key":331, "parent":31, "text":"Check messages less", "brush":"palevioletred", "dir":"left", "loc":"-251 -77.25"},
                    {"key":332, "parent":31, "text":"Message filters", "brush":"palevioletred", "dir":"left", "loc":"-251 -51.25"},
                    {"key":4, "parent":0, "text":"Key issues", "brush":"coral", "dir":"left", "loc":"-20 52.75"},
                    {"key":41, "parent":4, "text":"Methods", "brush":"coral", "dir":"left", "loc":"-103 26.75"},
                    {"key":42, "parent":4, "text":"Deadlines", "brush":"coral", "dir":"left", "loc":"-103 52.75"},
                    {"key":43, "parent":4, "text":"Checkpoints", "brush":"coral", "dir":"left", "loc":"-103 78.75"}
                     ]}
                onModelChange={handleModelChange} 
            />
            <SavedDiagram id="mySavedModel" style={{width: '100%', height: '400px'}}>
            {JSON.stringify({ "class": "go.TreeModel",
              "nodeDataArray": [
            {"key":0, "text":"Mind Map", "loc":"0 0"},
            {"key":1, "parent":0, "text":"Getting more time", "brush":"skyblue", "dir":"right", "loc":"77 -22"},
            {"key":11, "parent":1, "text":"Wake up early", "brush":"skyblue", "dir":"right", "loc":"200 -48"},
            {"key":12, "parent":1, "text":"Delegate", "brush":"skyblue", "dir":"right", "loc":"200 -22"},
            {"key":13, "parent":1, "text":"Simplify", "brush":"skyblue", "dir":"right", "loc":"200 4"},
            {"key":2, "parent":0, "text":"More effective use", "brush":"darkseagreen", "dir":"right", "loc":"77 43"},
            {"key":21, "parent":2, "text":"Planning", "brush":"darkseagreen", "dir":"right", "loc":"203 30"},
            {"key":211, "parent":21, "text":"Priorities", "brush":"darkseagreen", "dir":"right", "loc":"274 17"},
            {"key":212, "parent":21, "text":"Ways to focus", "brush":"darkseagreen", "dir":"right", "loc":"274 43"},
            {"key":22, "parent":2, "text":"Goals", "brush":"darkseagreen", "dir":"right", "loc":"203 56"},
            {"key":3, "parent":0, "text":"Time wasting", "brush":"palevioletred", "dir":"left", "loc":"-20 -31.75"},
            {"key":31, "parent":3, "text":"Too many meetings", "brush":"palevioletred", "dir":"left", "loc":"-117 -64.25"},
            {"key":32, "parent":3, "text":"Too much time spent on details", "brush":"palevioletred", "dir":"left", "loc":"-117 -25.25"},
            {"key":33, "parent":3, "text":"Message fatigue", "brush":"palevioletred", "dir":"left", "loc":"-117 0.75"},
            {"key":331, "parent":31, "text":"Check messages less", "brush":"palevioletred", "dir":"left", "loc":"-251 -77.25"},
            {"key":332, "parent":31, "text":"Message filters", "brush":"palevioletred", "dir":"left", "loc":"-251 -51.25"},
            {"key":4, "parent":0, "text":"Key issues", "brush":"coral", "dir":"left", "loc":"-20 52.75"},
            {"key":41, "parent":4, "text":"Methods", "brush":"coral", "dir":"left", "loc":"-103 26.75"},
            {"key":42, "parent":4, "text":"Deadlines", "brush":"coral", "dir":"left", "loc":"-103 52.75"},
            {"key":43, "parent":4, "text":"Checkpoints", "brush":"coral", "dir":"left", "loc":"-103 78.75"}
            ]
            })}
            </SavedDiagram>
        </Container>
    )
}

export default TargetMindmap;