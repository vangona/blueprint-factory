import React from 'react';
import { useForm } from 'react-hook-form';
import { FaExchangeAlt } from 'react-icons/fa';
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

const PlanSimple = ({target, getTarget, name, getName, explain, getExplain, explainArr, onClickStep, onClickDeleteStep, desire, prize, getPrize, deadline, getDeadline, need, getNeed, needArr, onClickPlus, onClickDelete, onClickDeleteNeed, isPrivate, getIsPrivate, onSubmit}) => {
    const { handleSubmit } = useForm();

    const onChange = (e) => {
        const inputName = e.target.id;
        if (inputName === 'target') {
            getTarget(e.target.value);
        }
        if (inputName === 'targetName') {
            getName(e.target.value);
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
            <BackgroundBottomCloud />
                <Container>
                <TargetForm onSubmit={handleSubmit(onSubmit)}>
                    <TargetTitle>
                        어떤 목표를 만들어볼까요?
                    </TargetTitle>
                    <TargetBox>
                        <TargetLabel htmlFor='target'>단기 목표 : </TargetLabel>
                        <TargetInput onChange={onChange} value={target} id='target' type="text" required/>
                    </TargetBox>
                    <TargetBox>
                        <TargetLabel htmlFor='targetName'>수치화된 목표 : </TargetLabel>
                        <TargetInput onChange={onChange} value={name} id='targetName' type="text" />
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
                        <Label htmlFor='targetPrivate'>이 목표는 비밀로 할래요.</Label>
                    </PrivateBox>
                    <TargetInput type="submit" />
                </TargetForm>
            </Container>``
        </>
    );
};

export default PlanSimple;