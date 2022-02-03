import React from 'react';
import ReactWordcloud from "react-wordcloud";
import styled from 'styled-components';

const Container = styled.div``;

const Wordcloud = () => {
    const options = {
        rotationAngles: [0, 0],
        rotations: 10,
        padding: 5,
        deterministic: true,
        fontSizes: [14, 26],
        transitionDuration: 1000,
        fontFamily: "Kyobo Handwriting",
      }

    return (
        <Container>
            <ReactWordcloud style={{margin: "15px 0", backgroundColor:"rgba(255,255,255,0.7)", border:"1px solid black", borderRadius:"10px", height:"50vh"}} options={options} />
        </Container>
    );
};

export default Wordcloud;