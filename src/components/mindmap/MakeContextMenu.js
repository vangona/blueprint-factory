import { dbService } from "../../fBase";
import * as go from 'gojs';
import { useNavigate } from "react-router-dom";

const $ = go.GraphObject.make;

export function useMakeContextMenu(cm, obj) {
    const data = obj.part.data;
    const navigate = useNavigate();

    while (cm.elements.count > 0) cm.removeAt(0);

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

    function makeLongtermContextmenu(cm) {
        cm.add(
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
          )
        )
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
            $(go.TextBlock, "목표 삭제하기"),
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
        cm.add(
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
          )
        )
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
            $(go.TextBlock, "목표 삭제하기"),
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
        cm.add(
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
          )
        )
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
            $(go.TextBlock, "목표 삭제하기"),
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
        cm.add(
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
          )
        )
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
            $(go.TextBlock, "목표 삭제하기"),
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
          )
        )
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
            $(go.TextBlock, "목표 삭제하기"),
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

    go.ContextMenuTool.prototype.showContextMenu.call(this, cm, obj);
  }

