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

const BtnContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const AnswerBox = styled.div`
    display: flex;
`;

const AnswerLabel = styled.label``;

const AnswerInput = styled.input``;

const AnswerInputPlus = styled.button``;

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

const LongtermFinding = ({userObj}) => {
    const [want, setWant] = useState('');
    const [need, setNeed] = useState('');
    const [needArr, setNeedArr] = useState([]);
    const [date, setDate] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [hashtagArr, setHashtagArr] = useState([]);
    const [step, setStep] = useState('');

    const onChange = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "want") {
            setWant(e.target.value);
        } else if (name === "need") {
            setNeed(e.target.value);
        } else if (name === "date") {
            setDate(e.target.value);
        } else if (name === "hashtags") {
            setHashtags(e.target.value);
        }
    }

    const onClickPrev = e => {
        e.preventDefault();
        setStep(step-1);
    }

    const onClick = e => {
        const name = e.target.getAttribute("name")
        if (name === "want" && want) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }

    const onClickPlus = e => {
        setNeedArr([...needArr, need]);
        setNeed('');
    }

    const onSubmit = async () => {
        const targetId = uuidv4();
        const targetObj = {   
            targetId,
            want,
            needArr,
            date,
            type: "longterm",
            queryType: "target",
            state: "ongoing",
            registeredTime: Date.now(),
            cancelReason : '',
            completeFeeling: '',
        }
        await dbService.collection(`${userObj.uid}`).doc(targetId).set(targetObj)
        alert("성공적으로 설정되었습니다!")
        setWant('')
        setNeedArr([])
        setDate('');
        setStep('');
    }

    return (
        <Container>
            {!step && (
                <>
                    <Question>적어도 1년 뒤 되고 싶거나 해내고 싶은 것이 있나요?</Question>
                    <AnswerInput onChange={onChange} name="want" value={want} type="text" />
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClick} name="want">다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 1 && (
                <>
                    <Question>하고 싶은걸 하기 위해 필요한 것이 있나요?</Question>
                    <span>(ex. 부자 되기 : 돈)</span><br />
                    <AnswerBox>
                        <AnswerInput onChange={onChange} value={need} name="need" type="text" />
                        <AnswerInputPlus onClick={onClickPlus}>추가하기</AnswerInputPlus>
                    </AnswerBox>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="need" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 2 && (
                <>
                    <Question>필요한 것을 달성할 기간을 정해보세요.</Question>
                    <span></span><br />
                    <AnswerInput onChange={onChange} name="date"  value={date} type="date" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            이전으로
                        </AnswerPrevBtn>
                        <AnswerNextBtn name="date" onClick={onClick}>
                            다음으로
                        </AnswerNextBtn>
                    </BtnContainer>
                    <Cheer>
                        <CheerMent>
                            {Cheers.value}
                        </CheerMent>
                    </Cheer>
                </>
            )}         
            {step === 3 && (
                <>
                <Question>
                    장기 목표를 해시태그로 소개해주세요.
                </Question>
                <AnswerInput onChange={onChange} name="hashtags" value={hashtags} type="text" />
                <BtnContainer>
                    <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                    <AnswerNextBtn name="hashtags" onClick={onClick}>다음으로</AnswerNextBtn>
                </BtnContainer>
            </>
            )}
            {step === 4 && (
                <TargetContainer>
                    <TargetContent>
                        목표 : {want}
                    </TargetContent>
                    {needArr && needArr.map(content => 
                    <TargetContent>
                        필요한 것 : {content}
                    </TargetContent>
                    )}
                    <TargetContent>
                        달성 기한 : {date}까지
                    </TargetContent>
                    {hashtagArr && hashtagArr.map(hashtag => 
                        <TargetContent>
                            {hashtag}
                        </TargetContent>
                    )}
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
                    {want && `목표 : ${want}`}
                </TargetContent>
                {needArr && needArr.map(content => 
                    <TargetContent>
                        필요한 것 : {content}
                    </TargetContent>
                )}
                <TargetContent>
                    {date && `달성 기간 : ${date}`}
                </TargetContent>
                {hashtagArr && hashtagArr.map(hashtag => 
                    <TargetContent>
                        {hashtag}
                    </TargetContent>
                )}
            </TargetContainer>
            }
        </Container>
    )
}

export default LongtermFinding;