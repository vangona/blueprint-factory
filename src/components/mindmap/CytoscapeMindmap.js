import React, { useEffect, useState } from "react";
import cytoscape from "cytoscape";

import dagre from "cytoscape-dagre";
import coseBilkent from "cytoscape-cose-bilkent";

import cxtmenu from "cytoscape-cxtmenu";
import edgehandles from "cytoscape-edgehandles";
import domNode from "cytoscape-dom-node";

import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { dbService, firebaseInstance } from "../../fBase";
import { EdgeHandlesOptions } from "./EdgeHandlesOptions";
import { defaultBtnAction, defaultContainer } from "../../css/styleConstants";
import { MindmapLayout } from "./MindmapLayout";
import removeTarget from "components/mindmap/functions/removeTarget";
import complishTarget from "./functions/complishTarget";
import unComplishTarget from "./functions/unComplishTarget";
import openTarget from "./functions/openTarget";
import cyStyle from "./cyStyle";

const Container = styled.div`
  ${defaultContainer};
  padding: 10px;
`;

const Title = styled.div`
  position: absolute;
  top: 30px;
  font-size: 20px;
  font-family: Ssurround;
`;

const Bold = styled.span`
  color: var(--main-blue);
`;

const MindmapContainer = styled.div``;

const BtnBox = styled.div`
  z-index: 999;
  display: flex;
  gap: 10px;
`;

const DrawBtn = styled.button`
  font-family: Ssurround;
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: white;
  color: var(--main-blue);
  ${defaultBtnAction};
`;

const DataContainer = styled.div`
  font-family: SsurroundAir;
  font-size: 18px;
  background-color: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
`;

