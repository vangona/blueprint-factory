import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';
import { dbService } from '../../fBase';
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
    ${defaultContainer}
`;

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

const PlanFactory = ({userObj, parent}) => {
    const {id} = useParams();
    const { handleSubmit } = useForm();
    const [name, setName] = useState(`${parent.name}을 위한 계획`);
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
            type: "target",
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

    const onClickDelete = e => {
        e.preventDefault();
        const grandParent = e.target.parentNode.parentNode.id;
        const value = e.target.previousSibling.getAttribute('name');
        if (grandParent === 'explain__container') {
            let originalArr = [...explainArr];
            let filteredArr = originalArr.filter((el) => el !== value);
            setExplainArr(filteredArr);
        }
        if (grandParent === 'need__container') {
            let originalArr = [...needArr];
            let filteredArr = originalArr.filter((el) => el !== value);
            setNeedArr(filteredArr);
        }
    }

    return (
        <Container>
            <TargetForm onSubmit={handleSubmit(onSubmit)}>
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
                        <DeleteBtn onClick={onClickDelete}>
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
                        <DeleteBtn onClick={onClickDelete}>
                            X
                        </DeleteBtn>
                    </ArrayBox>
                )}
                </ArrayContainer>
                <TargetInput type="submit" />
            </TargetForm>
        </Container>
    );
};

export default PlanFactory;