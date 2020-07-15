import React, { useRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../../reducer/user';
import { LOAD_ONE_POST_REQUEST } from '../../reducer/post';
import { Carousel, Select, Row, Col, Typography } from 'antd';
import NavBar from '../../Component/NavBar';
import Link from 'next/link';
import styled from 'styled-components';
import { DollarOutlined } from '@ant-design/icons';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const hundered = Array(100).fill(0).map((v, i) => v = i + 1);
const { Option } = Select;

const StyledImg = styled.img`
display : block;
margin : auto;
max-width : 70vw;
max-height : 100%;
cursor : hand;
`
const StyledDiv = styled.div`
display: flex;
align-content: center;
justify-content: center;
margin-top: 1.5em;
`

const StyleCarousel = styled(Carousel)`
height: 20%;
lineHeight: 20%
overflow: hidden;
`



const page = () => {
    const [number, setNumber] = useState(1);
    const dispatch = useDispatch();
    const { onePost } = useSelector(state => state.post);
    const router = useRouter();
    const { id } = router.query;

    // if(id === '39') {
    //     return (
    // onePost?.Images?.map(v => !v?.InfoId && <div key={v.id + v.src + '_div'} ><img key={v.id + v.src} src={`http://localhost:3055/${v.src}`}/></div>)
    //     )
    // }

    
    const divStyleWithBuyBtn = useMemo(() => {
        return {
            width: '45px',
            height: '45px',
            borderRadius: '9px 9px 9px 9px',
            backgroundColor: 'rgba(0, 140, 255, 0)',
            position: 'fixed',
            bottom: '30px',
            right: '40px',
            boxShadow: '-0.1px -0.1px 11px rgba(0, 0, 105, 0.534)',
            cursor: 'pointer',
            fontSize : '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
    
        const styledDiv = useMemo(() => { // description
            return {
                display : 'block',
                margin : 'auto',
               marginTop : '7px',
               width: '95%',
            }
        })

    const style = useMemo(() => {
        return {
          
        }
    })


    const styleDiv = useMemo(() => {
        return {
            maxHeight: '20%',
            cursor : 'hand',
            width : '60%',
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
            cursor : 'hand',
        }
    })

    const styleSelector = useMemo(() => {
        return {
            display : 'block',
            margin : 'auto',
           marginTop : '7px',
           width: '80%',
        }
    })

    const handleChange = useCallback((value) =>{
        setNumber(value)
    },[])

    const HunderedOption = useCallback(() => {
       
    },[])
    
    return (
        <>
        <NavBar/>        
           <Row justify="center" align="middle" gutter={8}>
           {/* gutter => col간에 간격 */}
           <StyleCarousel autoplay draggable={true}>
                {/* {onePost?.Images?.map((v) => (
            !v?.InfoId && (<div key={v.id + v.src + '_div'} style={styleDiv}>
                            <StyledImg key={v.id + v.src} src={`http://localhost:3055/${v.src}`}/>
                            </div>)      
                ))}             */}
                {onePost?.Images?.map(v => !v?.InfoId && <div key={v.id + v.src + '_div'} ><img key={v.id + v.src} src={`http://localhost:3055/${v.src}`}/></div>)}
            </StyleCarousel>
           <Col xs={24} md={2}/>
           <Col xs={24} md={20}>
            <div>
            <Typography.Text style={{ marginTop: '7px', float: 'right' }} keyboard>{onePost?.PostHashTags?.map(v => (<Link href={`/hashtag/${v.name}`} ><a>{`#${v.name} `}</a></Link>))}</Typography.Text>
            <Typography>
            <Typography.Title strong style={{ marginTop: '10px', marginLeft : '20px'}} >{onePost?.title}</Typography.Title>
            </Typography>
            </div>
                <Select
            labelInValue
            defaultValue={{ value: 1 }}
            style={styleSelector}
            onChange={handleChange}
        >
            {hundered.map((v, i) => {
            return (
            <Option key={v + i + 'option'} value={v}>{`${v} 개`}</Option>
            )
        })}
        </Select>
        <StyledDiv >
            {onePost?.Images?.map(v => (v?.InfoId && <img key={v.id + v.src} src={`http://localhost:3055/${v.src}`}/>))}
        </StyledDiv>
            <div style={styledDiv}>{onePost?.description}</div>
           </Col>
           <Col xs={24} md={2}>
            <div style={divStyleWithBuyBtn}><DollarOutlined/></div>
           </Col>
         </Row>
      </>

    );
};

export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = ''; // 로그인 전에는 쿠키 제거
    //로그인이 공유되는 것을 주의해야함 (내 쿠키값이 한번 넣어지고 그게 저장되서)
    if(context.req && cookie) { // 로그인 하고나서는
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_ONE_POST_REQUEST,
        data : context.params.id
    });
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END); // dispatch가 끝나는것을 기다려줌
    await context.store.sagaTask.toPromise(); // saga 서버사이드를 위해서
}); // 이부분이 home 보다 먼저 시작된다

export default page;
