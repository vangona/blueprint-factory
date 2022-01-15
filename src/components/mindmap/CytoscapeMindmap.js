import React, { useEffect, useRef, useState } from 'react';
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import cxtmenu from "cytoscape-cxtmenu";
import edgehandles from "cytoscape-edgehandles";
import domNode from "cytoscape-dom-node";
import { useNavigate, useParams } from 'react-router-dom';
import { dbService, firebaseInstance } from '../../fBase';
import { EdgeHandlesOptions } from './EdgeHandlesOptions';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';
import { MindmapStyle } from './MindmapStyle';
import { MindmapLayout } from './MindmapLayout';

const Container = styled.div`
    ${defaultContainer};
`;

const MindmapContainer = styled.div``;

const DrawBtn = styled.button``

const CytoscapeMindmap = ({userObj}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [snapshot, setSnapshot] = useState([]);
    const [data, setData] = useState('');
    let cyRef = useRef();

    cytoscape.use(dagre);
    cytoscape.use(cxtmenu);
    cytoscape.use(domNode);
    if (typeof cytoscape("core", "edgehandles") === "undefined") {
        edgehandles(cytoscape);
    }

    const removeTarget = async (ele) => {
        await dbService.collection('targets').doc(`${ele.id()}`).delete()
        .then(async () => {
            if(ele.data().parentId !== 'new') {
                await dbService.collection('targets').doc(`${ele.data().parentId}`).update({
                    childs: firebaseInstance.firestore.FieldValue.arrayRemove(ele.id())
                })
                .then(async () => {
                    if (ele.data().type === 'plan') {
                        await dbService.collection('steps').where('parentId', '==', ele.id())
                        .get().then((snapshot) => {
                            snapshot.docs.forEach(async (doc) => {
                                await dbService.collection('steps').doc(`${doc.data().id}`).delete();
                            })
                            console.log('delete');
                        }).catch(error => {
                            console.log(error);
                        })
                    } else {
                        console.log('delete');
                    }
                }).catch(error => {
                    console.log(error.message);
                })
            } else {
                console.log('delete');
            }
        }).catch(error => {
            console.log(error.message)
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
        openMenuEvents: 'cxttapstart taphold', 
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
              console.log( ele.id() ) 
            },
            enabled: true,
          },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)',
            content: '루틴 만들기',
            contentStyle: {}, 
            select: function(ele){
              console.log( ele.id() ) 
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
        openMenuEvents: 'cxttapstart taphold', 
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
            content: '루틴 만들기', 
            
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
        openMenuEvents: 'cxttapstart taphold', 
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
          {
            fillColor: 'rgba(200, 200, 200, 0.75)', 
            content: '루틴 수정하기', 
            
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
        openMenuEvents: 'cxttapstart taphold', 
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
                pathname: `/blueprint/targets/${ele.id()}`,
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
        openMenuEvents: 'cxttapstart taphold', 
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
              navigate({
                pathname: `/blueprint/targets/${ele.id()}`,
              })
            },
            enabled: true,
          },
          {
            fillColor: 'rgba(200, 200, 200, 0.75)',
            content: 'a command name',
            contentStyle: {}, 
            select: function(ele){
              console.log( ele.id() ) 
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
        openMenuEvents: 'cxttapstart taphold', 
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
            content: 'remove', 
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
        openMenuEvents: 'cxttapstart taphold', 
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
        openMenuEvents: 'cxttapstart taphold', 
        itemColor: 'white', 
        itemTextShadowColor: 'transparent', 
        zIndex: 9999, 
        atMouse: false, 
        outsideMenuCancel: 10 
    };

    const getSnapshot = () => {
      dbService.collection('targets').where('uid', '==', `${id ? id : userObj.uid}`).onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setSnapshot(data);
      })
    }

    const getData = async () => { 
        dbService.collection('targets').where('uid', '==', `${id ? id : userObj.uid}`).onSnapshot(async (querySnapshot) => {
            if (querySnapshot.docs.length) {
                const nodeArr = querySnapshot.docs.map((doc) => {
                    const target = {
                        id: doc.id,
                        ...doc.data(),
                    }
                    return ({
                        "data": {
                            "id" : `${target.id}`,
                            "parentId" : `${target.parentId}`,
                            "label" : `${target.name}`,
                            "type" : `${target.type}`,
                            "explain" : `${target.explain}`,
                            "deadline" : new Date(target.deadline.seconds * 1000),
                            "isComplete" : target.isComplete,
                            "isComplished" : target.isComplished,
                        },
                    })
                });
                let edgeArr = [];
                querySnapshot.docs.forEach((doc) => {
                    const target = {
                        id: doc.id,
                        ...doc.data(),
                    }
                    const dataArr = target.childs.map(child => {
                        const childData = {
                            "data": {
                                "id" : `${target.id}->${child}`,
                                "source" : `${target.id}`,
                                "target" : `${child}`
                            }
                        }   
                        return childData;
                    })
                    
                    for(let i = 0; i < dataArr.length; i++) {
                        edgeArr.push(dataArr[i]);
                    }
                });
                setData([...nodeArr, ...edgeArr]);
                setIsLoading(false);
            } else {
                await dbService.collection("users").doc(`${id ? id : userObj.uid}`).get().then(snapshot => {
                    const userData = snapshot.data();
                    let initNode
                    if (id) {
                        initNode = {
                            "data": {
                                "id" : "a",
                                "label" : `${userData.displayName}님은 아직 청사진을 그리지 않으셨어요.`
                            }
                        }    
                    } else {
                        initNode = {
                            "data": {
                                "id" : "a",
                                "label" : "새로운 목표를 만들어 봅시다."
                            }
                        }
                    }
                    setData([initNode]);        
                    setIsLoading(false);
                })
            }
        })
    };

    const fillCy = () => {

        const cy = cytoscape({
            container: document.getElementById('cy'),
            elements: data,
            style: MindmapStyle,
            layout: MindmapLayout,
            wheelSensitivity: 0.2
        });

        cy.nodes().forEach(node => {
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
          if(node.data().type === 'incomplete') {
              node.addClass('incomplete');
          }
          if(node.data().isComplished) {
              node.addClass('isComplished');
          }
          node.data();
        })

        if (!id) {
            const longtermMenu = cy.cxtmenu( ContextLongtermMenuOptions );
            const shorttermMenu = cy.cxtmenu( ContextShorttermMenuOptions );
            const planMenu = cy.cxtmenu( ContextPlanMenuOptions );
            const routineMenu = cy.cxtmenu( ContextRoutineMenuOptions );
            const complishedMenu = cy.cxtmenu( ContextComplishedMenuOptions );
            const incompleteMenu = cy.cxtmenu( ContextIncompleteMenuOptions );
            const edgeMenu = cy.cxtmenu( ContextEdgeMenuOptions );
            const coreMenu = cy.cxtmenu( ContextCoreMenuOptions );
        
            const eh = cy.edgehandles( EdgeHandlesOptions );

            document.querySelector('#draw-on').addEventListener('click', function() {
                eh.enableDrawMode();
            });

            document.querySelector('#draw-off').addEventListener('click', function() {
                eh.disableDrawMode();
            });

            cy.on('ehcomplete', async (event, sourceNode, targetNode, addedEdge) => {
                await dbService.collection("targets")
                .doc(`${targetNode.id()}`)
                .update({
                    parentId: firebaseInstance.firestore.FieldValue.arrayUnion(sourceNode.id())
                }).then(async () => {
                    await dbService.collection('targets')
                    .doc(`${sourceNode.id()}`)
                    .update({
                        childs: firebaseInstance.firestore.FieldValue.arrayUnion(targetNode.id())
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
    }
    
    useEffect(() => {
        if (!data) {
            getSnapshot();
            getData();
        } else {
            fillCy();
        }
    }, [data])

    return (   
        <Container>
            <MindmapContainer id="cy" style={{width: '100%', height: '95vh'}}>
            </MindmapContainer>
            <DrawBtn id="draw-on">
                그리기
            </DrawBtn>
            <DrawBtn id="draw-off">
                안그리기
            </DrawBtn>
        </Container>
    );
};

export default CytoscapeMindmap;