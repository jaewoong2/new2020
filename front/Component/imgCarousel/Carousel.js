import React from 'react';
import styled from "styled-components"

const Img = styled.img`
    width : 100%;
    height : 70vh;
`

const Carousel = ({ img }) => {
    return (
        <Img src={img}/>
    );
};

export default Carousel;