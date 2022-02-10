import React, { useEffect, useRef, useState } from 'react';
import cytoscape from "cytoscape";

import dagre from "cytoscape-dagre";
import coseBilkent from "cytoscape-cose-bilkent";

import cxtmenu from "cytoscape-cxtmenu";
import edgehandles from "cytoscape-edgehandles";
import domNode from "cytoscape-dom-node";

import { useNavigate, useParams } from 'react-router-dom';
import { dbService, firebaseInstance } from '../../fBase';
import { EdgeHandlesOptions } from './EdgeHandlesOptions';
import styled, { css } from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import { MindmapLayout } from './MindmapLayout';

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
  border: 1px solid rgba(0,0,0,0.5);
  border-radius: 10px;
  background-color: white;
  color: var(--main-blue);
  ${defaultBtnAction};
`

const DataContainer = styled.div``;

const CytoscapeMindmap = ({userObj}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [userData, setUserData] = useState('');
    const [snapshot, setSnapshot] = useState('');
    const [dataForRank, setDataForRank] = useState('');
    const [currentData, setCurrentData] = useState('');
    let cyRef = useRef();

    cytoscape.use( dagre );
    cytoscape.use( coseBilkent );
    if (typeof cytoscape("core", "cxtmenu") === "undefined") {
      cxtmenu(cytoscape);
    }
    if (typeof cytoscape("core", "domNode") === "undefined") {
      domNode(cytoscape);
    }
    if (typeof cytoscape("core", "edgehandles") === "undefined") {
      edgehandles(cytoscape);
    }

    const removeTarget = async (ele) => {
      if (window.confirm('정말 삭제하시겠어요?')) {
        if(ele.data().parentId !== 'new') {
          await dbService.collection('targets').doc(`${ele.data().parentId}`).update({
            childs: firebaseInstance.firestore.FieldValue.arrayRemove(`${ele.id()}`)
          })
          .then(async () => {
              await dbService.collection('targets').doc(`${ele.id()}`).delete()
              .then(async () => {
                console.log('delete');
            }).catch((error) => {
              console.log(error.message);
            })
          }).catch(async (error) => {
            await dbService.collection('targets')
            .doc(`${ele.id()}`).delete().then(() => {
              console.log('delete')
            }).catch(error => {
              console.log(error.message);
            })
          })
        } else {
          console.log('delete');
        }
      }
    }

    const complishTarget = async (ele) => {
      await dbService.collection('targets').doc(`${ele.id()}`).update({
        isComplished: true,
      }).then(() => {
        alert('정말 고생 많으셨습니다.')
      }).catch(error => {
        console.log(error.message);
      })
    }

    const unComplishTarget = async (ele) => {
      await dbService.collection('targets').doc(`${ele.id()}`).update({
        isComplished: false,
      }).then(() => {
        alert('다시 화이팅입니다 :)')
      }).catch(error => {
        console.log(error.message);
      })
    }

    const openTarget = async (ele) => {
      await dbService.collection('targets').doc(`${ele.id()}`).update({
        isPrivate: false,
      }).then(() => {
        alert('공개로 설정 되었습니다.')
      }).catch(error => {
        console.log(error.message);
      })
    }

    const privateTarget = async (ele) => {
      await dbService.collection('targets').doc(`${ele.id()}`).update({
        isPrivate: true,
      }).then(() => {
        alert('비공개로 설정 되었습니다.')
      }).catch(error => {
        console.log(error.message);
      })
    }

    const ContextLongtermMenuOptions = {
        menuRadius: function(ele){ return 80; },
        selector: '.longterm', 
        commands: [ 
            {
                fillColor: 'rgba(200, 200, 200, 0.75)', 
                content: '하위 목표 만들기', 
                
                contentStyle: {}, 
                select: function(ele){ 
                  navigate({
                    pathname: `/blueprint/targets/${ele.id()}`,
                  })
                },
                enabled: true,
              },
              {
                fillColor: 'rgba(200, 200, 200, 0.75)',
                content: '루틴 만들기',
                contentStyle: {}, 
                select: function(ele){                    
                    navigate({
                        pathname: `/blueprint/routine/${ele.id()}`,
                    })                
                },
                enabled: true,
              },
              {
                fillColor: 'rgba(200, 200, 200, 0.75)',
                content: '목표를 달성했어요!',
                contentStyle: {}, 
                select: function(ele){
                  complishTarget(ele);
                },
                enabled: true,
              },
              {
                fillColor: 'rgba(200, 200, 200, 0.75)',
                content: '비밀로 할래요',
                contentStyle: {}, 
                select: function(ele){
                  privateTarget(ele);
                },
                enabled: true,
              },
              {
                fillColor: 'rgba(200, 200, 200, 0.75)',
                content: '삭제하기',
                contentStyle: {}, 
                select: function(ele){
                  removeTarget(ele);
                },
                enabled: true,
              }
        ],
        fillColor: 'rgba(0, 0, 0, 0.75)', 
        activeFillColor: 'rgba(1, 105, 217, 0.75)',
        activePadding: 20, 
        indicatorSize: 24, 
        separatorWidth: 3,
        spotlightPadding: 4, 
        adaptativeNodeSpotlightRadius: true, 
        minSpotlightRadius: 24, 
        maxSpotlightRadius: 38, 
        openMenuEvents: 'taphold', 
        itemColor: 'white', 
        itemTextShadowColor: 'transparent', 
        zIndex: 9999, 
        atMouse: false, 
        outsideMenuCancel: 10 
    };

    const ContextShorttermMenuOptions = {
      menuRadius: function(ele){ return 80; },
      selector: '.shortterm', 
      commands: [ 
          {
              fillColor: 'rgba(200, 200, 200, 0.75)', 
              content: '하위 목표 만들기', 
              
              contentStyle: {}, 
              select: function(ele){ 
                navigate({
                  pathname: `/blueprint/targets/${ele.id()}`,
                })
              },
              enabled: true,
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '계획 세우기',
              contentStyle: {}, 
              select: function(ele){
                  navigate({
                      pathname: `/blueprint/plan/${ele.id()}`,
                  })
              },
              enabled: true,
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '루틴 만들기',
              contentStyle: {}, 
              select: function(ele){                    
                  navigate({
                      pathname: `/blueprint/routine/${ele.id()}`,
                  })                
              },
              enabled: true,
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '목표를 달성했어요!',
              contentStyle: {}, 
              select: function(ele){
                complishTarget(ele);
              },
              enabled: true,
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '비밀로 할래요',
              contentStyle: {}, 
              select: function(ele){
                privateTarget(ele);
              },
              enabled: true,
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '삭제하기',
              contentStyle: {}, 
              select: function(ele){
                removeTarget(ele);
              },
              enabled: true,
            }
      ],
      fillColor: 'rgba(0, 0, 0, 0.75)', 
      activeFillColor: 'rgba(1, 105, 217, 0.75)',
      activePadding: 20, 
      indicatorSize: 24, 
      separatorWidth: 3,
      spotlightPadding: 4, 
      adaptativeNodeSpotlightRadius: true, 
      minSpotlightRadius: 24, 
      maxSpotlightRadius: 38, 
      openMenuEvents: 'taphold', 
      itemColor: 'white', 
      itemTextShadowColor: 'transparent', 
      zIndex: 9999, 
      atMouse: false, 
      outsideMenuCancel: 10 
    };

    const ContextPlanMenuOptions = {
        menuRadius: function(ele){ return 80; },
        selector: '.plan', 
        commands: [ 
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '할 일 쓰기',
              contentStyle: {}, 
              select: function(ele){                    
                  navigate({
                      pathname: `/blueprint/todo/${ele.id()}`,
                  })                
              },
              enabled: true,
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '루틴 만들기',
              contentStyle: {}, 
              select: function(ele){                    
                  navigate({
                      pathname: `/blueprint/routine/${ele.id()}`,
                  })                
              },
              enabled: true,
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '계획을 마쳤어요!',
              contentStyle: {}, 
              select: function(ele){
                complishTarget(ele);
              },
              enabled: true,
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '비밀로 할래요',
              contentStyle: {}, 
              select: function(ele){
                privateTarget(ele);
              },
              enabled: true,
            },
            {
              fillColor: 'rgba(200, 200, 200, 0.75)',
              content: '삭제하기',
              contentStyle: {}, 
              select: function(ele){
                removeTarget(ele);
              },
              enabled: true,
            }
      ],
        fillColor: 'rgba(0, 0, 0, 0.75)', 
        activeFillColor: 'rgba(1, 105, 217, 0.75)',
        activePadding: 20, 
        indicatorSize: 24, 
        separatorWidth: 3,
        spotlightPadding: 4, 
        adaptativeNodeSpotlightRadius: true, 
        minSpotlightRadius: 24, 
        maxSpotlightRadius: 38, 
        openMenuEvents: 'taphold', 
        itemColor: 'white', 
        itemTextShadowColor: 'transparent', 
        zIndex: 9999, 
        atMouse: false, 
        outsideMenuCancel: 10 
    };

    const ContextRoutineMenuOptions = {
        menuRadius: function(ele){ return 80; },
        selector: '.routine', 
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
            fillColor: 'rgba(200, 200, 200, 0.75)',
            content: '루틴으로 목표에 도달했어요!',
            contentStyle: {}, 
            select: function(ele){
              complishTarget(ele);
            },
            enabled: true,
          },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)',
            content: '비밀로 할래요',
            contentStyle: {}, 
            select: function(ele){
              privateTarget(ele);
            },
            enabled: true,
          },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)',
            content: '삭제하기',
            contentStyle: {}, 
            select: function(ele){
                removeTarget( ele ) 
            },
            enabled: true,
          }
        ],
        fillColor: 'rgba(0, 0, 0, 0.75)', 
        activeFillColor: 'rgba(1, 105, 217, 0.75)',
        activePadding: 20, 
        indicatorSize: 24, 
        separatorWidth: 3,
        spotlightPadding: 4, 
        adaptativeNodeSpotlightRadius: true, 
        minSpotlightRadius: 24, 
        maxSpotlightRadius: 38, 
        openMenuEvents: 'taphold', 
        itemColor: 'white', 
        itemTextShadowColor: 'transparent', 
        zIndex: 9999, 
        atMouse: false, 
        outsideMenuCancel: 10 
    };

    const ContextTodoMenuOptions = {
      menuRadius: function(ele){ return 80; },
      selector: '.todo', 
      commands: [ 
        {
          fillColor: 'rgba(200, 200, 200, 0.75)',
          content: '할 일을 마쳤어요!',
          contentStyle: {}, 
          select: function(ele){
            complishTarget(ele);
          },
          enabled: true,
        },
        {
          fillColor: 'rgba(200, 200, 200, 0.75)',
          content: '비밀로 할래요',
          contentStyle: {}, 
          select: function(ele){
            privateTarget(ele);
          },
          enabled: true,
        },
        {
          fillColor: 'rgba(200, 200, 200, 0.75)',
          content: '삭제하기',
          contentStyle: {}, 
          select: function(ele){
              removeTarget( ele ) 
          },
          enabled: true,
        }
      ],
      fillColor: 'rgba(0, 0, 0, 0.75)', 
      activeFillColor: 'rgba(1, 105, 217, 0.75)',
      activePadding: 20, 
      indicatorSize: 24, 
      separatorWidth: 3,
      spotlightPadding: 4, 
      adaptativeNodeSpotlightRadius: true, 
      minSpotlightRadius: 24, 
      maxSpotlightRadius: 38, 
      openMenuEvents: 'taphold', 
      itemColor: 'white', 
      itemTextShadowColor: 'transparent', 
      zIndex: 9999, 
      atMouse: false, 
      outsideMenuCancel: 10 
    };

    const ContextPrivateMenuOptions = {
      menuRadius: function(ele){ return 80; },
      selector: '.private', 
      commands: [ 
        {
          fillColor: 'rgba(200, 200, 200, 0.75)',
          content: '다시 공개 할게요',
          contentStyle: {}, 
          select: function(ele){
            openTarget(ele);
          },
          enabled: true,
        },
        {
          fillColor: 'rgba(200, 200, 200, 0.75)',
          content: '삭제하기',
          contentStyle: {}, 
          select: function(ele){
              removeTarget( ele ) 
          },
          enabled: true,
        }
      ],
      fillColor: 'rgba(0, 0, 0, 0.75)', 
      activeFillColor: 'rgba(1, 105, 217, 0.75)',
      activePadding: 20, 
      indicatorSize: 24, 
      separatorWidth: 3,
      spotlightPadding: 4, 
      adaptativeNodeSpotlightRadius: true, 
      minSpotlightRadius: 24, 
      maxSpotlightRadius: 38, 
      openMenuEvents: 'taphold', 
      itemColor: 'white', 
      itemTextShadowColor: 'transparent', 
      zIndex: 9999, 
      atMouse: false, 
      outsideMenuCancel: 10 
    };

    const ContextIncompleteMenuOptions = {
        menuRadius: function(ele){ return 80; },
        selector: '.incomplete', 
        commands: [ 
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', 
            content: '작성 완료하기', 
            
            contentStyle: {}, 
            select: function(ele){ 
              navigate({
                pathname: `/blueprint/incomplete/${ele.id()}`,
              })
            },
            enabled: true,
          },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)',
            content: '도달했어요!',
            contentStyle: {}, 
            select: function(ele){
              complishTarget(ele);
            },
            enabled: true,
          },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', 
            content: '계획으로 만들기', 
            
            contentStyle: {}, 
            select: function(ele){ 
              navigate({
                pathname: `/blueprint/plan/${ele.id()}`,
              })
            },
            enabled: true,
          },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)',
            content: '삭제하기',
            contentStyle: {}, 
            select: function(ele){
                removeTarget( ele ) 
            },
            enabled: true,
          }
        ],
        fillColor: 'rgba(0, 0, 0, 0.75)', 
        activeFillColor: 'rgba(1, 105, 217, 0.75)',
        activePadding: 20, 
        indicatorSize: 24, 
        separatorWidth: 3,
        spotlightPadding: 4, 
        adaptativeNodeSpotlightRadius: true, 
        minSpotlightRadius: 24, 
        maxSpotlightRadius: 38, 
        openMenuEvents: 'taphold', 
        itemColor: 'white', 
        itemTextShadowColor: 'transparent', 
        zIndex: 9999, 
        atMouse: false, 
        outsideMenuCancel: 10 
    };

    const ContextComplishedMenuOptions = {
        menuRadius: function(ele){ return 80; },
        selector: '.isComplished', 
        commands: [ 
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', 
            content: '잘했어오', 
            
            contentStyle: {}, 
            select: function(ele){ 
              alert('어제의 나보다 오늘의 나는 얼마나 성장했을까요?')
            },
            enabled: true,
          },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', 
            content: '미달성으로 되돌릴래요.', 
            contentStyle: {}, 
            select: function(ele){ 
              unComplishTarget(ele);
            },
            enabled: true,
          },
        ],
        fillColor: 'rgba(0, 0, 0, 0.75)', 
        activeFillColor: 'rgba(1, 105, 217, 0.75)',
        activePadding: 20, 
        indicatorSize: 24, 
        separatorWidth: 3,
        spotlightPadding: 4, 
        adaptativeNodeSpotlightRadius: true, 
        minSpotlightRadius: 24, 
        maxSpotlightRadius: 38, 
        openMenuEvents: 'taphold', 
        itemColor: 'white', 
        itemTextShadowColor: 'transparent', 
        zIndex: 9999, 
        atMouse: false, 
        outsideMenuCancel: 10 
    };

    const ContextEdgeMenuOptions = {
        menuRadius: function(ele){ return 100; },
        selector: 'edge', 
        commands: [ 
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', 
            content: '선 지우기', 
            contentStyle: {}, 
            select: async function(ele){
                console.log(ele.data()) 
                await dbService.collection("targets")
                .doc(`${ele.data().source}`)
                .update({
                    childs: firebaseInstance.firestore.FieldValue.arrayRemove(ele.data().target)
                    }).then(() => {
                        console.log("success");
                    }).catch((error) => {
                        console.log(error.message);
                    }
                )
              ele.remove();
            },
            enabled: true,
          },
        ],
        fillColor: 'rgba(0, 0, 0, 0.75)', 
        activeFillColor: 'rgba(1, 105, 217, 0.75)',
        activePadding: 20, 
        indicatorSize: 24, 
        separatorWidth: 3,
        spotlightPadding: 4, 
        adaptativeNodeSpotlightRadius: true, 
        minSpotlightRadius: 24, 
        maxSpotlightRadius: 38, 
        openMenuEvents: 'taphold', 
        itemColor: 'white', 
        itemTextShadowColor: 'transparent', 
        zIndex: 9999, 
        atMouse: false, 
        outsideMenuCancel: 10 
    };

    const ContextCoreMenuOptions = {
        menuRadius: function(ele){ return 100; },
        selector: 'core', 
        commands: [ 
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', 
            content: '새 목표 만들기', 
            contentStyle: {}, 
            select: function(ele){ 
                navigate({
                    pathname: `/blueprint/targets`,
                  })
            },
            enabled: true,
          },
        ],
        fillColor: 'rgba(0, 0, 0, 0.75)', 
        activeFillColor: 'rgba(1, 105, 217, 0.75)',
        activePadding: 20, 
        indicatorSize: 24, 
        separatorWidth: 3,
        spotlightPadding: 4, 
        adaptativeNodeSpotlightRadius: true, 
        minSpotlightRadius: 24, 
        maxSpotlightRadius: 38, 
        openMenuEvents: 'taphold', 
        itemColor: 'white', 
        itemTextShadowColor: 'transparent', 
        zIndex: 9999, 
        atMouse: false, 
        outsideMenuCancel: 10 
    };

    const getDataForRank = (snapshot) => {
      let node = [];
      let edge = [];
      snapshot.forEach(el => {

        const nodeData = {
          "data": {
            "id" : `${el.id}`,
            "parentId" : `${el.parentId}`,
            // "label" : `${el.name}`,
            "type" : `${el.type}`,
            "explain" : `${el.explain}`,
            "deadline" : new Date(el.deadline.seconds * 1000),
            "isComplete" : el.isComplete,
            "isComplished" : el.isComplished,
            "isPrivate" : el.isPrivate,
          },
        }
        node.push(nodeData);

        el.childs.forEach(child => {
          const originEdge = { 
            "data" : {
              "id" : `${el.id}->${child}`,
              "source" : `${child}`,
              "target" : `${el.id}`
            }
          }
          edge.push(originEdge);
        })
      })

      setDataForRank([...node, ...edge]);
    }

    const getSnapshot = async () => {
      await dbService.collection('targets').where('uid', '==', `${id ? id : userObj.uid}`).get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        getDataForRank(data);
        setSnapshot(data);
      })
    }

    const userSnapshot = () => {
      dbService.collection('targets').where('uid', '==', `${id ? id : userObj.uid}`).onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        getDataForRank(data);
        setSnapshot(data);
      })
    }

    const getUserData = async (id) => {
      await dbService.collection('users').doc(`${id}`)
      .get()
      .then(snapshot => {
        const user = snapshot.data();
        setUserData(user);
      }).catch(error => {
        console.log(error.message);
      })
    }


    const fillCy = async () => {

        let pageRank = {rank: () => {return 0.0001;}};
        if(dataForRank.length) {
          const cy_for_rank = cytoscape({
            elements: dataForRank,
          })
          pageRank = cy_for_rank.elements().pageRank();
        }


        // 함수 변수 선언

        // edge, arrow
        const edgeWidth = '2px';
        const edgeActiveWidth = '4px';
        const arrowScale = 0.8;
        const arrowActiveScale = 1.2;

        // 색상 
        const dimColor = '#dfe4ea';
        const edgeColor = '#ced6e0';
        const nodeTextColor = 'black';
        const nodeColor = 'white';
        const nodeActiveColor = '#ffa502';
 
        // on focus edge color
        const successorColor = '#ff6348';
        const predecessorsColor = '#1e90ff';

        // 노드 크기
        const nodeMaxSize = 100;
        const nodeMinSize = 20;
        const nodeActiveSize = 70;

        // 폰트 크기
        const fontMaxSize = 20;
        const fontMinSize = 10;
        const fontActiveSize = 16;

        const cyStyle = [ // the stylesheet for the graph
          {
            selector: 'node',
            "style" :{
              'color': nodeTextColor,
              'background-color': nodeColor,
              'text-halign': 'center',
              'font-family': 'SsurroundAir',
              'border-width': '1px',
              'border-style': 'solid',
              'label': 'data(label)',
              // 'font-size': (ele) => {        
              //   const fontSize = `${fontMaxSize * pageRank.rank('#' + ele.id()) + fontMinSize}px`;
              //   return fontSize;
              // },
            }
          },

          {
              selector: 'edge',
              "style": {
                'width': edgeWidth,
                'curve-style': 'taxi',
                'taxi-direction': 'downward',
                'line-color': '#ccc',
                'source-arrow-color': '#ccc',
                'source-arrow-shape': 'vee'
              }
          },
      
          // node types
          {
              selector: '.longterm',
              style: {
                  'border-color': 'yellow',
                  // 'label': 'data(label)'
              }
          },
          {
              selector: '.shortterm',
              style: {
                  'border-color': 'blue',
                  'shape': 'round-octagon'
                  // 'label': 'data(label)'
              }
          },
          {
              selector: '.plan',
              style: {
                  'border-color': 'skyblue',
                  'shape': 'round-hexagon'
                  // 'label': 'data(label)'
              }
          },
          {
              selector: '.routine',
              style: {
                  'border-color': 'purple',
                  'shape': 'round-diamond'
                  // 'label': 'data(label)'
              }
          },
          {
            selector: '.todo',
            style: {
                'font-family': 'SsurroundAir',
                'border-color': 'red',
                'shape': 'round-rectangle',
                'label': 'data(label)'
            }
        },
          {
              selector: '.incomplete',
              style: {
                  'border-color': 'green',
                  'shape': 'round-tag',
                  // 'label': 'data(label)'
              }
          },
          {
            selector: '.isPrivate',
            style: {
                'font-family': 'SsurroundAir',
                'border-color': 'black',
                'shape': 'round-rectangle',
                // 'label': '(비공개)'
            }
        },
        {
          selector: '.isComplished',
          style: {
              'font-family': 'SsurroundAir',
              'border-color': 'lightgreen',
              'background-color': 'lightgreen',
              // 'label': '(비공개)'
          }
      },
      
          // edgehandles
          {
              selector: '.eh-handle',
              style: {
                'background-color': 'red',
                'width': 12,
                'height': 12,
                'shape': 'ellipse',
                'overlay-opacity': 0,
                'border-width': 12, // makes the handle easier to hit
                'border-opacity': 0
              }
            },
      
            {
              selector: '.eh-hover',
              style: {
                'background-color': 'red'
              }
            },
      
            {
              selector: '.eh-source',
              style: {
                'border-width': 2,
                'border-color': 'red'
              }
            },
      
            {
              selector: '.eh-target',
              style: {
                'border-width': 2,
                'border-color': 'red'
              }
            },
      
            {
              selector: '.eh-preview, .eh-ghost-edge',
              style: {
                'background-color': 'red',
                'line-color': 'red',
                'target-arrow-color': 'red',
                'source-arrow-color': 'red'
              }
            },
            {
              selector: '.eh-ghost-edge.eh-preview-active',
              style: {
                'opacity': 0
              }
            }
        ]

        const cy = cytoscape({
            container: document.getElementById('cy'),
            elements: [],
            style: cyStyle,
            layout: {},
            wheelSensitivity: 0.2
        });

        // node 그리기
        cy.domNode();

        if(snapshot.length !== 0) {
          snapshot.forEach(targetData => {
            makeNode(targetData);
          })
  
          snapshot.forEach(targetData => {
            makeEdge(targetData);
          })
        } else {
          let initNode;

          if (id) {                
            await dbService.collection("users").doc(`${id}`).get().then(snapshot => {
              const user = snapshot.data();
                initNode = {
                  "data": {
                      "id" : "a",
                      "label" : `${user.displayName}님은 아직 청사진을 그리지 않으셨어요.`
                  }
                }
              }).catch(error => {
                console.log(error.message)
              })
            } else {
              let label = "배경을 길게 터치해보세요.";
              initNode = {
                "data": {
                  "id" : "a",
                  "label" : label,
                }
              }

              if (userObj.isVisitor) {
                const loginBtn = document.createElement('div');
                loginBtn.innerHTML = '로그인하러가기';
                loginBtn.style.width = 'max-content';
                loginBtn.style.padding = '10px 15px';
                loginBtn.style.backgroundColor = 'white';
                loginBtn.style.border = '3px solid rgba(0, 0, 0, 0.5)';
                loginBtn.style.borderRadius = '10px';
                loginBtn.style.fontFamily = 'SsurroundAir';
                loginBtn.style.fontSize = '12px';
                loginBtn.addEventListener('click', () => {navigate('/signout')});
                loginBtn.addEventListener('mouseover', () => {loginBtn.style.cursor = 'pointer'});
                
                label = "청사진을 그리려면 로그인 해주세요.";
                initNode = {
                  "data": {
                      "id" : "a",
                      "label" : label,
                      'dom': loginBtn,
                  }
                }
              }
            }
          cy.add(initNode);
        }

        cy.nodes().forEach(node => {
          if(node.data().isPrivate && id) {
            node.addClass('isPrivate') 
          } else if (node.data().isComplished) {
              node.addClass('isComplished');
          } else {
            if(node.data().type === "longterm") {
              node.addClass('longterm');
            }
            if(node.data().type === 'shortterm') {
                node.addClass('shortterm');
            }
            if(node.data().type === 'plan') {
                node.addClass('plan');
            }
            if(node.data().type === 'routine') {
                node.addClass('routine');
            }
            if(node.data().type === 'todo') {
                node.addClass('todo');
            }
            if(node.data().type === 'incomplete') {
                node.addClass('incomplete');
            }
          }
        })

        cy.on('tap', function(e) {
          setResetFocus(e.cy);

          setCurrentData(e.target.data());

          if(e.target.isNode) console.log(e.target.data());

          e.target.isNode && e.target.isNode() && setDimStyle(cy, {
            'background-color' : dimColor,
            'line-color'  : dimColor,
            'source-arrow-color' : dimColor,
            'color' : dimColor,
          })
          
          e.target.isNode && e.target.isNode() && setFocus(e.target, successorColor, predecessorsColor, edgeActiveWidth, arrowActiveScale);
        })

        // 레이아웃 런
        const layout = cy.layout(MindmapLayout);
        layout.run();

        // 화면 크기별 맞춤
        let resizeTimer;

        window.addEventListener('resize', function () {
            this.clearTimeout(resizeTimer);
            resizeTimer = this.setTimeout(function(){
                cy.fit();
                cy.center();
            },200);
        });

        setTimeout(() => {
          cy.fit();
          cy.center();
        }, [])


        // 내 마인드맵 일 때 메뉴 추가
        if (!id) {
            setUserData(userObj);
            const longtermMenu = cy.cxtmenu( ContextLongtermMenuOptions );
            const shorttermMenu = cy.cxtmenu( ContextShorttermMenuOptions );
            const planMenu = cy.cxtmenu( ContextPlanMenuOptions );
            const routineMenu = cy.cxtmenu( ContextRoutineMenuOptions );
            const todoMenu = cy.cxtmenu( ContextTodoMenuOptions );
            const complishedMenu = cy.cxtmenu( ContextComplishedMenuOptions );
            const incompleteMenu = cy.cxtmenu( ContextIncompleteMenuOptions );
            const edgeMenu = cy.cxtmenu( ContextEdgeMenuOptions );
            const coreMenu = cy.cxtmenu( ContextCoreMenuOptions );

            const eh = cy.edgehandles( EdgeHandlesOptions );

            const drawOn = document.querySelector('#draw-on');
            drawOn.addEventListener('click', function() {
                eh.enableDrawMode();
                drawOn.classList.add('hide');
                drawOff.classList.remove('hide');
            });

            const drawOff = document.querySelector('#draw-off');
            drawOff.addEventListener('click', function() {
                eh.disableDrawMode();
                drawOff.classList.add('hide');
                drawOn.classList.remove('hide');
            });

            cy.on('ehcomplete', async (event, sourceNode, targetNode, addedEdge) => {
                await dbService.collection("targets")
                .doc(`${targetNode.id()}`)
                .update({
                    parentId: firebaseInstance.firestore.FieldValue.arrayUnion(targetNode.id())
                }).then(async () => {
                    await dbService.collection('targets')
                    .doc(`${sourceNode.id()}`)
                    .update({
                        childs: firebaseInstance.firestore.FieldValue.arrayUnion(sourceNode.id())
                    }).then(() => {
                        console.log('success');
                    }).catch(error => {
                        console.log(error.message);
                    })
                }).catch((error) => {
                console.log(error.message);
                })
            })
        }
//


        // 노드 만들기
        function makeNode(targetData) {
          const nodeSize = `${nodeMaxSize * pageRank.rank('#' + targetData.id) + nodeMinSize}px`;

          // 변수 선언
          const container = document.createElement('div');
          const title = document.createElement('h1');
          const hr = document.createElement('hr');

          // 시간 문자열 만들기
          let deadlineTime = ''
          if (targetData.deadline) {
            const Time = new Date(targetData.deadline.seconds * 1000);
            const Year = Time.getFullYear();
            const Month = Time.getMonth() + 1;
            const DateTime = Time.getDate();
            const remainTime = Time - Date.now();
            deadlineTime = `${Year}-${Month > 9 ? Month : '0' + Month}-${DateTime > 9 ? DateTime : '0' + DateTime}`;
          }

          // 컨테이너 스타일링
          container.style.userSelect = 'none';
          container.style.width = nodeSize;
          container.style.height = nodeSize;

          container.style.fontFamily = 'SsurroundAir'
          container.style.textAlign = 'center';
          container.style.wordBreak = 'keep-all';

          targetData.parentId.forEach((parentId, index) => {
            let filtered = parentId;
            if (targetData.type === 'shortterm' || targetData.type === 'longterm') {
              filtered = '';
            }
 
            const node = {
              "data": {
                "id" : `${index === 0 ? targetData.id : targetData.id + '_' + index}`,
                "parent" : `${filtered}`,
                "parentId" : `${targetData.parentId}`,
                "label" : `${id && targetData.isPrivate ? '( 비공개 )' : targetData.name}`,
                "type" : `${targetData.type}`,
                "explain" : `${targetData.explain}`,
                "deadline" : new Date(targetData.deadline.seconds * 1000),
                "isComplete" : targetData.isComplete,
                "isComplished" : targetData.isComplished,
                "isPrivate" : targetData.isPrivate,
                'dom': container,
              },
            } 
  
            cy.add(node)
          })

        }
        
        // 선 만들기
        function makeEdge(targetData) {
          const dataArr = targetData.childs.map(child => {
            const childData = {
                "data": {
                    "id" : `${targetData.id}->${child}`,
                    "source" : `${targetData.id}`,
                    "target" : `${child}`
                }
            }   
            return childData;
          })
        
          for(let i = 0; i < dataArr.length; i++) {
            try {
              cy.add(dataArr[i]);
            } catch (error) {
              console.log(error);
            }
              
          }
        }

        // 선택되지 않은 노드들 흐리게 하기
        function setDimStyle(target_cy, style) {
          target_cy.nodes().forEach(function (target) {
            target.style(style);
          });
          target_cy.edges().forEach(function (target) {
            target.style(style);
          })
        }

        function setFocus(target_element, successorColor, predecessorsColor, edgeWidth, arrowScale) {
          target_element.style('background-color', nodeActiveColor);
          target_element.style('color', nodeTextColor);

          target_element.predecessors().each(function (e) {
            if (e.isEdge()) {
              e.style('width', edgeWidth);
              e.style('arrow-scale', arrowScale);
            }
            e.style('color', nodeTextColor);
            e.style('background-color', predecessorsColor);
            e.style('line-color', predecessorsColor);
            e.style('source-arrow-color', predecessorsColor);
            setOpacityElement(e, 0.5);
          })

          target_element.successors().each(function (e) {
            if (e.isEdge()) {
              e.style('width', edgeWidth);
              e.style('arrow-scale', arrowScale);
            }
            e.style('color', nodeTextColor);
            e.style('background-color', successorColor);
            e.style('line-color', successorColor);
            e.style('source-arrow-color', successorColor);
            setOpacityElement(e, 0.5);
          });

          target_element.neighborhood().each(function (e) {
            setOpacityElement(e, 1);
          })

          target_element.style('width', Math.max(parseFloat(target_element.style('width')), nodeActiveSize));
          target_element.style('height', Math.max(parseFloat(target_element.style('height')), nodeActiveSize));
          target_element.style('font-size', Math.max(parseFloat(target_element.style('font-size')), fontActiveSize));
        }

        function setOpacityElement(target_element, degree) {
          target_element.style('opacity', degree);
        }

        function setResetFocus(target_cy) {

          target_cy.nodes().forEach(function (target) {
              target.style('background-color', nodeColor);
              var rank = pageRank.rank(target);
              target.style('width', nodeMaxSize * rank + nodeMinSize);
              target.style('height', nodeMaxSize * rank + nodeMinSize);
              target.style('font-size', fontMaxSize * rank + fontMinSize);
              target.style('color', nodeTextColor);
              target.style('opacity', 1);
          });

          target_cy.edges().forEach(function (target) {
              target.style('line-color', edgeColor);
              target.style('source-arrow-color', edgeColor);
              target.style('width', edgeWidth);
              target.style('arrow-scale', arrowScale);
              target.style('opacity', 1);
          });
        }
    }
    
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
    }, [snapshot])

    return (   
        <Container>
            <Title>
              {userData.displayName}님의 <Bold>청사진</Bold>  
            </Title>
            <MindmapContainer id="cy" style={{width: '100%', height: '90vh', top: '5vh', padding: '15px'}}>
            </MindmapContainer>
            {!id && <BtnBox>
              <DrawBtn id="draw-on">
                  선 조정 on
              </DrawBtn>
              <DrawBtn id="draw-off" className='hide'>
                  선 조정 off
              </DrawBtn>
            </BtnBox>}
            {currentData && 
              <DataContainer>
                {currentData.label}
              </DataContainer>
            }
        </Container>
    );
};

export default CytoscapeMindmap;