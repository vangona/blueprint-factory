import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../../fBase";
import { Cheers } from "../CheerDB";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

const Question = styled.span`
    font-size: 1rem;
    margin-bottom: 20px;
    line-height: 140%;
`;

const BtnContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const AnswerInput = styled.input``;

const AnswerNextBtn = styled.button``;

const AnswerPrevBtn = styled.button``;

const Cheer = styled.div`
    text-align: center;
    line-height: 25px;
`;

const CheerMent = styled.span``;

const ShorttermContainer = styled.div``;

const ShorttermTitle = styled.div`
    border: 1px solid black;
    color: black;
    padding: 10px 15px;
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const TargetContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const TargetContent = styled.div``;

const PlanFinding = ({userObj, targets}) => {
    const [selection, setSelection] = useState('');
    const [level, setLevel] = useState('');
    const [point, setPoint] = useState('');
    const [isNow, setIsNow] = useState(false);
    const [step, setStep] = useState('');
    const [shortterms, setShortterms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChange = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "level") {
            setLevel(e.target.value);
        } else if (name === "point") {
            setPoint(e.target.value);
        } else if (name === "isNow") {
            setIsNow(true);
        }
    };

    const onClickPrev = e => {
        e.preventDefault();
        setStep(step-1);
    };

    const onClick = e => {
        if (e.target.getAttribute("name") === "plan") {
            setStep(1);
        } else {
            setStep(step + 1);
        }
    };

    const onClickSelection = e => {
        setSelection(JSON.parse(e.target.getAttribute("value")))
    };

    const onSubmit = async () => {
        const targetId = uuidv4();
        const targetObj = {
            targetId,
            level,
            point,
            isNow,
            type: "plan",
            queryType: "target",
            state: "ongoing",
            registeredTime: Date.now(),
            cancelReason : '',
            completeFeeling: '',
        }
        await dbService.collection(`${userObj.uid}`).doc(targetId).set(targetObj)
        alert("성공적으로 설정되었습니다!")
        setLevel('')
        setPoint('')
        setIsNow(false);
    }

    const getShortterm = () => {
        setShortterms(targets.filter(target => target.state === "ongoing" && target.type === "shortterm"))
        setIsLoading(false);
    }

    useEffect(() => {
        getShortterm();
    }, []);

    return (
        <Container>
            {!isLoading &&
            <>
            {!selection &&
            <>  
                <Question>나의 단기 목표들</Question>
                <ShorttermContainer>{shortterms.map(target => 
                    <ShorttermTitle onClick={onClickSelection} value={JSON.stringify(target)}>{target.want}</ShorttermTitle>
                )}</ShorttermContainer>
            </>
            }
            {selection && !step && (
                <>
                    <Question>{selection.want}에 대해 기간을 나눠 계획을 세워봅시다.</Question>
                    <Question>필요한 것 : {selection.need}</Question>
                    <Question>수치 : {selection.numericValue}</Question>
                    <Question>기한 : {selection.date}까지</Question>
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClick} name="plan">다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 1 && (
                <>
                    <Question>{selection.need}를 단계로 나눈다면 몇 단계로 나눌 수 있을까요?</Question>
                    <AnswerInput onChange={onChange} name="level" value={level} type="number" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="level" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 2 && (
                <>
                    <Question>
                        각 단계별 도달치를 수치로 적어봅시다.
                    </Question>
                    <AnswerInput onChange={onChange} name="point"  value={point} type="text" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="point" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 3 && (
                <>
                    <Question>당장 이 계획을 실행해도 문제가 없나요?</Question>
                    <span></span><br />
                    <AnswerInput onChange={onChange} name="isNow"  value={isNow} type="date" />
                    <BtnContainer>
                        <AnswerNextBtn name="isNow" onClick={onClick}>
                            예
                        </AnswerNextBtn>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            아니오
                        </AnswerPrevBtn>
                    </BtnContainer>
                </>
            )}         
            {step === 4 && (
                <TargetContainer>
                    <TargetContent>
                        목표 : {selection.want}
                    </TargetContent>
                    <TargetContent>
                        필요한 것 : {selection.need}
                    </TargetContent>
                    <TargetContent>
                        {level && `${level}단계 계획`}
                    </TargetContent>
                    <TargetContent>
                        {point && `단계별 수치 : ${point}`}
                    </TargetContent>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            수정하기
                        </AnswerPrevBtn>
                        <AnswerNextBtn onClick={() => {
                            if (window.confirm("목표가 마음에 드시나요?")) { onSubmit() }
                        }}>
                            목표 설정하기
                        </AnswerNextBtn>
                    </BtnContainer>
                </TargetContainer>
            )}
            {!(step === 4) && 
            <TargetContainer>
                <TargetContent>
                    {level && `${level}단계 계획`}
                </TargetContent>
                <TargetContent>
                    {point && `단계별 수치 : ${point}`}
                </TargetContent>
            </TargetContainer>
            }
            </>
            }
        </Container>
    )
}

export default PlanFinding;