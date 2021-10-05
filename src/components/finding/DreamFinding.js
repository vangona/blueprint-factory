import React, { useState } from "react";
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

const Error = styled.span`
    font-size: 12px;
    opacity: 80%;
    margin: 10px;
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

const TargetContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const TargetContent = styled.div``;

const DreamFinding = ({userObj, sendGoalState}) => {
    const [isDream, setIsDream] = useState(false);
    const [isReal, setIsReal] = useState(false);
    const [isHappy, setIsHappy] = useState(false);
    const [dream, setDream] = useState('');
    const [need, setNeed] = useState('');
    const [desire, setDesire] = useState('');
    const [step, setStep] = useState(0);
    const [error, setError] = useState('');

    const onChange = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "dream") {
            setDream(e.target.value)
        } else if (name === "need") {
            setNeed(e.target.value)
        } else if (name === "desire") {
            setDesire(e.target.value)
        }
    }

    const onClickPrev = e => {
        e.preventDefault();
        setStep(step-1);
    }

    const onClickYes = e => {
        e.preventDefault();
        const name = e.target.getAttribute("name")
        if (name === "dream") {
            if (dream) {
                setIsDream(true);
                setStep(step + 1);
            } else {
                setError("삶에서 이루고자 하는 것을 적어주세요.")
            }
        } else if (name === "happy") {
            setIsHappy(true)
            setStep(step + 1)
        } else if (name === "real") {
            setIsReal(true)
            setStep(step + 1)
        }
    }

    const onClickNo = e => {
        e.preventDefault();
        const name = e.target.getAttribute("name")
        if (name === "dream") {
            setIsDream(false);
            setStep(step + 1);
        } else if (name === "happy") {
            setIsHappy(false)
            setStep(step - 1)
        } else if (name === "real") {
            setIsReal(false);
            setStep(step + 1);
        }
    }

    const onClick = e => {
        if (!isDream) {
            setIsDream(true)
        } else {
            setStep(step + 1)
        }
    }

    const onSubmit = async () => {
        const targetId = uuidv4();
        const targetObj = {
            targetId,
            dream,
            need,
            desire,
            type: "dream",
            queryType: "target",
            state: "ongoing",
            registeredTime: Date.now(),
            cancelReason : '',
            completeFeeling: '',
        }
        await dbService.collection(`${userObj.uid}`).doc(targetId).set(targetObj)
        alert("성공적으로 설정되었습니다!")
        setDream('')
        setNeed('')
        setDesire('');
        setStep('');
    }

    return (
        <Container>
            {step === 0 && (
                <>
                    <Question>삶에서 이루고 싶은 무언가가 있나요?</Question>
                    <AnswerInput onChange={onChange} name="dream" value={dream} type="text" />
                    <Error>{error}</Error>
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClickYes} name="dream">네</AnswerNextBtn>
                        <AnswerNextBtn onClick={onClickNo} name="dream">아니요</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 1 && isDream && (
                <>
                    <Question>이루고 싶은걸 위해 필요한 것이 있나요?</Question>
                    <span>추상적이어도 괜찮으니, 적어주세요.</span>
                    <AnswerInput onChange={onChange} name="need" value={need} type="text" />
                    <Error>{error}</Error>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="need" onClick={() => {
                            need &&
                            onClick()}
                            }>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 1 && !isDream && (
                <>
                <Question>언젠가 가졌던 꿈을 적어보세요.</Question>
                <AnswerInput onChange={onChange} name="dream" value={dream} type="text" />
                <Error>{error}</Error>
                <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn onClick={() => {
                            dream 
                            ? onClick()
                            : setError("꿈을 적어주세요.")
                            }}>다음으로</AnswerNextBtn>
                </BtnContainer>
            </>
            )}    
            {step === 2 && (
                <>
                    <Question>그 꿈이 이뤄지면, 행복할까요?</Question>
                    <span></span><br />
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClickYes} name="happy">네</AnswerNextBtn>
                        <AnswerNextBtn onClick={onClickNo} name="happy">아니요</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}  
            {step === 3 && (
                <>
                    <Question>그 꿈은 현실적인가요?</Question>
                    <span></span><br />
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClickYes} name="real">네</AnswerNextBtn>
                        <AnswerNextBtn onClick={onClickNo} name="real">아니요</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}          
            {step === 4 && isReal && (
                <>
                    <Question>이루고 싶은걸 위해 필요한 것이 있나요?</Question>
                    <AnswerInput onChange={onChange} name="need" value={need} type="text" />
                    <Error>{error}</Error>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="need" onClick={() => {
                            need &&
                            onClick()}
                            }>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 4 && !isReal && (
                <>
                <Question>그 꿈의 이면에는 어떤 욕망이 있나요?</Question>
                <AnswerInput onChange={onChange} name="dream" value={dream} type="text" />
                <Error>{error}</Error>
                <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn onClick={() => {
                            dream 
                            ? onClick()
                            : setError("욕망을 적어주세요.")
                            }}>다음으로</AnswerNextBtn>
                </BtnContainer>
            </>
            )}       
            {step === 5 && (
                <TargetContainer>
                    <TargetContent>
                        꿈 : {dream}
                    </TargetContent>
                    <TargetContent>
                        필요한 것 : {need}
                    </TargetContent>
                    <TargetContent>
                        아래의 욕망 : {desire}
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
                    {dream && `꿈 : ${dream}`}
                </TargetContent>
                <TargetContent>
                    {need && `필요한 것 : ${need}`}
                </TargetContent>
                <TargetContent>
                    {desire && `이면의 욕망 : ${desire}`}
                </TargetContent>
            </TargetContainer>
            }
        </Container>
    )
}

export default DreamFinding;