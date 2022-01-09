import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import { dbService } from '../../fBase';
import { v4 as uuidv4 } from "uuid";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import ShorttermParent from './shortterm/ShorttermParent';
import ShorttermBackground from './shortterm/ShorttermBackground';
import ShorttermName from './shortterm/ShorttermName';
import ShorttermDigit from './shortterm/ShorttermDigit';

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
    z-index: 99;
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
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 30px;
    ${defaultBtnAction};
`;

const ShorttermFactory = ({userObj, parent}) => {
    const {id} = useParams();
    const { handleSubmit } = useForm();
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [desire, setDesire] = useState('');
    const [explain, setExplain] = useState('');
    const [deadline, setDeadline] = useState('');
    const [prize, setPrize] = useState(''); 
    const [need, setNeed] = useState('');
    const [needArr, setNeedArr] = useState([]);

    const [target, setTarget] = useState('');

    const onSubmit = async (e) => {
        const targetId = uuidv4();
        await dbService.collection('targets').doc(targetId).set({
            id: targetId,
            uid: userObj.uid,
            name,
            desire,
            explain,
            deadline : new Date(deadline),
            prize,
            needArr,
            createdAt: Date.now(),
            modifiedAt: 0,
            isComplete: true,
            isComplished: false,
            isOpen: true,
            type: "shortterm",
            parentId: parent ? parent.id : '',
            completeFeeling: '',
            cancelReason: '',
        }).then(() => {
            makeChilds(targetId).then(() => {
                setName('');
                setDesire('');
                setExplain('');
                setDeadline('');
                setPrize('');
                setNeedArr('');
                alert('성공');
            }).catch((error) => {
                console.log(error.message);
            })
        }).catch(error => {
            console.log(error.message);
        })
    }

    const makeChilds = (parentId) => {
        return new Promise(function(resolve, reject){
            needArr.forEach(async (el) => {
                const newId = uuidv4();
                await dbService.collection('targets').doc(newId).set({
                    id : newId,
                    uid: userObj.uid,
                    name : el,
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
                    parentId,
                    completeFeeling: '',
                    cancelReason: '',
                })            
            })
            resolve();
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

    const onClickPlus = e => {
        e.preventDefault();
        if (need !== '') {
            let needArray = [...needArr];
            needArray.push(need);
            setNeed('');
            setNeedArr(needArray);
        }
    }

    const getTarget = (value) => {
        setTarget(value);
    }
    
    const getDigit = value => {
        setName(value);
    }

    const onClickPrev = e => {
        e.preventDefault();
        setPage(page - 1);
    }

    const onClickNext = e => {
        e.preventDefault();
        setPage(page + 1);
    }

    return (
        <Container>
            {page === 1 && <ShorttermParent userObj={userObj} parent={parent} />}
            {page > 1 && <ShorttermBackground userObj={userObj} parent={parent} />}
            {page === 2 && <ShorttermName getTarget={getTarget} /> }
            {page === 3 && <ShorttermDigit getDigit={getDigit} target={target} />}
            {/* <TargetTitle>1년 이내에 이루고 싶은 목표가 있나요?</TargetTitle>
            <TargetForm onSubmit={handleSubmit(onSubmit)}>
                <TargetBox>
                    <TargetLabel htmlFor='targetName'>단기 목표 : </TargetLabel>
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
            </TargetForm> */}
            <ReturnBtn>
                <RiArrowGoBackLine />
            </ReturnBtn>
            {page !== 1 && <PageBtn onClick={onClickPrev} style={{left: "20px"}}>
                <IoMdArrowRoundBack style={{fill: "white"}} />
            </PageBtn>}
            <PageBtn onClick={onClickNext}>
                <IoMdArrowRoundForward style={{fill: "white"}} />
            </PageBtn>
        </Container>
    );
};

export default ShorttermFactory;