import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../../fBase";
import { Cheers } from "../CheerDB";
import Loading from "../Loading";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    font-family: Kyobo Handwriting;
`;

const Question = styled.span`
    font-size: 1rem;
    margin-bottom: 20px;
    line-height: 140%;
`;

const ThingsContainer = styled.div``;

const TargetTitle = styled.div`
    border: 1px solid black;
    color: black;
    padding: 10px 15px;
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const WantContainer = styled.div`
    margin: 20px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WantLabel = styled.label``;

const AnswerInput = styled.input``;

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

const TargetContent = styled.div``;

const HomeBtn = styled.button`
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    :hover {
        cursor: pointer;
    }
`;

const RoutineFinding = ({userObj, targets, goHome, parent}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [want, setWant] = useState('');
    const [need, setNeed] = useState('');
    const [prize, setPrize] = useState('');
    const [numericValue, setNumericValue] = useState('');
    const [longterms, setLongterms] = useState([]);
    const [shortterms, setShortterms] = useState([]);
    const [plans, setPlans] = useState([]);
    const [date, setDate] = useState('');
    const [step, setStep] = useState('');
    const [selection, setSelection] = useState('');

    const onChange = (e) => {
        const name = e.target.getAttribute("name")
        if (name === "want") {
            setWant(e.target.value);
            setSelection(e.target.value);
            setStep(1);
        } else if (name === "need") {
            setNeed(e.target.value);
        } else if (name === "date") {
            setDate(e.target.value);
        } else if (name === "prize") {
            setPrize(e.target.value);
        }
    }

    const onClickPrev = e => {
        e.preventDefault();
        setStep(step-1);
    }

    const onClickSelection = e => {
        setSelection(JSON.parse(e.target.getAttribute("value")))
        setStep(1);
    };

    const onClick = e => {
        const name = e.target.getAttribute("name")
        if (name === "want" && want) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }

    const onSubmit = async () => {
        const targetId = uuidv4();
        const targetObj = {
            targetId,
            display: `${selection.display}(???)??? ?????? ??????`,
            parentId: selection.targetId,
            displayContent: `${date}??? 1${need}`,
            need,
            date,
            prize,
            type: "routine",
            queryType: "target",
            state: "ongoing",
            registeredTime: Date.now(),
            cancelReason : '',
            completeFeeling: '',
        }
        await dbService.collection(`${userObj.uid}`).doc(targetId).set(targetObj)
        alert("??????????????? ?????????????????????!")
        setWant('');
        setNeed('');
        setDate('');
        setPrize('');
        setStep('');
    }

    const getShortterm = () => {
        const filteredLongterms = targets.filter(target => target.state === "ongoing" && target.type === "longterm");
        const filteredShortterms = targets.filter(target => target.state === "ongoing" && target.type === "shortterm");
        const filteredPlans = targets.filter(target => target.state === "ongoing" && target.type === "plan");
        setLongterms(filteredLongterms);
        setShortterms(filteredShortterms);
        setPlans(filteredPlans);
        setIsLoading(false);
    };

    useEffect(() => {
        if (parent) {
            setSelection(parent);
            setStep(1);
        }
        getShortterm();
    }, [parent])

    return (
        <Container>
            {isLoading 
            ? <Loading />
            : <>
            {!step && (
                <>
                    <Question>????????? ?????? ????????????????</Question>
                    <ThingsContainer>
                        {longterms.map(target => 
                            <TargetTitle onClick={onClickSelection} value={JSON.stringify(target)}>{target.display}
                        </TargetTitle>
                        )}
                    </ThingsContainer>
                    <ThingsContainer>
                        {shortterms.map(target => 
                            <TargetTitle onClick={onClickSelection} value={JSON.stringify(target)}>{target.display}
                        </TargetTitle>
                        )}
                    </ThingsContainer>
                    <ThingsContainer>
                        {plans.map(target => 
                            <TargetTitle onClick={onClickSelection} value={JSON.stringify(target)}>{target.display}
                        </TargetTitle>
                        )}
                    </ThingsContainer>
                    <WantContainer>
                        <WantLabel>????????? ??????</WantLabel>
                        <AnswerInput onChange={onChange} name="want" value={want} type="text" />
                        <AnswerNextBtn onClick={onClick} name="want">??? ?????? ??????</AnswerNextBtn>
                    </WantContainer>
                </>
            )}
            {step === 1 && (
                <>
                    <Question>{selection.display}??? ?????? ?????????????????? ?????? ??????????</Question>
                    <span>(ex. ?????? ?????? : ???)</span><br />
                    <AnswerInput onChange={onChange} name="need" value={need} type="text" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>????????????</AnswerPrevBtn>
                        <AnswerNextBtn name="need" onClick={onClick}>????????????</AnswerNextBtn>
                    </BtnContainer>
                </>
            )}
            {step === 2 && (
                <>
                    <Question>
                        ??? ?????? ?????? ????????? ?????????????
                    </Question>
                    <span></span><br />
                    <AnswerInput onChange={onChange} name="date"  value={date} type="number" />
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
                        ????????? ????????? ????????? ??? ??? ?????? ????????? ?????????????
                    </Question>
                    <span></span><br />
                    <AnswerInput onChange={onChange} name="prize"  value={prize} type="text" />
                    <BtnContainer>
                        <AnswerPrevBtn onClick={onClickPrev}>
                            ????????????
                        </AnswerPrevBtn>
                        <AnswerNextBtn name="prize" onClick={onClick}>
                            ????????????
                        </AnswerNextBtn>
                    </BtnContainer>
                </>
            )}    
            {step === 4 && (
                <TargetContainer>
                    <TargetContent>
                        ?????? : {selection.display}
                    </TargetContent>
                    <TargetContent>
                        ????????? ??? : {need}
                    </TargetContent>
                    <TargetContent>
                        ?????? ?????? : {date}?????? ??? ???
                    </TargetContent>
                    <TargetContent>
                        {prize && `?????? : ${prize}`}
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
                    {selection && `?????? : ${selection.display}`}
                </TargetContent>
                <TargetContent>
                    {need && `????????? ??? : ${need}`}
                </TargetContent>
                <TargetContent>
                    {date && `?????? ?????? : ${date}?????? ??? ???`}
                </TargetContent>
                <TargetContent>
                    {prize && `?????? : ${prize}`}
                </TargetContent>
            </TargetContainer>
            }
            </>
            }
            <HomeBtn onClick={goHome}>
                ?????????
            </HomeBtn>
        </Container>
    )
}

export default RoutineFinding;