import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import BackgroundBottomCloud from '../../background/BackgroundBottomCloud';

const Container = styled.div`
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: SsurroundAir;
`;

const TargetTitle = styled.h1`
    font-family: Ssurround;
    font-size: 20px;
    margin-bottom: 15px;
`;

const TargetForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
`;

const TargetBox = styled.div``;

const TargetLabel = styled.label``;

const TargetInput = styled.input``;

const TargetTeatArea = styled.textarea``;

const TargetBtn = styled.button``;

const NeedBox = styled.div``;

const DeleteBtn = styled.button``;

const PrivateBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: SsurroundAir;
    gap: 5px;
`;

const CheckBox = styled.input``;

const Label = styled.label``;

const LongtermSimple = ({name, getName, desire, getDesire, explain, getExplain, deadline, getDeadline, need, getNeed, needArr, onClickPlus, onClickDelete, isPrivate, getIsPrivate, onSubmit}) => {
    const { handleSubmit } = useForm();

    const onChange = (e) => {
        const inputName = e.target.id;
        if (inputName === 'targetName') {
            getName(e.target.value);
        }
        if (inputName === 'targetDesire') {
            getDesire(e.target.value);
        }
        if (inputName === 'targetExplain') {
            getExplain(e.target.value);
        }
        if (inputName === 'targetDeadline') {
            getDeadline(e.target.value);
        }
        if (inputName === 'targetNeed') {
            getNeed(e.target.value);
        }
        if (inputName === 'targetPrivate') {
            getIsPrivate(e.target.checked);
        }
    }

    return (
        <>
            <BackgroundBottomCloud />
                <Container>
                <TargetForm onSubmit={handleSubmit(onSubmit)}>
                    <TargetTitle>
                        어떤 목표를 만들어볼까요?
                    </TargetTitle>
                    <TargetBox>
                        <TargetLabel htmlFor='targetName'>장기 목표 : </TargetLabel>
                        <TargetInput onChange={onChange} value={name} id='targetName' type="text" required/>
                    </TargetBox>
                    <TargetBox>
                        <TargetLabel htmlFor='targetDesire'>목표의 이유 : </TargetLabel>
                        <TargetInput onChange={onChange} value={desire} id='targetDesire' type="text" />
                    </TargetBox>
                    <TargetBox>
                        <TargetLabel htmlFor='targetDeadline'>기한 : </TargetLabel>
                        <TargetInput onChange={onChange} value={deadline} id='targetDeadline' type="date" required/>
                    </TargetBox>
                    <TargetBox>
                        <TargetLabel htmlFor='targetNeed'>필요한 것들 : </TargetLabel>
                        <TargetInput onChange={onChange} value={need} id="targetNeed" type="text"/>
                        <TargetBtn onClick={(e) => {
                            e.preventDefault();
                            onClickPlus(need)}
                        }>
                                추가하기
                        </TargetBtn>
                    </TargetBox>
                    {needArr && needArr.map((el, index) => (
                            <NeedBox key={index} id={index}>
                                {el} 
                                <DeleteBtn onClick={(e) => {
                                    e.preventDefault();
                                    onClickDelete(e);
                                }}>
                                    ❌
                                </DeleteBtn>
                            </NeedBox>
                    ))}
                    <TargetBox>
                        <TargetLabel htmlFor='targetExplain'>목표 설명 : </TargetLabel>
                        <TargetTeatArea onChange={onChange} value={explain} id='targetExplain' type="text" />
                    </TargetBox>
                    <PrivateBox>
                        <CheckBox name="isPrivate" id="targetPrivate" type="checkbox" checked={isPrivate} onChange={onChange} />
                        <Label htmlFor='itargetPrivate'>이 목표는 비밀로 할래요.</Label>
                    </PrivateBox>
                    <TargetInput type="submit" />
                </TargetForm>
            </Container>
        </>
    );
};

export default LongtermSimple;