import { select } from 'd3-selection';
import React, { useEffect, useState } from 'react';
import ReactWordcloud from "react-wordcloud";
import styled from 'styled-components';
import Loading from '../loading/Loading';
import { db } from './valueDB';

const Container = styled.div``;

const Wordcloud = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dbWords, setDbWords] = useState([]);

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
        fontFamily: 'SsurroundAir'
    }

    const getCallback = (callback) => {
        return function (word, event) {
          const isActive = callback !== "onWordMouseOut";
          const element = event.target;
          const text = select(element);
          text.on("click", () => {
            if (isActive) {
              console.log(word.text);
            }
          })
    
        }
      }
    
      const callbacks = {
        onWordClick: getCallback("onWordClick"),
        onWordMouseOver: getCallback("onWordMouseOver"),
        onWordMouseOut: getCallback("onWordMouseOut")
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
                {dbWords.length && <ReactWordcloud 
                style={{margin: "15px 0", backgroundColor:"rgba(255,255,255,0.7)", border:"1px solid black", borderRadius:"10px", height:"50vh"}}
                callbacks={callbacks}
                options={options}
                words={dbWords} />}
            </Container>
            }
        </>
    );
};

export default Wordcloud;