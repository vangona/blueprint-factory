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
    const [detailArray, setDetailArray] = useState([]);
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
                setError("????????? ???????????? ?????? ?????? ???????????????.")
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

    const onClickAdd = e => {
        setDetailArray(detailArray.push(""));
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
        alert("??????????????? ?????????????????????!")
        setDream('')
        setNeed('')
        setDesire('');
        setStep('');
    }

    return (
        <Container>
            {step === 0 && (
                <>
                    <Question>
                        ????????? ????????? ?????? ???????????? ?????????? <br />
                        ????????? ??? ??? ???????????????. <br />
                        ????????? ???????????? ???????????????.
                    </Question>
                    <AnswerInput onChange={onChange} name="dream" value={dream} type="text" />
                    <Error>{error}</Error>
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClickYes} name="dream">???</AnswerNextBtn>
                        <AnswerNextBtn onClick={onClickNo} name="dream">?????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 1 && isDream && (
                <>
                    <Question>????????? ????????? ?????? ????????? ?????? ??????????</Question>
                    <span>??????, ??????????????? ????????????????</span>
                    <AnswerInput onChange={onChange} name="need" value={need} type="text" />
                    <Error>{error}</Error>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn name="need" onClick={() => {
                            need &&
                            onClick()}
                            }>????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 1 && !isDream && (
                <>
                <Question>????????? ????????? ?????? ???????????????.</Question>
                <AnswerInput onChange={onChange} name="dream" value={dream} type="text" />
                <Error>{error}</Error>
                <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn onClick={() => {
                            dream 
                            ? onClick()
                            : setError("?????? ???????????????.")
                            }}>????????????</AnswerNextBtn>
                </BtnContainer>
            </>
            )}    
            {step === 2 && (
                <>
                    <Question>????????? ??????????????? ?????? ??? ??????????????? ???????????????</Question>
                    {detailArray.map(detail => (
                        <AnswerInput onChange={onChange} name="detail" value={detail} type="text" />
                    ))}
                    <Error>{error}</Error>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn name="need" onClick={() => {
                            need &&
                            onClick()}
                            }>????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}  
            {step === 3 && (
                <>
                    <Question>??? ?????? ????????????, ????????????????</Question>
                    <span></span><br />
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClickYes} name="happy">???</AnswerNextBtn>
                        <AnswerNextBtn onClick={onClickNo} name="happy">?????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}  
            {step === 4 && (
                <>
                    <Question>??? ?????? ???????????????????</Question>
                    <span></span><br />
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClickYes} name="real">???</AnswerNextBtn>
                        <AnswerNextBtn onClick={onClickNo} name="real">?????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}          
            {step === 5 && isReal && (
                <>
                    <Question>????????? ????????? ?????? ????????? ?????? ??????????</Question>
                    <AnswerInput onChange={onChange} name="need" value={need} type="text" />
                    <Error>{error}</Error>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn name="need" onClick={() => {
                            need &&
                            onClick()}
                            }>????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 4 && !isReal && (
                <>
                <Question>??? ?????? ???????????? ?????? ????????? ??????????</Question>
                <AnswerInput onChange={onChange} name="dream" value={dream} type="text" />
                <Error>{error}</Error>
                <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn onClick={() => {
                            dream 
                            ? onClick()
                            : setError("????????? ???????????????.")
                            }}>????????????</AnswerNextBtn>
                </BtnContainer>
            </>
            )}       
            {step === 5 && (
                <TargetContainer>
                    <TargetContent>
                        ??? : {dream}
                    </TargetContent>
                    <TargetContent>
                        ????????? ??? : {need}
                    </TargetContent>
                    <TargetContent>
                        ????????? ?????? : {desire}
                    </TargetContent>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            ????????????
                        </AnswerPrevBtn>
                        <AnswerNextBtn onClick={() => {
                            if (window.confirm("????????? ????????? ?????????????")) { onSubmit() }
                        }}>
                            ?????? ????????????
                        </AnswerNextBtn>
                    </BtnContainer>
                </TargetContainer>
            )}
            {!(step === 4) && 
            <TargetContainer>
                <TargetContent>
                    {dream && `??? : ${dream}`}
                </TargetContent>
                <TargetContent>
                    {need && `????????? ??? : ${need}`}
                </TargetContent>
                <TargetContent>
                    {desire && `????????? ?????? : ${desire}`}
                </TargetContent>
            </TargetContainer>
            }
        </Container>
    )
}

export default DreamFinding;