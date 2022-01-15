import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import { dbService, firebaseInstance } from '../../fBase';
import { v4 as uuidv4 } from "uuid";
import BackgroundTopCloud from '../background/BackgroundTopCloud';
import LongtermParent from './longterm/LongtermParent';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import LongtermName from './longterm/LongtermName';
import BackgroundBottomCloud from '../background/BackgroundBottomCloud';
import LongtermDesire from './longterm/LongtermDesire';
import LongtermNeed from './longterm/LongtermNeed';
import LongtermDeadline from './longterm/LongtermDeadline';
import LongtermCheck from './longterm/LongtermCheck';

const Container = styled.div`
    ${defaultContainer}
`;

const TargetTitle = styled.h1``;

const TargetForm = styled.form``;

const TargetBox = styled.div``;

const TargetLabel = styled.label``;

const TargetInput = styled.input``;

const TargetBtn = styled.button``;

const NeedBox = styled.div``;

const ReturnBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 50;
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
    border-radius: 50%;
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
    z-index: 10;
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

const LongtermFactory = ({userObj, parent}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [page, setPage] = useState(1);
    const { handleSubmit } = useForm();
    const [target, setTarget] = useState('');
    const [name, setName] = useState('');
    const [desire, setDesire] = useState('');
    const [explain, setExplain] = useState('');
    const [deadline, setDeadline] = useState('');
    const [prize, setPrize] = useState(''); 
    const [need, setNeed] = useState('');
    const [needArr, setNeedArr] = useState([]);
    const [isInComplete, setIsInComplete] = useState(false);

    const onSubmit = async (e) => {
        const targetId = uuidv4();
        const childIds = [];
        needArr.forEach(async (need) => {
            const childId = uuidv4();
            childIds.push(childId);
            await makeChild(need, childId, isInComplete ? parent.id : targetId);
        })
        if (isInComplete) {
            await dbService.collection('targets').doc(parent.id).update({
                id: parent.id,
                uid: userObj.uid,
                name,
                desire,
                explain,
                deadline : deadline ? new Date(deadline) : '',
                prize,
                needArr,
                createdAt: Date.now(),
                modifiedAt: 0,
                isComplete: true,
                isComplished: false,
                isOpen: true,
                type: "longterm",
                parentId: [parent.parentId[0]],
                childs: childIds,
                completeFeeling: '',
                cancelReason: '',
            }).then(() => {
                    alert('구름이 완성 됐어요!');
                    navigate("/blueprint")    
            }).catch(error => {
                console.log(error.message);
            })
        } else {
            await dbService.collection('targets').doc(targetId).set({
                id: targetId,
                uid: userObj.uid,
                name,
                desire,
                explain,
                deadline : deadline ? new Date(deadline) : '',
                prize,
                needArr,
                createdAt: Date.now(),
                modifiedAt: 0,
                isComplete: true,
                isComplished: false,
                isOpen: true,
                type: "longterm",
                parentId: [parent.id],
                childs: childIds,
                completeFeeling: '',
                cancelReason: '',
            }).then(() => {
                if (parent.id !== 'new') {
                    dbService.collection('targets').doc(`${parent.id}`)
                    .update({
                        childs: firebaseInstance.firestore.FieldValue.arrayUnion(targetId)
                    }).then(() => {
                        console.log('success')
                        alert('큰 구름이 하나 만들어졌어요!');
                        navigate("/blueprint")        
                    }).catch(error => {
                        console.log(error.message);
                    })
                } else {
                    alert('큰 구름이 하나 만들어졌어요!');
                    navigate("/blueprint")    
                }
            }).catch(error => {
                console.log(error.message);
            })
        }
    }

    const makeChild = async (need, childId, parentId) => {
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
            type: "incomplete",
            parentId: [parentId],
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
        if (inputName === 'targetDeadline') {
            setDeadline(e.target.value);
        }
        if (inputName === 'targetPrize') {
            setPrize(e.target.value);
        }
        if (inputName === 'targetNeed') {
            setNeed(e.target.value);
        }
    }

    const onClickPlus = value => {
        console.log(value);
        if (value !== '') {
            let needArray = [...needArr];
            needArray.push(value);
            setNeed('');
            setNeedArr(needArray);
        }
    }

    const onClickDelete = e => {
        e.preventDefault();
        const clickedIndex = e.target.parentNode.id;
        const filtered = needArr.filter((el, index) => index !== parseInt(clickedIndex));
        setNeedArr(filtered);
    }

    const onClickReturn = e => {
        e.preventDefault();
        navigate("/blueprint")
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

    const getDesire = value => {
        setDesire(value);
    }

    const getNeed = value => {
        setNeed(value);
    }

    const getDeadline = value => {
        setDeadline(value);
    }

    const getExplain = value => {
        setExplain(value);
    }

    useEffect(() => {
        if(parent.type === 'incomplete') {
            setIsInComplete(true);
            setName(parent.name);
            setPage(3);
        }
    }, [])

    return (
        <Container>
            {page === 1 && <BackgroundTopCloud />}
            {page > 1 && <BackgroundBottomCloud />}
            {page === 1 && <LongtermParent parent={parent} /> }
            {page === 2 && <LongtermName parent={parent} target={name} getTarget={getName} /> }
            {page === 3 && <LongtermDesire getDesire={getDesire} desire={desire} target={name} /> }
            {page === 4 && <LongtermNeed getNeed={getNeed} need={need} needArr={needArr} onClickPlus={onClickPlus} onClickDelete={onClickDelete} target={name} />}
            {page === 5 && <LongtermDeadline getDeadline={getDeadline} deadline={deadline} target={name} />}
            {page === 6 && <LongtermCheck getExplain={getExplain} explain={explain} name={name} desire={desire} needArr={needArr} deadline={deadline} target={target} />}

            <TargetForm onSubmit={handleSubmit(onSubmit)}>
                <TargetBox>
                    <TargetLabel htmlFor='targetName'>장기 목표 : </TargetLabel>
                    <TargetInput onChange={onChange} value={name} id='targetName' type="text" required/>
                </TargetBox>
                <TargetBox>
                    <TargetLabel htmlFor='targetDesire'>목표의 이유 : </TargetLabel>
                    <TargetInput onChange={onChange} value={desire} id='targetDesire' type="text" />
                </TargetBox>
                <TargetBox>
                    <TargetLabel htmlFor='targetExplain'>목표 설명 : </TargetLabel>
                    <TargetInput onChange={onChange} value={explain} id='targetExplain' type="text" />
                </TargetBox>
                <TargetBox>
                    <TargetLabel htmlFor='targetDeadline'>기한 : </TargetLabel>
                    <TargetInput onChange={onChange} value={deadline} id='targetDeadline' type="date" required/>
                </TargetBox>
                <TargetBox>
                    <TargetLabel htmlFor='targetPrize'>달성 시 보상 : </TargetLabel>
                    <TargetInput onChange={onChange} value={prize} id='targetPrize' type="text" required/>
                </TargetBox>
                <TargetBox>
                    <TargetLabel htmlFor='targetNeed'>필요한 것들 : </TargetLabel>
                    <TargetInput onChange={onChange} value={need} id="targetNeed" type="text"/>
                    <TargetBtn onClick={onClickPlus}>추가하기</TargetBtn>
                </TargetBox>
                {needArr && needArr.map((el, index) => (
                        <NeedBox key={index}>{el}</NeedBox>
                    ))}
                <TargetInput type="submit" />
            </TargetForm>
            <ReturnBtn onClick={onClickReturn} >
                <RiArrowGoBackLine />
            </ReturnBtn>
            {page !== 1 && <PageBtn onClick={onClickPrev} style={{left: "20px"}}>
                <IoMdArrowRoundBack style={{fill: "white"}} />
            </PageBtn>}
            {page !== 6 && <PageBtn onClick={onClickNext}>
                <IoMdArrowRoundForward style={{fill: "white"}} />
            </PageBtn>}
            {page === 6 && 
                <SubmitBtn type="submit" onClick={() => {
                    window.confirm(`${name} 목표가 마음에 드시나요?`) && onSubmit()}
                } value="제출하기" />
            }
        </Container>
    );
};

export default LongtermFactory;