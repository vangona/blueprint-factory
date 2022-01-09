import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import { defaultContainer } from '../../css/styleConstants';
import { dbService } from '../../fBase';

const Container = styled.div`
    ${defaultContainer};
`;

const EditTitle = styled.h1``;

const EditForm = styled.form``;

const EditBox = styled.div``;

const EditLabel = styled.label``;

const EditInput = styled.input``;

const BackBtn = styled.button``;

const TargetEdit = ({element}) => {
    const Time = new Date(element.deadline.seconds * 1000);
    console.log(Time);
    const Year = Time.getFullYear();
    const Month = Time.getMonth() + 1;
    const DateTime = Time.getDate();
    const deadlineTime = `${Year}-${Month > 9 ? Month : '0' + Month}-${DateTime > 9 ? DateTime : '0' + DateTime}`;

    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const [name, setName] = useState(element.name);
    const [desire, setDesire] = useState(element.desire);
    const [explain, setExplain] = useState(element.explain);
    const [deadline, setDeadline] = useState(deadlineTime);
    const [prize, setPrize] = useState(element.prize); 

    const onClick = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    const onSubmit = (e) => {
        dbService.collection("targets").doc(`${element.id}`).update({
            name,
            desire,
            explain,
            deadline : new Date(deadline),
            prize,
            isComplished: false,
            type: (new Date(deadline) - Date.now()) > 32872832197 ? "longterm" : "shortterm",
            isComplete: true,
        }).then(() => {
            alert('성공');
        }).catch((error) => {
            console.log(error.message);
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
    }

    return (
        <Container>
            <EditTitle>
                {element.name}
            </EditTitle>
            <EditForm onSubmit={handleSubmit(onSubmit)}>
                <EditBox>
                    <EditLabel>목표 이름 : </EditLabel>
                    <EditInput id="targetName" onChange={onChange} value={name} type="text" />
                </EditBox>
                <EditBox>
                    <EditLabel>목표 욕망 : </EditLabel>
                    <EditInput id="targetDesire" onChange={onChange} value={desire} type="text" />
                </EditBox>
                <EditBox>
                    <EditLabel>목표 설명 : </EditLabel>
                    <EditInput id="targetExplain" onChange={onChange} value={explain} type="text" />
                </EditBox>
                <EditBox>
                    <EditLabel>목표 기한 : </EditLabel>
                    <EditInput id="targetDeadline" onChange={onChange} value={deadline} type="date" required/>
                </EditBox>
                <EditBox>
                    <EditLabel>목표 보상 : </EditLabel>
                    <EditInput id="targetPrize" onChange={onChange} value={prize} type="text" />
                </EditBox>
                <EditInput type="submit" value="제출" />
            </EditForm>
            <BackBtn onClick={onClick}>돌아가기</BackBtn>
        </Container>
    );
};

export default TargetEdit;