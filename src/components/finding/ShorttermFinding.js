import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../../fBase";
import { Cheers } from "../CheerDB";
import Loading from "../Loading";
import Selector from "./Selector";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    color: black;
    font-family: Kyobo Handwriting;
`;

const Question = styled.span`
    font-size: 1rem;
    margin-bottom: 20px;
    line-height: 140%;
`;

const SelectionTitle = styled.div`
    border: 1px solid black;
    color: black;
    padding: 10px 15px;
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const NeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 15px;
`;

const NeedBtn = styled.button`
    background-color: white;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    :hover {
        cursor: pointer;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const AnswerBox = styled.div``;

const AnswerLabel = styled.label``;

const AnswerInput = styled.input``;

const AnswerInputPlus = styled.button``;

const AnswerNextBtn = styled.button`
    margin-top: 10px;
    color: black;
    padding: 3px 10px;
    border-radius: 10px;
    border: 0.5px black solid;
    background-color: rgba(255,255,255,0.1);
    :hover {
        cursor: pointer;
    }
`;

const AnswerPrevBtn = styled.button`
    margin-top: 10px;
    color: black;
    padding: 3px 10px;
    border-radius: 10px;
    border: 0.5px black solid;
    background-color: rgba(255,255,255,0.1);
    :hover {
        cursor: pointer;
    }
`;

const HashtagTitle = styled.h3``;

const HashtagContainer = styled.div`
    display: flex;
    gap: 5px;
`;

const Hashtag = styled.span``;

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

const TargetNeed = styled.div``;

const HomeBtn = styled.button`
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const ShortermFinding = ({userObj, targets, goHome}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selection, setSelection] = useState('');
    const [selectionId, setSelectionId] = useState('');
    const [longterm, setLongterm] = useState('');
    const [shorttermArr, setShorttermArr] = useState([]);
    const [want, setWant] = useState('');
    const [need, setNeed] = useState('');
    const [needArr, setNeedArr] = useState([]);
    const [numericValueArr, setNumericValueArr] = useState([]);
    const [date, setDate] = useState('');
    const [step, setStep] = useState('');

    const onChange = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "want") {
            setWant(e.target.value)
        } else if (name === "need") {
            setNeed(e.target.value)
        } else if (name === "date") {
            setDate(e.target.value)
        }
    }

    const onClickPrev = e => {
        e.preventDefault();
        setStep(step-1);
    }

    const onClickPlus = e => {
        const arr = [...shorttermArr];
        arr.push([need])
        setShorttermArr(arr);
        setNeedArr([...needArr, need]);
        setNeed('');
    }

    const onClick = e => {
        const name = e.target.getAttribute("name")
        if (name === "want" && want) {
            setStep(1)
        } else if (e.target.getAttribute("name") === "numericValue") {
            const shorttermarr = shorttermArr;
            const arr = [];
            const contents = document.querySelectorAll("input[name='numericValue']")
            contents.forEach((content, index) => {
                shorttermarr[index].push(content.value);
                arr[index] = content.value;
            })
            setShorttermArr(shorttermarr);
            setNumericValueArr(arr);
            setStep(step + 1)            
        } else {
            setStep(step + 1)
        }
    }

    const onClickNeed = e => {
        setWant(e.target.innerHTML);
        if (selection === 1) {
            setSelectionId(1);
        } else {
            setSelectionId(selection.targetId)
        }
    }

    const onSubmit = async () => {
        const targetId = uuidv4();
        const targetObj = {
            targetId,
            display : want,
            needArr,
            numericValueArr,
            date,
            parentId: selectionId,
            type: "shortterm",
            queryType: "target",
            state: "ongoing",
            registeredTime: Date.now(),
            cancelReason : '',
            completeFeeling: '',
        }
        await dbService.collection(`${userObj.uid}`).doc(targetId).set(targetObj)
        alert("성공적으로 설정되었습니다!")
        setWant('')
        setNeed('')
        setNumericValueArr([]);
        setDate('');
        setStep('');
        setSelection('');
    }

    const getLongterm = () => {
        const filteredLongterms = targets.filter(target => target.state === "ongoing" && target.type === "longterm");
        setLongterm(filteredLongterms);
        setIsLoading(false);
    };
    
    const getSelection = (data) => {
        setSelection(data);
    };

    useEffect(() => {
        getLongterm();
    }, [])

    return (
        <Container>
            {isLoading ? "Loading..."
            : 
            <>
            {!selection 
            ? 
            <>
                <Question>단기 목표가 장기 목표를 위한 것인가요?</Question>
                <Selector targets={longterm} getSelection={getSelection} />
                <SelectionTitle onClick={() => {
                    setSelection(1);
                    setSelectionId(1);
                }}>새로운 단기 목표 만들기</SelectionTitle>
            </>
            : 
            <>
                {!step && (
                <>
                    <Question>
                        {selection !== 1
                        ? `${selection.display}을(를) 위해 1년 내에 해야하는 것이 있나요?`
                        : '1년 내에 하고 싶은 것이 있나요?' }
                    </Question>
                    {selection !== 1 &&
                    <NeedContainer>
                        {selection.needArr.map(needData => 
                            <NeedBtn onClick={onClickNeed}>
                                {needData}
                            </NeedBtn>    
                        )}
                    </NeedContainer>
                    }
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
                    <Question>
                        필요한 것을 숫자 혹은 <br /> 
                        구체적인 행동으로 표현해보세요. <br />
                        안된다면, 이전으로 돌아가서 <br />
                        필요한 것을 수정해보세요.
                    </Question>
                    <Question>(ex. 부자되기 {'>'} 월 수입 500만원 <br /> or 매 끼니 가격 안보고 메뉴 시키기)</Question><br />
                    {shorttermArr.map(content => 
                    <AnswerBox>
                        <AnswerLabel>{content} : </AnswerLabel>
                        <AnswerInput name="numericValue" type="text" />
                    </AnswerBox>                        
                    )}
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>이전으로</AnswerPrevBtn>
                        <AnswerNextBtn name="numericValue" onClick={onClick}>다음으로</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}     
            {step === 3 && (
                <>
                    <Question>
                        {selection !== 1
                            ? `${want}을(를) 달성할 기간을 정해보세요`
                            : '목표를 달성할 기간을 정해보세요.' 
                        }

                    </Question>
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
            {step === 4 && (
                <TargetContainer>
                    <TargetContent>
                        목표 : {want}
                    </TargetContent>
                    {shorttermArr && shorttermArr.map((content, index) => 
                    <TargetContent>
                        필요한 것 {index+1} : {content[0]} {content[1] && `, ${content[1]}`} {content[2] && `: ${content[2]}까지`}
                    </TargetContent>
                    )}
                    <TargetContent>
                        {date && `달성 기한 : ${date}까지`}
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
                    {want && `원하는 것 : ${want}`}
                </TargetContent>
                {shorttermArr && shorttermArr.map((content, index) => 
                    <TargetContent>
                        필요한 것 {index+1} : {content[0]}{content[1] && `, ${content[1]}`} {content[2] && `: ${content[2]}까지`}
                    </TargetContent>
                )}
                <TargetContent>
                    {date && `달성 기한 : ${date}까지`}
                </TargetContent>
            </TargetContainer>
            }
            </>
            }
            </>
            }
            <HomeBtn onClick={goHome}>
                홈으로
            </HomeBtn>
        </Container>
    )
}

export default ShortermFinding;