function CytoscapeMindmap({ userObj }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState("");
  const [snapshot, setSnapshot] = useState("");
  const [dataForRank, setDataForRank] = useState("");
  const [currentData, setCurrentData] = useState("");

  cytoscape.use(dagre);
  cytoscape.use(coseBilkent);
  if (typeof cytoscape("core", "cxtmenu") === "undefined") {
    cxtmenu(cytoscape);
  }
  if (typeof cytoscape("core", "domNode") === "undefined") {
    domNode(cytoscape);
  }
  if (typeof cytoscape("core", "edgehandles") === "undefined") {
    edgehandles(cytoscape);
  }

  const ContextLongtermMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".longterm",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "하위 목표 만들기",

        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/targets/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "루틴 만들기",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/routine/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "목표를 달성했어요!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "비밀로 할래요",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "삭제하기",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextShorttermMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".shortterm",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "하위 목표 만들기",

        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/targets/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "계획 세우기",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/plan/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "루틴 만들기",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/routine/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "목표를 달성했어요!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "비밀로 할래요",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "삭제하기",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextPlanMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".plan",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "할 일 쓰기",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/todo/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "루틴 만들기",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/routine/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "계획을 마쳤어요!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "비밀로 할래요",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "삭제하기",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextRoutineMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".routine",
    commands: [
      // {
      //   fillColor: 'rgba(200, 200, 200, 0.75)',
      //   content: '루틴 수정하기',

      //   contentStyle: {},
      //   select: function(ele){
      //     navigate({
      //       pathname: `/blueprint/targets/${ele.id()}`,
      //     })
      //   },
      //   enabled: true,
      // },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "루틴으로 목표에 도달했어요!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "비밀로 할래요",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "삭제하기",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextTodoMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".todo",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "할 일을 마쳤어요!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "비밀로 할래요",
        contentStyle: {},
        select(ele) {
          privateTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "삭제하기",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextPrivateMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".private",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "다시 공개 할게요",
        contentStyle: {},
        select(ele) {
          openTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "삭제하기",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextIncompleteMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".incomplete",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "작성 완료하기",

        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/incomplete/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "도달했어요!",
        contentStyle: {},
        select(ele) {
          complishTarget(ele);
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "계획으로 만들기",

        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/plan/${ele.id()}`,
          });
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "삭제하기",
        contentStyle: {},
        select(ele) {
          removeTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextComplishedMenuOptions = {
    menuRadius(ele) {
      return 80;
    },
    selector: ".isComplished",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "잘했어오",

        contentStyle: {},
        select(ele) {
          alert("어제의 나보다 오늘의 나는 얼마나 성장했을까요?");
        },
        enabled: true,
      },
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "미달성으로 되돌릴래요.",
        contentStyle: {},
        select(ele) {
          unComplishTarget(ele);
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextEdgeMenuOptions = {
    menuRadius(ele) {
      return 100;
    },
    selector: "edge",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "선 지우기",
        contentStyle: {},
        async select(ele) {
          console.log(ele.data());
          await dbService
            .collection("targets")
            .doc(`${ele.data().source}`)
            .update({
              childs: firebaseInstance.firestore.FieldValue.arrayRemove(
                ele.data().target
              ),
            })
            .then(() => {
              console.log("success");
            })
            .catch((error) => {
              console.log(error.message);
            });
          ele.remove();
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const ContextCoreMenuOptions = {
    menuRadius(ele) {
      return 100;
    },
    selector: "core",
    commands: [
      {
        fillColor: "rgba(200, 200, 200, 0.75)",
        content: "새 목표 만들기",
        contentStyle: {},
        select(ele) {
          navigate({
            pathname: `/blueprint/targets`,
          });
        },
        enabled: true,
      },
    ],
    fillColor: "rgba(0, 0, 0, 0.75)",
    activeFillColor: "rgba(1, 105, 217, 0.75)",
    activePadding: 20,
    indicatorSize: 24,
    separatorWidth: 3,
    spotlightPadding: 4,
    adaptativeNodeSpotlightRadius: true,
    minSpotlightRadius: 24,
    maxSpotlightRadius: 38,
    openMenuEvents: "taphold",
    itemColor: "white",
    itemTextShadowColor: "transparent",
    zIndex: 9999,
    atMouse: false,
    outsideMenuCancel: 10,
  };

  const getDataForRank = (snapshot) => {
    const node = [];
    const edge = [];

    snapshot.forEach((el) => {
      el.parentId.forEach((parentId, index) => {
        const nodeData = {
          data: {
            id: `${index === 0 ? el.id : `${el.id}_${index}`}`,
            parent: `${parentId}`,
            parentId: `${parentId}`,
            // "label" : `${el.name}`,
            type: `${el.type}`,
            explain: `${el.explain}`,
            deadline: new Date(el.deadline.seconds * 1000),
            isComplete: el.isComplete,
            isComplished: el.isComplished,
            isPrivate: el.isPrivate,
          },
        };
        node.push(nodeData);

        if (el.type === "shortterm" || el.type === "longterm") {
          el.childs.forEach((child) => {
            const originEdge = {
              data: {
                id: `${el.id}->${child}`,
                source: `${child}`,
                target: `${el.id}`,
              },
            };
            edge.push(originEdge);
          });
        }
      });
    });

    setDataForRank([...node, ...edge]);
  };

  const getSnapshot = async () => {
    await dbService
      .collection("targets")
      .where("uid", "==", `${id || userObj.uid}`)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        getDataForRank(data);
        setSnapshot(data);
      });
  };

  const userSnapshot = () => {
    dbService
      .collection("targets")
      .where("uid", "==", `${id || userObj.uid}`)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        getDataForRank(data);
        setSnapshot(data);
      });
  };

  const getUserData = async (id) => {
    await dbService
      .collection("users")
      .doc(`${id}`)
      .get()
      .then((snapshot) => {
        const user = snapshot.data();
        setUserData(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fillCy = async () => {
    let pageRank = {
      rank: () => {
        return 0.0001;
      },
    };
    if (dataForRank.length) {
      const cy_for_rank = cytoscape({
        elements: dataForRank,
      });
      pageRank = cy_for_rank.elements().pageRank();
    }

    // 함수 변수 선언

    // edge, arrow
    const edgeWidth = "2px";
    const edgeActiveWidth = "4px";
    const arrowScale = 0.8;
    const arrowActiveScale = 1.2;

    // 색상
    const dimColor = "#dfe4ea";
    const edgeColor = "#ced6e0";
    const nodeTextColor = "black";
    const nodeColor = "white";
    const nodeActiveColor = "#ffa502";

    const longtermColor = "red";
    const shorttermColor = "blue";
    const planColor = "skyblue";
    const routineColor = "purple";
    const todoColor = "yellow";
    const privateColor = "black";
    const incompleteColor = "lightgreen";
    const complishedColor = "green";

    // on focus edge color
    const successorColor = "#ff6348";
    const predecessorsColor = "#1e90ff";

    // 노드 크기
    const nodeMaxSize = 100;
    const nodeMinSize = 20;
    const nodeActiveSize = 70;

    // 폰트 크기
    const fontMaxSize = 20;
    const fontMinSize = 10;
    const fontActiveSize = 16;

    const cy = cytoscape({
      container: document.getElementById("cy"),
      elements: [],
      style: cyStyle,
      layout: {},
      wheelSensitivity: 0.2,
    });

    // node 그리기
    cy.domNode();

    if (snapshot.length !== 0) {
      makeNode(snapshot);
      makeEdge(snapshot);
    } else {
      let initNode;

      if (id) {
        await dbService
          .collection("users")
          .doc(`${id}`)
          .get()
          .then((snapshot) => {
            const user = snapshot.data();
            initNode = {
              data: {
                id: "a",
                label: `${user.displayName}님은 아직 청사진을 그리지 않으셨어요.`,
              },
            };
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        let label = "배경을 길게 터치해보세요.";
        initNode = {
          data: {
            id: "a",
            label,
          },
        };

        if (userObj.isVisitor) {
          const loginBtn = document.createElement("div");
          loginBtn.innerHTML = "로그인하러가기";
          loginBtn.style.width = "max-content";
          loginBtn.style.padding = "10px 15px";
          loginBtn.style.backgroundColor = "white";
          loginBtn.style.border = "3px solid rgba(0, 0, 0, 0.5)";
          loginBtn.style.borderRadius = "10px";
          loginBtn.style.fontFamily = "SsurroundAir";
          loginBtn.style.fontSize = "12px";
          loginBtn.addEventListener("click", () => {
            navigate("/signout");
          });
          loginBtn.addEventListener("mouseover", () => {
            loginBtn.style.cursor = "pointer";
          });

          label = "청사진을 그리려면 로그인 해주세요.";
          initNode = {
            data: {
              id: "a",
              label,
              dom: loginBtn,
            },
          };
        }
      }
      cy.add(initNode);
    }

    cy.nodes().forEach((node) => {
      if (node.data().isPrivate && id) {
        node.addClass("isPrivate");
      } else if (node.data().isComplished) {
        node.addClass("isComplished");
      } else {
        if (node.data().type === "longterm") {
          node.addClass("longterm");
        }
        if (node.data().type === "shortterm") {
          node.addClass("shortterm");
        }
        if (node.data().type === "plan") {
          node.addClass("plan");
        }
        if (node.data().type === "routine") {
          node.addClass("routine");
        }
        if (node.data().type === "todo") {
          node.addClass("todo");
        }
        if (node.data().type === "incomplete") {
          node.addClass("incomplete");
        }
      }
    });

    cy.on("tap", function (e) {
      setResetFocus(e.cy);

      if (e.target.isNode) {
        if (!e.target.isEdge()) {
          setCurrentData(e.target.data());
          console.log(e.target.data());
        }
      }

      if (!e.target.isNode) setCurrentData("");

      e.target.isNode &&
        e.target.isNode() &&
        setDimStyle(cy, {
          "background-color": dimColor,
          "line-color": dimColor,
          "source-arrow-color": dimColor,
          color: dimColor,
        });

      e.target.isNode &&
        e.target.isNode() &&
        setFocus(
          e.target,
          successorColor,
          predecessorsColor,
          edgeActiveWidth,
          arrowActiveScale
        );
    });

    // 레이아웃 런
    const layout = cy.layout(MindmapLayout);
    layout.run();

    // 화면 크기별 맞춤
    let resizeTimer;

    window.addEventListener("resize", function () {
      this.clearTimeout(resizeTimer);
      resizeTimer = this.setTimeout(function () {
        cy.fit();
        cy.center();
      }, 200);
    });

    setTimeout(() => {
      cy.fit();
      cy.center();
    }, []);

    // 내 마인드맵 일 때 메뉴 추가
    if (!id) {
      setUserData(userObj);
      cy.cxtmenu(ContextLongtermMenuOptions);
      cy.cxtmenu(ContextShorttermMenuOptions);
      cy.cxtmenu(ContextPlanMenuOptions);
      cy.cxtmenu(ContextRoutineMenuOptions);
      cy.cxtmenu(ContextTodoMenuOptions);
      cy.cxtmenu(ContextComplishedMenuOptions);
      cy.cxtmenu(ContextIncompleteMenuOptions);
      cy.cxtmenu(ContextEdgeMenuOptions);
      cy.cxtmenu(ContextCoreMenuOptions);

      const eh = cy.edgehandles(EdgeHandlesOptions);

      const drawOn = document.querySelector("#draw-on");
      drawOn.addEventListener("click", function () {
        eh.enableDrawMode();
        drawOn.classList.add("hide");
        drawOff.classList.remove("hide");
      });

      const drawOff = document.querySelector("#draw-off");
      drawOff.addEventListener("click", function () {
        eh.disableDrawMode();
        drawOff.classList.add("hide");
        drawOn.classList.remove("hide");
      });

      cy.on("ehcomplete", async (sourceNode, targetNode) => {
        await dbService
          .collection("targets")
          .doc(`${targetNode.id()}`)
          .update({
            parentId: firebaseInstance.firestore.FieldValue.arrayUnion(
              targetNode.id()
            ),
          })
          .then(async () => {
            await dbService
              .collection("targets")
              .doc(`${sourceNode.id()}`)
              .update({
                childs: firebaseInstance.firestore.FieldValue.arrayUnion(
                  sourceNode.id()
                ),
              })
              .then(() => {
                console.log("success");
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    }

    console.log(cy);

    // 노드 만들기
    function makeNode(snapshot) {
      const visited = new Array(snapshot.length);

      // 서브 노드 그리기
      for (let i = 0; i < snapshot.length; i++) {
        if (visited[i]) continue;
        dfs(i);
      }

      // 최상위 노드 그리기
      for (let i = 0; i < snapshot.length; i++) {
        if (visited[i]) continue;
        paintNode(snapshot[i], "new");
      }

      function dfs(index) {
        const parent = snapshot[index].id;

        for (let i = 0; i < snapshot[index].childs.length; i++) {
          let childIndex;
          for (let j = 0; j < snapshot.length; j++) {
            if (snapshot[j].id === snapshot[index].childs[i]) childIndex = j;
          }
          if (visited[childIndex]) continue;
          paintNode(snapshot[childIndex], parent);
          visited[childIndex] = true;
          dfs(childIndex);
        }
      }

      function paintNode(targetData, parent) {
        // 변수 선언
        const container = document.createElement("div");
        const nodeSize = `${
          nodeMaxSize * pageRank.rank(`#${targetData.id}`) + nodeMinSize
        }px`;

        // 컨테이너 스타일링
        container.style.userSelect = "none";
        container.style.width = nodeSize;
        container.style.height = nodeSize;

        container.style.fontFamily = "SsurroundAir";
        container.style.textAlign = "center";
        container.style.wordBreak = "keep-all";

        if (targetData.type === "shortterm" || targetData.type === "longterm") {
          const node = {
            data: {
              id: `${targetData.id}`,
              parentId: `${parent}`,
              childs: targetData.childs,
              label: `${
                id && targetData.isPrivate ? "( 비공개 )" : targetData.name
              }`,
              type: `${targetData.type}`,
              explain: `${targetData.explain}`,
              deadline: new Date(targetData.deadline.seconds * 1000),
              isComplete: targetData.isComplete,
              isComplished: targetData.isComplished,
              isPrivate: targetData.isPrivate,
              dom: container,
            },
          };

          cy.add(node);
        } else {
          const node = {
            data: {
              id: `${targetData.id}`,
              parentId: `${parent}`,
              childs: targetData.childs,
              label: `${
                id && targetData.isPrivate ? "( 비공개 )" : targetData.name
              }`,
              type: `${targetData.type}`,
              explain: `${targetData.explain}`,
              deadline: new Date(targetData.deadline.seconds * 1000),
              isComplete: targetData.isComplete,
              isComplished: targetData.isComplished,
              isPrivate: targetData.isPrivate,
              dom: container,
            },
          };

          cy.add(node);
        }
      }
    }

    // 선 만들기
    function makeEdge(snapshot) {
      const visited = new Array(snapshot.length);

      // 간선 그리기
      for (let i = 0; i < snapshot.length; i++) {
        if (visited[i]) continue;
        dfs(i);
      }

      function dfs(index) {
        const parent = snapshot[index];
        if (visited[index]) return;

        visited[index] = true;

        for (let i = 0; i < snapshot[index].childs.length; i++) {
          // 데이터 찾기
          let childIndex;
          for (let j = 0; j < snapshot.length; j++) {
            if (snapshot[j].id === snapshot[index].childs[i]) childIndex = j;
          }

          // 데이터가 목표일 때만 간선을 그림

          paintEdge(parent.id, snapshot[childIndex].id);
          dfs(childIndex);
        }
      }

      function paintEdge(parent, child) {
        const edgeData = {
          data: {
            id: `${parent}->${child}`,
            source: `${parent}`,
            target: `${child}`,
          },
        };

        cy.add(edgeData);
      }
    }

    // 선택되지 않은 노드들 흐리게 하기
    function setDimStyle(target_cy, style) {
      target_cy.nodes().forEach(function (target) {
        target.style(style);
      });
      target_cy.edges().forEach(function (target) {
        target.style(style);
      });
    }

    function setFocus(
      target_element,
      successorColor,
      predecessorsColor,
      edgeWidth,
      arrowScale
    ) {
      target_element.style("background-color", nodeActiveColor);
      target_element.style("color", nodeTextColor);

      target_element.predecessors().each(function (e) {
        if (e.isEdge()) {
          e.style("width", edgeWidth);
          e.style("arrow-scale", arrowScale);
        }
        e.style("color", nodeTextColor);
        e.style("background-color", predecessorsColor);
        e.style("line-color", predecessorsColor);
        e.style("source-arrow-color", predecessorsColor);
        setOpacityElement(e, 1);
      });

      target_element.successors().each(function (e) {
        if (e.isEdge()) {
          e.style("width", edgeWidth);
          e.style("arrow-scale", arrowScale);
        }
        e.style("color", nodeTextColor);
        e.style("background-color", successorColor);
        e.style("line-color", successorColor);
        e.style("source-arrow-color", successorColor);
        setOpacityElement(e, 1);
      });

      target_element.neighborhood().each(function (e) {
        setOpacityElement(e, 1);
      });

      target_element.style(
        "width",
        Math.max(parseFloat(target_element.style("width")), nodeActiveSize)
      );
      target_element.style(
        "height",
        Math.max(parseFloat(target_element.style("height")), nodeActiveSize)
      );
      target_element.style(
        "font-size",
        Math.max(parseFloat(target_element.style("font-size")), fontActiveSize)
      );
    }

    function setOpacityElement(target_element, degree) {
      target_element.style("opacity", degree);
    }

    function setResetFocus(target_cy) {
      target_cy.nodes().forEach(function (target) {
        const targetList = [
          "longterm",
          "shortterm",
          "plan",
          "routine",
          "todo",
          "incomplete",
        ];
        const colorList = [
          longtermColor,
          shorttermColor,
          planColor,
          routineColor,
          todoColor,
          "white",
        ];

        let resetColor = colorList[targetList.indexOf(target.data().type)];

        if (target.data().isComplished) resetColor = complishedColor;

        if (id && target.data().isPrivate) resetColor = privateColor;

        target.style("background-color", resetColor);
        const rank = pageRank.rank(target);
        target.style("width", nodeMaxSize * rank + nodeMinSize);
        target.style("height", nodeMaxSize * rank + nodeMinSize);
        target.style("font-size", fontMaxSize * rank + fontMinSize);
        target.style("color", nodeTextColor);
        target.style("opacity", 1);
      });

      target_cy.edges().forEach(function (target) {
        target.style("line-color", edgeColor);
        target.style("source-arrow-color", edgeColor);
        target.style("width", edgeWidth);
        target.style("arrow-scale", arrowScale);
        target.style("opacity", 1);
      });
    }
  };

  useEffect(() => {
    if (!snapshot) {
      if (id) {
        getUserData(id);
        getSnapshot();
      } else {
        userSnapshot();
        setUserData(userObj);
      }
    } else {
      fillCy();
    }
  }, [snapshot]);

  return (
    <Container>
      <Title>
        {userData.displayName}님의 <Bold>청사진</Bold>
      </Title>
      <MindmapContainer
        id="cy"
        style={{ width: "100%", height: "90vh", top: "5vh", padding: "15px" }}
      />
      {currentData && <DataContainer>{currentData.label}</DataContainer>}
      {!id && !currentData && (
        <BtnBox>
          <DrawBtn id="draw-on">선 조정 on</DrawBtn>
          <DrawBtn id="draw-off" className="hide">
            선 조정 off
          </DrawBtn>
        </BtnBox>
      )}
    </Container>
  );
}

export default CytoscapeMindmap;
