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

const LongtermFinding = ({userObj, goHome}) => {
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
            needArr,
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
        alert("성공적으로 설정되었습니다!")
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
                    <Question>적어도 1년 뒤 되고 싶거나 해내고 싶은 것이 있나요?</Question>
                    <AnswerInput onChange={onChange} name="want" value={want} type="text" />
                    <BtnContainer>
                        <AnswerNextBtn onClick={onClick} name="want">다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 1 && (
                <>
                    <Question>
                        하고 싶은걸 하기 위해 필요한 것이 있나요?
                    </Question>
                    <span>장기목표이니 크게 잡으셔도 좋습니다.</span><br />
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
                    <Question>장기 목표의 마감기한을 정해주세요.</Question>
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
                    <TargetContent>
                        {needArr && needArr.map((content, index) => 
                        <TargetNeed>
                            필요한 것 {index+1} : {content}
                        </TargetNeed>
                        )}
                    </TargetContent>
                    <TargetContent>
                        달성 기한 : {date}까지
                    </TargetContent>
                    {hashtagArr.length !== 0 && 
                    <TargetContent>
                        <HashtagTitle>
                            목표 소개
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
                            이전으로
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
                <TargetContent>
                    {needArr && needArr.map((content, index) => 
                        <TargetNeed>
                            필요한 것 {index+1} : {content}
                        </TargetNeed>
                    )}
                </TargetContent>
                <TargetContent>
                    {date && `달성 기간 : ${date}`}
                </TargetContent>
                {hashtagArr.length !== 0 && 
                <TargetContent>
                    <HashtagTitle>
                        목표 소개
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
                홈으로 돌아가기
            </HomeBtn>
        </Container>
    )
}

export default LongtermFinding;