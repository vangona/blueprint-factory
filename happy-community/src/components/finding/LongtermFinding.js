import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../../fBase";
import { Cheers } from "../CheerDB";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 150px;
    font-family: Kyobo Handwriting;
`;

const Question = styled.span`
    font-size: 1rem;
    margin-bottom: 20px;
    line-height: 140%;
`;

const AnswerBox = styled.div`
    display: flex;
`;

const AnswerInput = styled.input``;

const AnswerInputPlus = styled.button`
`;

const BtnContainer = styled.div`
    display: flex;
    margin: 20px;
`;

const AnswerNextBtn = styled.button`
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const AnswerPrevBtn = styled.button`
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

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

const TargetContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 10px;
`;

const TargetNeed = styled.div``;

const HashtagTitle = styled.h3``;

const HashtagContainer = styled.div`
    display: flex;
    gap: 5px;
`;

const Hashtag = styled.span``;

const HomeBtn = styled.button`
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const LongtermFinding = ({userObj, goHome, parent}) => {
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
        } else if (name === "hashtags") {
            const str = hashtags;
            const strArr = str.split('#').map(el => el.trim()).filter(Boolean);
            setHashtagArr(strArr);
            setStep(step + 1);
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
            display : want,
            displayContent : needArr,
            date,
            hashtagArr,
            type: "longterm",
            queryType: "target",
            state: "ongoing",
            registeredTime: Date.now(),
            cancelReason : '',
            completeFeeling: '',
        }
        await dbService.collection(`${userObj.uid}`).doc(targetId).set(targetObj)
        alert("??????????????? ?????????????????????!")
        setWant('')
        setNeedArr([])
        setHashtagArr([]);
        setStep('');
        setDate('');
    }

    return (
        <Container>
            {!step && (
                <>
                    <Question>????????? 1??? ??? ?????? ????????? ????????? ?????? ?????? ??????????</Question>
                    <AnswerInput onChange={onChange} name="want" value={want} type="text" />
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClick} name="want">????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 1 && (
                <>
                    <Question>
                        ?????? ????????? ?????? ?????? ????????? ?????? ??????????
                    </Question>
                    <span>?????????????????? ?????? ???????????? ????????????.</span><br />
                    <span>(ex. ?????? ?????? : ???)</span><br />
                    <AnswerBox>
                        <AnswerInput onChange={onChange} value={need} name="need" type="text" />
                        <AnswerInputPlus onClick={onClickPlus}>????????????</AnswerInputPlus>
                    </AnswerBox>
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn name="need" onClick={onClick}>????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 2 && (
                <>
                    <Question>?????? ????????? ??????????????? ???????????????.</Question>
                    <span></span><br />
                    <AnswerInput onChange={onChange} name="date"  value={date} type="date" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            ????????????
                        </AnswerPrevBtn>
                        <AnswerNextBtn name="date" onClick={onClick}>
                            ????????????
                        </AnswerNextBtn>
                    </BtnContainer>
                </>
            )}         
            {step === 3 && (
                <>
                <Question>
                    ?????? ????????? ??????????????? ??????????????????.
                </Question>
                <AnswerInput onChange={onChange} name="hashtags" value={hashtags} type="text" />
                <BtnContainer>
                    <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                    <AnswerNextBtn name="hashtags" onClick={onClick}>????????????</AnswerNextBtn>
                </BtnContainer>
            </>
            )}
            {step === 4 && (
                <TargetContainer>
                    <TargetContent>
                        ?????? : {want}
                    </TargetContent>
                    <TargetContent>
                        {needArr && needArr.map((content, index) => 
                        <TargetNeed>
                            ????????? ??? {index+1} : {content}
                        </TargetNeed>
                        )}
                    </TargetContent>
                    <TargetContent>
                        ?????? ?????? : {date}??????
                    </TargetContent>
                    {hashtagArr.length !== 0 && 
                    <TargetContent>
                        <HashtagTitle>
                            ?????? ??????
                        </HashtagTitle>
                        <HashtagContainer>
                        {hashtagArr.map(hashtag =>
                            <Hashtag> 
                                #{hashtag}
                            </Hashtag>
                        )}
                        </HashtagContainer>
                    </TargetContent>
                    }
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
                    {want && `?????? : ${want}`}
                </TargetContent>
                <TargetContent>
                    {needArr && needArr.map((content, index) => 
                        <TargetNeed>
                            ????????? ??? {index+1} : {content}
                        </TargetNeed>
                    )}
                </TargetContent>
                <TargetContent>
                    {date && `?????? ?????? : ${date}`}
                </TargetContent>
                {hashtagArr.length !== 0 && 
                <TargetContent>
                    <HashtagTitle>
                        ?????? ??????
                    </HashtagTitle>
                    <HashtagContainer>
                    {hashtagArr.map(hashtag =>
                        <Hashtag> 
                            #{hashtag}
                        </Hashtag>
                    )}
                    </HashtagContainer>
                </TargetContent>
                }
            </TargetContainer>
            }
            <HomeBtn onClick={goHome}>
                ????????? ????????????
            </HomeBtn>
        </Container>
    )
}

export default LongtermFinding;