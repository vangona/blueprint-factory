import React, { useState } from 'react';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import { dbService, firebaseInstance } from '../../fBase';
import { v4 as uuidv4 } from "uuid";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import RoutineName from './routine/RoutineName';
import ShorttermBackground from './shortterm/ShorttermBackground';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import RoutineParent from './routine/RoutineParent';
import RoutineTodo from './routine/RoutineTodo';
import RoutinePeriod from './routine/RoutinePeriod';

const Container = styled.div`
    ${defaultContainer}
`;

const RoutineTitle = styled.h1``;

const RoutineForm = styled.form``;

const RoutineBox = styled.div``;

const RoutineLabel = styled.label``;

const RoutineInput = styled.input``;

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
    z-index: 99;
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
    z-index: 60;
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

const RoutineFactory = ({userObj, parent}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const { handleSubmit } = useForm();
    const [name, setName] = useState(`${parent.name}을 위한 루틴`);
    const [desire, setDesire] = useState(`${parent.name}을 위해`);
    const [need, setNeed] = useState('');
    const [period, setPeriod] = useState('');
    const [frequency, setFrequency] = useState('');
    const [deadline, setDeadline] = useState('');
    const [prize, setPrize] = useState(''); 
    const [isPrivate, setIsPrivate] = useState(false);

    const onChange = (e) => {
        const inputName = e.target.id;
        if (inputName === 'targetName') {
            setName(e.target.value);
        }
        if (inputName === 'targetDesire') {
            setDesire(e.target.value);
        }
        if (inputName === 'targetNeed') {
            setNeed(e.target.value);
        }
        if (inputName === 'targetPeriod') {
            setPeriod(e.target.value);
        }
        if (inputName === 'targetFrequency') {
            setFrequency(e.target.value);
        }
        if (inputName === 'targetPrize') {
            setPrize(e.target.value);
        }
    }

    const onSubmit = async (e) => {
        const targetId = uuidv4();
        const explainData = `${period}에 ${frequency} ${need}`;
        await dbService.collection('targets').doc(targetId).set({
            id: targetId,
            uid: userObj.uid,
            name: explainData,
            desire : desire,
            explain : explainData,
            deadline,
            prize,
            needArr : [period, frequency, need],
            createdAt: Date.now(),
            modifiedAt: 0,
            isComplete: true,
            isComplished: false,
            isOpen: true,
            isPrivate,
            type: "routine",
            parentId: [parent.id],
            childs: [],
            completeFeeling: '',
            cancelReason: '',
        }).then(async () => {
            await dbService.collection('targets').doc(`${parent.id}`)
            .update({
                childs: firebaseInstance.firestore.FieldValue.arrayUnion(targetId)
            }).then(() => {
                console.log('success')
                alert('화이팅이에요!');
                navigate("/")        
            }).catch(error => {
                console.log(error.message);
            })
        }).catch(error => {
            console.log(error.message);
        })
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

    const getNeed = value => {
        setNeed(value);
    }

    const getPeriod = value => {
        setPeriod(value);
    }

    const getFrequency = value => {
        setFrequency(value);
    }

    const getIsPrivate = value => {
        setIsPrivate(value);
    }

    return (
        <Container>
            {page === 1 && <RoutineParent parent={parent} />}
            {page > 1 && <ShorttermBackground />}
            {page === 2 && <RoutineName getName={getName} name={name} parent={parent} />}
            {page === 3 && <RoutineTodo getNeed={getNeed} parent={parent} need={need} />}
            {page === 4 && <RoutinePeriod getPeriod={getPeriod} getFrequency={getFrequency} period={period} frequency={frequency} need={need} getIsPrivate={getIsPrivate} isPrivate={isPrivate} />}


            <RoutineTitle>{parent.name}에 대한 루틴을 세워봅시다.</RoutineTitle>
            <RoutineForm onSubmit={handleSubmit(onSubmit)}>
                <RoutineBox>
                    {period ? `${period}에` : null} {frequency ? `${frequency}` : null} {need}
                </RoutineBox>
                <RoutineBox>
                    <RoutineLabel>
                        루틴 이름 : 
                    </RoutineLabel>
                    <RoutineInput id='targetName' onChange={onChange} type="text" value={name} />
                </RoutineBox>
                <RoutineBox>
                    <RoutineLabel>
                        루틴 목적 : 
                    </RoutineLabel>
                    <RoutineInput id='targetDesire' onChange={onChange} type="text" value={desire} />
                </RoutineBox>
                <RoutineBox>
                    <RoutineLabel>
                        루틴으로 할 것 : 
                    </RoutineLabel>
                    <RoutineInput id='targetNeed' onChange={onChange} type="text" value={need} />
                </RoutineBox>
                <RoutineBox>
                    <RoutineLabel>
                        반복 주기 : 
                    </RoutineLabel>
                    <RoutineInput id='targetPeriod' onChange={onChange} type="text" value={period} />
                </RoutineBox>
                <RoutineBox>
                    <RoutineLabel>
                        주기별 반복 횟수 : 
                    </RoutineLabel>
                    <RoutineInput id='targetFrequency' onChange={onChange} type="text" value={frequency} />
                </RoutineBox>
                <RoutineBox>
                    <RoutineLabel>
                        루틴 보상 : 
                    </RoutineLabel>
                    <RoutineInput id='targetPrize' onChange={onChange} type="text" value={prize} />
                </RoutineBox>
                <RoutineInput type="submit" value="제출" />
            </RoutineForm>

            <ReturnBtn onClick={onClickReturn} >
                <RiArrowGoBackLine />
            </ReturnBtn>
            {page !== 1 && <PageBtn onClick={onClickPrev} style={{left: "20px"}}>
                <IoMdArrowRoundBack style={{fill: "white"}} />
            </PageBtn>}
            {page !== 4 && <PageBtn onClick={onClickNext}>
                <IoMdArrowRoundForward style={{fill: "white"}} />
            </PageBtn>}
            {page === 4 && 
                <SubmitBtn type="submit" onClick={() => {
                    window.confirm("제출할까요?") &&
                    onSubmit();
                }
                } value="제출하기" />
            }            
        </Container>
    );
};

export default RoutineFactory;