import React from 'react';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';
import { dbService } from '../../fBase';
import { v4 as uuidv4 } from "uuid";
import { useForm } from 'react-hook-form';
import { useState } from 'react/cjs/react.development';
import { useParams } from 'react-router-dom';

const Container = styled.div`
    ${defaultContainer}
`;

const RoutineTitle = styled.h1``;

const RoutineForm = styled.form``;

const RoutineBox = styled.div``;

const RoutineLabel = styled.label``;

const RoutineInput = styled.input``;

const RoutineFactory = ({userObj, parent}) => {
    const { id } = useParams();
    const { handleSubmit } = useForm();
    const [name, setName] = useState(`${parent.name}을 위한 루틴`);
    const [desire, setDesire] = useState(`${parent.name}을 위해`);
    const [need, setNeed] = useState('');
    const [period, setPeriod] = useState('');
    const [frequency, setFrequency] = useState('');
    const [deadline, setDeadline] = useState('');
    const [prize, setPrize] = useState(''); 

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
            name,
            desire,
            explain : explainData,
            deadline,
            prize,
            needArr : [period, frequency, need],
            createdAt: Date.now(),
            modifiedAt: 0,
            isComplete: true,
            isComplished: false,
            isOpen: true,
            type: "routine",
            parentId: parent ? parent.id : '',
            completeFeeling: '',
            cancelReason: '',
        }).then(() => {
                setName('');
                setDesire('');
                setNeed('');
                setPeriod('');
                setFrequency('');
                setDeadline('');
                setPrize('');
                alert('성공');
        }).catch(error => {
            console.log(error.message);
        })
    }

    return (
        <Container>
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
        </Container>
    );
};

export default RoutineFactory;