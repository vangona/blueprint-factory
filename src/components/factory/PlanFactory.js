import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import { dbService, firebaseInstance } from '../../fBase';
import { v4 as uuidv4 } from "uuid";
import PlanParent from './plan/PlanParent';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import { RiArrowGoBackLine } from 'react-icons/ri';
import ShorttermBackground from './shortterm/ShorttermBackground';
import PlanName from './plan/PlanName';
import PlanStep from './plan/PlanStep';
import PlanDeadline from './plan/PlanDeadline';
import PlanNeed from './plan/PlanNeed';
import PlanCheck from './plan/PlanCheck';

const Container = styled.div`
    ${defaultContainer}
`;

const ReturnBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 999;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;
    font-size: 30px;
    transform: scaleY(-1);
    :hover {
        cursor: pointer;
    }
    :active {
        transform: scaleY(-1) scale(0.98);
    }
`;

const PageBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 50;
    background-color: #3F5DAC;
    border: none;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    font-size: 30px;
    ${defaultBtnAction};
`;

const SubmitBtn = styled.input`
    display: flex;
    font-family: SSurroundAir;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 20px;
    z-index: 50;
    background-color: #3F5DAC;
    border: none;
    border-radius: 20px;
    width: auto;
    padding: 10px 15px;
    color: white;
    box-sizing: border-box;
    font-size: 20px;
    ${defaultBtnAction};
`;

