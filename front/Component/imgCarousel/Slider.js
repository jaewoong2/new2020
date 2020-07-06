import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Carousel } from 'antd';
import  { RightOutlined, LeftOutlined } from '@ant-design/icons';
import faker from 'faker'

const Sliders = () => {
    
    const carouselRef = useRef();

    const style = useMemo(() => {
        return {
            height: '20%',
            lineHeight: '20%',
            background: '#dfdfdfec',
            overflow: 'hidden',
        }
    })

    const styleDiv = useMemo(() => {
        return {
            height: '20%',
            cursor : 'hand'
        }
    })

    const styleImg = useMemo(() => {
        return {
            display : 'block',
            margin : 'auto',
            height : '100%',
            boxShadow: '5px 5px 5px #000',
            position : 'relative',
            cursor : 'hand'
        }
    })

    const onClickImg = useCallback(() => {

    },[])

 
    return (
        <Carousel style={style} autoplay draggable={true} >
        <div style={styleDiv}>
          <img style={styleImg} onClick={onClickImg} src={faker.image.image()}></img>
        </div>
        <div style={styleDiv}>
          <img style={styleImg} onClick={onClickImg} src={faker.image.image()}></img>
        </div>
        <div style={styleDiv}>
          <img style={styleImg} onClick={onClickImg} src={faker.image.image()}></img>
        </div>
        <div style={styleDiv}>
          <img style={styleImg} onClick={onClickImg} src={faker.image.image()}></img>
        </div>
      </Carousel>
    )
};

export default Sliders;