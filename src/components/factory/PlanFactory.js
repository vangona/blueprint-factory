import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { defaultBtnAction, defaultContainer } from '../../css/styleConstants';
import { dbService } from '../../fBase';
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

const TargetTitle = styled.h1``;

const TargetForm = styled.form``;

const TargetBox = styled.div``;

const TargetLabel = styled.label``;

const TargetInput = styled.input``;

const TargetBtn = styled.button``;

const ArrayContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 5px;
`;

const ArrayBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ArrayElement = styled.div``;

const DeleteBtn = styled.button``;

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

const SubmitBtn = styled.input`
    display: flex;
    font-family: SSurroundAir;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 20px;
    z-index: 99;
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
    const [prize, setPrize] = useState(''); 
    const [need, setNeed] = useState('');
    const [needArr, setNeedArr] = useState([]);

    const onSubmit = async (e) => {
        const targetId = uuidv4();
        await dbService.collection('targets').doc(targetId).set({
            id: targetId,
            uid: userObj.uid,
            name,
            desire,
            explain : explainArr,
            deadline : new Date(deadline),
            prize,
            needArr,
            createdAt: Date.now(),
            modifiedAt: 0,
            isComplete: true,
            isComplished: false,
            isOpen: true,
            type: "plan",
            parentId: parent ? parent.id : '',
            completeFeeling: '',
            cancelReason: '',
        }).then(() => {
            makeChilds(targetId).then(() => {
                alert('성공적으로 계획을 세우셨어요!');
                navigate('/blueprint')
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

    const onClickStep = e => {
        e.preventDefault();
        if (explain !== '') {
            let explainArray = [...explainArr];
            explainArray.push(explain);
            console.log(explainArray)
            setExplain('');
            setExplainArr(explainArray);
        }        
    }

    const onClickDeleteStep = e => {
        e.preventDefault();
        const explain = e.target.previousSibling.innerHTML;
        const filtered = explainArr.filter(el => el !== explain);
        setExplainArr(filtered);
    }

    const onClickDeleteNeed = e => {
        e.preventDefault();
        const need = e.target.previousSibling.innerHTML;
        const filtered = needArr.filter(el => el !== need);
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

    const getStep = value => {
        setExplain(value);
    }

    const getDeadline = value => {
        setDeadline(value);
    }

    const getNeed = value => {
        setNeed(value);
    }

    return (
        <Container>
            {page === 1 && <PlanParent userObj={userObj} parent={parent} />}
            {page > 1 && <ShorttermBackground userObj={userObj} parent={parent} />}
            {page === 2 && <PlanName name={name} getName={getName} />}
            {page === 3 && <PlanStep getStep={getStep} step={explain} stepArr={explainArr} onClickStep={onClickStep} onClickDelete={onClickDeleteStep} target={name} />}
            {page === 4 && <PlanDeadline getDeadline={getDeadline} deadline={deadline} target={name} /> }
            {page === 5 && <PlanNeed getNeed={getNeed} need={need} needArr={needArr} onClickPlus={onClickPlus} onClickDelete={onClickDeleteNeed} target={name} /> }
            {page === 6 && 
                <PlanCheck explainArr={explainArr} needArr={needArr} deadline={deadline} target={name} />            
            }


            <TargetForm display="none" onSubmit={handleSubmit(onSubmit)}>
                <TargetBox>
                    <TargetLabel htmlFor='targetName'>계획이름 : </TargetLabel>
                    <TargetInput onChange={onChange} value={name} id='targetName' type="text" required/>
                </TargetBox>
                <TargetBox>
                    <TargetLabel htmlFor='targetDesire'>계획의 이유 : </TargetLabel>
                    <TargetInput onChange={onChange} value={desire} id='targetDesire' type="text" />
                </TargetBox>
                <TargetBox>
                    <TargetLabel htmlFor='targetExplain'>단계 나누기 : </TargetLabel>
                    <TargetInput onChange={onChange} value={explain} id='targetExplain' type="text" />
                    <TargetBtn onClick={onClickStep}>추가하기</TargetBtn>
                </TargetBox>
                <ArrayContainer id="explain__container">
                {explainArr && explainArr.map((el, index) => 
                    <ArrayBox key={index}>
                        <ArrayElement name={el}>
                            {index + 1} : {el}
                        </ArrayElement>
                        <DeleteBtn onClick={onClickDeleteStep}>
                            X
                        </DeleteBtn>
                    </ArrayBox>
                )}
                </ArrayContainer>
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
                <ArrayContainer id="need__container">
                {needArr && needArr.map((el, index) => 
                    <ArrayBox key={index}>
                        <ArrayElement name={el}>
                            {index + 1} : {el}
                        </ArrayElement>
                        <DeleteBtn onClick={onClickDeleteNeed}>
                            X
                        </DeleteBtn>
                    </ArrayBox>
                )}
                </ArrayContainer>
                <TargetInput type="submit" />
            </TargetForm>

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