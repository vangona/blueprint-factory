import { select } from 'd3-selection';
import React, { useEffect, useState } from 'react';
import ReactWordcloud from "react-wordcloud";
import styled from 'styled-components';
import { defaultBtnAction } from '../../../css/styleConstants';
import Loading from '../../loading/Loading';
import { db } from './valueDB';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
  font-family: Ssurround;
  font-size: 20px;
  width: 50%;
  word-break: keep-all;
`;

const SearchContainer = styled.div``;

const SearchInput = styled.input``;

const PlusBtn = styled.button``;

const Error = styled.span``;

const WordCloudContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const WordListContainer = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WordList = styled.ol`
  line-height: 140%;
`;

const WordListComponent = styled.li`
  font-family: SsurroundAir;
  ${defaultBtnAction};
`;

const Wordcloud = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dbWords, setDbWords] = useState([]);
    const [interestArr, setInterestArr] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [error, setError] = useState('');

    const getWords = () => {
        let wordsDB = [];

        for (let i = 0; i < db.length; i++) {
            const dbObj = {
                text: db[i],
                value: 1,
            }
            wordsDB.push(dbObj);
        }

        setDbWords(wordsDB);
        setIsLoading(false);
    }

    const options = {
        rotationAngles: [0, 0],
        rotations: 10,
        padding: 5,
        deterministic: true,
        fontSizes: [14, 26],
        transitionDuration: 1000,
        fontFamily: 'SsurroundAir',
    }

    const getCallback = (callback) => {
        return function (word, event) {
          const isActive = callback !== "onWordMouseOut";
          const element = event.target;
          const text = select(element);
          text.on("click", () => {
            if (isActive) {
              if (interestArr.length < 5) {
                if (interestArr.includes(word.text)) {
                  setError('같은 단어는 하나만 추가할 수 있어요.');
                } else {
                  setInterestArr((prev) => [word.text, ...prev]);
                  setError('');  
                }
              } else {
                setError('5개까지만 추가할 수 있어요.')
              }
            }
          })
        }
      }
  
    const callbacks = {
      onWordClick: getCallback("onWordClick"),
      onWordMouseOver: getCallback("onWordMouseOver"),
      onWordMouseOut: getCallback("onWordMouseOut")
    }

    const onClickInterest = (e) => {
      const deleted = interestArr.filter((_, index) => index !== parseInt(e.target.id));
      setInterestArr(deleted);
    }

    const onChangeSearch = (e) => {
      setSearchWord(e.target.value);
    }

    const onClickPlus = () => {
      if(!searchWord) return;
      if (interestArr.length < 5) {
        setInterestArr((prev) => [searchWord, ...prev]);
        setSearchWord('');
        setError('');
      } else {
        setError('5개까지만 추가할 수 있어요.')
      }
    }

    useEffect(() => {
        getWords();
    }, []);

    return (
        <>
            {isLoading 
            ? <Loading />
            :        
            <Container>
                <Title>
                  6개월 동안 시간을 가장 많이 쓴 곳이 어디인가요?
                </Title>
                {dbWords.length && 
                <WordCloudContainer>
                  <ReactWordcloud 
                  style={{padding: "15px", backgroundColor:"rgba(255,255,255,0.7)", border:"1px solid black", borderRadius:"10px", height:"35vh"}}
                  callbacks={callbacks}
                  options={options}
                  words={dbWords}
                  maxWords={30}
                  />
                </WordCloudContainer>
                }
                <SearchContainer>
                  <SearchInput value={searchWord} onChange={onChangeSearch} />
                  <PlusBtn onClick={onClickPlus}>
                    +
                  </PlusBtn>
                </SearchContainer>
                <Error>{error}</Error>
                <WordListContainer>
                  <WordList>
                    {interestArr.map((word, index) => (
                      <WordListComponent id={index} onClick={onClickInterest}>
                        {word}
                      </WordListComponent>
                    ))}
                  </WordList>
                </WordListContainer>
            </Container>
            }
        </>
    );
};

export default Wordcloud;