const PlanFactory = ({userObj, parent}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [page, setPage] = useState(1);
    const { handleSubmit } = useForm();
    const [name, setName] = useState(`${parent.name}(을)를 위한 계획`);
    const [desire, setDesire] = useState(`${parent.name}을 위해`);
    const [explain, setExplain] = useState('');
    const [explainArr, setExplainArr] = useState([]);
    const [deadline, setDeadline] = useState('');
    const [deadlineArr, setDeadlineArr] = useState([]);
    const [deadlineState, setDeadlineState] = useState(false);
    const [prize, setPrize] = useState(''); 
    const [need, setNeed] = useState('');
    const [needArr, setNeedArr] = useState([]);
    const [isInComplete, setIsInComplete] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);

    const onSubmit = async (e) => {
        const targetId = uuidv4();
        const childIds = [];
        const stepIds = [];

        needArr.forEach(async (need) => {
            const childId = uuidv4();
            childIds.push(childId);
            await makeChild(need, childId, isInComplete ? parent.id : targetId);
        })

        explainArr.forEach(async (step, index) => {
            const stepId = uuidv4();
            stepIds.push(stepId);
            await makeStep(step, stepId, isInComplete ? parent.id : targetId, index);
        })
        
        if (isInComplete) {
            await dbService.collection('targets').doc(parent.id).update({
                id: parent.id,
                uid: userObj.uid,
                name,
                desire,
                explain : explainArr,
                deadline : new Date(deadlineArr[deadlineArr.length - 1]),
                prize,
                needArr,
                createdAt: Date.now(),
                modifiedAt: 0,
                isComplete: true,
                isComplished: false,
                isOpen: true,
                isPrivate,
                type: "plan",
                parentId: [parent.parentId[0]],
                childs: stepIds,
                completeFeeling: '',
                cancelReason: '',
            }).then(async () => {
                alert('뜬구름이 조금 더 명확해졌어요!');
                navigate("/")        
            }).catch(error => {
                console.log(error.message);
            })
        } else {
            await dbService.collection('targets').doc(targetId).set({
                id: targetId,
                uid: userObj.uid,
                name,
                desire,
                explain : explainArr,
                deadline : new Date(deadlineArr[deadlineArr.length - 1]),
                prize,
                needArr,
                createdAt: Date.now(),
                modifiedAt: 0,
                isComplete: true,
                isComplished: false,
                isOpen: true,
                isPrivate,
                type: "plan",
                parentId: [parent.id],
                childs: stepIds,
                completeFeeling: '',
                cancelReason: '',
            }).then(async () => {
                await dbService.collection('targets')
                .doc(`${parent.id}`)
                .update({
                    childs: firebaseInstance.firestore.FieldValue.arrayUnion(targetId)
                }).then(() => {
                    console.log('success')
                    alert('뜬구름이 조금 더 명확해졌어요!');
                    navigate("/")        
                }).catch(error => {
                    console.log(error.message);
                })
            }).catch(error => {
                console.log(error.message);
            })
        }
    }

    const makeStep = async (step, childId, parentId, index) => {
        await dbService.collection('targets').doc(childId).set({
            id: childId,
            uid: userObj.uid,
            name: step,
            desire: '',
            explain: '',
            deadline : new Date(deadlineArr[index]),
            prize: '',
            needArr : [],
            createdAt: Date.now(),
            modifiedAt: 0,
            isComplete: true,
            isComplished: false,
            isOpen: true,
            isPrivate,
            type: "shortterm",
            parentId: [parentId],
            childs: [],
            completeFeeling: '',
            cancelReason: '',
        })
    }

    const makeChild = async (need, childId, targetId) => {
        await dbService.collection('targets').doc(childId).set({
            id : childId,
            uid: userObj.uid,
            name : need,
            desire : '',
            explain : '',
            deadline : '',
            prize : '',
            needArr : [],
            createdAt: Date.now(),
            modifiedAt: 0,
            isComplete: false,
            isComplished: false,
            isOpen: true,
            isPrivate,
            type: "incomplete",
            parentId : [targetId],
            childs: [],
            completeFeeling: '',
            cancelReason: '',
        })            
    }

    const onChange = (e) => {
        const inputName = e.target.id;
        if (inputName === 'targetName') {
            setName(e.target.value);
        }
        if (inputName === 'targetDesire') {
            setDesire(e.target.value);
        }
        if (inputName === 'targetExplain') {
            setExplain(e.target.value);
        }
        if (inputName === 'targetPrize') {
            setPrize(e.target.value);
        }
        if (inputName === 'targetNeed') {
            setNeed(e.target.value);
        }
    }

    const onClickPlus = e => {
        e.preventDefault();
        if (need !== '') {
            let needArray = [...needArr];
            needArray.push(need);
            setNeed('');
            setNeedArr(needArray);
        }
    }

    const onClickStep = e => {
        e.preventDefault();
        if (explain !== '') {
            let explainArray = [...explainArr];
            explainArray.push(explain);
            setExplain('');
            setExplainArr(explainArray);
        }        
    }

    const onClickDeleteStep = e => {
        e.preventDefault();
        const clickedIndex = e.target.parentNode.id;
        const filtered = explainArr.filter((el, index) => index !== parseInt(clickedIndex));
        const filteredDeadlineArr = deadlineArr.filter((el, index) => index !== parseInt(clickedIndex));
        setExplainArr(filtered);
        setDeadlineArr(filteredDeadlineArr);
    }

    const onClickDeleteNeed = e => {
        e.preventDefault();
        const clickedIndex = e.target.parentNode.id;
        const filtered = needArr.filter((el, index) => index !== parseInt(clickedIndex));
        setNeedArr(filtered);
    }

    const onClickReturn = e => {
        e.preventDefault();
        navigate("/")
    }

    const onClickPrev = e => {
        e.preventDefault();
        setPage(page - 1);
    }

    const onClickNext = e => {
        e.preventDefault();
        setPage(page + 1);
    }

    const getName = value => {
        setName(value);
    }

    const getStep = value => {
        setExplain(value);
    }

    const getDeadlineArr = (value, index) => {
        let arr = deadlineArr;
        arr[index] = value;
        setDeadlineArr(arr);
        setDeadline(arr[arr.length - 1]);
        if(arr.length === explainArr.length) {
            setDeadlineState(true);
        }
    }

    const getNeed = value => {
        setNeed(value);
    }

    const getIsPrivate = value => {
        setIsPrivate(value);
    }

    useEffect(() => {
        if(parent.type === 'incomplete') {
            setIsInComplete(true);
            setName(parent.name);
        }
    }, [])

    return (
        <Container>
            {page === 1 && <PlanParent userObj={userObj} parent={parent} />}
            {page > 1 && <ShorttermBackground userObj={userObj} parent={parent} />}
            {page === 2 && <PlanName name={name} getName={getName} />}
            {page === 3 && <PlanStep getStep={getStep} step={explain} stepArr={explainArr} onClickStep={onClickStep} onClickDelete={onClickDeleteStep} target={name} />}
            {page === 4 && <PlanDeadline getDeadlineArr={getDeadlineArr} deadlineArr={deadlineArr} deadlineState={deadlineState} explainArr={explainArr} target={name} /> }
            {page === 5 && <PlanNeed getNeed={getNeed} need={need} needArr={needArr} onClickPlus={onClickPlus} onClickDelete={onClickDeleteNeed} target={name} /> }
            {page === 6 && 
                <PlanCheck explainArr={explainArr} needArr={needArr} deadlineArr={deadlineArr} target={name} isPrivate={isPrivate} getIsPrivate={getIsPrivate} />            
            }



            <ReturnBtn onClick={onClickReturn} >
                <RiArrowGoBackLine />
            </ReturnBtn>
            {page !== 1 && <PageBtn onClick={onClickPrev} style={{left: "20px"}}>
                <IoMdArrowRoundBack style={{fill: "white"}} />
            </PageBtn>}
            <PageBtn onClick={onClickNext}>
                <IoMdArrowRoundForward style={{fill: "white"}} />
            </PageBtn>
            {page === 6 && 
                <SubmitBtn type="submit" onClick={() => {
                    window.confirm("제출할까요?") &&
                    onSubmit();
                }
                } value="제출하기" />
            }
        </Container>
    );
};

export default PlanFactory;