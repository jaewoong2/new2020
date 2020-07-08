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
            cursor : 'hand',
            width : '60%',
            maxHeight: '480px',
        }
    })

    const styleImg = useMemo(() => {
        return {
            display : 'block',
            margin : 'auto',
            // 중간
            maxWidth : '70vw',
            maxHeight : '100%',
            // 이미지 태그에선 높이랑 너비를 직접 주면안됨
            boxShadow: '0.1px 0.1px 0.1px #000',
            cursor : 'hand',
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