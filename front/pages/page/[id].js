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

const hundered = Array(100).fill(0).map((v, i) => v = i + 1);
const { Option } = Select;

const Buybutton = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 4px 4px 4px 4px;
    background-color: blue;
    position: fixed;
    bottom: 30px;
    right: 40px; 
    box-shadow: -0.1px -0.1px 11px blue;
    cursor: pointer;
    font-size : 30px;
`;

const page = () => {
    const [number, setNumber] = useState(1);

    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { onePost } = useSelector(state => state.post);
    

    useEffect(() => {
        dispatch({
            type : LOAD_MY_INFO_REQUEST
        })
        dispatch({
            type : LOAD_ONE_POST_REQUEST,
            id : id
        })
    },[]);

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

    const style = useMemo(() => {
        return {
            height: '20%',
            lineHeight: '20%',
            background: '#dfdfdfec',
            overflow: 'hidden',
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
    
    return (
        <div>
        <NavBar/>        
           <Row justify="center" align="middle" gutter={8}>
           {/* gutter => col간에 간격 */}
           <Carousel style={style} autoplay draggable={true}>
                {onePost?.Images?.map(v => {
                    return (
                        <div style={styleDiv}>
                <img style={styleImg} src={`http://localhost:3055/${v.src}`}></img>
                        </div>
                    )
                })}
            </Carousel>
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
            {hundered.map((v) => {
                return (
                <Option value={v}>{`${v} 개`}</Option>
                )
            })}
        </Select>
            <div style={styledDiv}>{onePost?.description}</div>
           </Col>
           <Col xs={24} md={2}>
            <div style={divStyleWithBuyBtn}><DollarOutlined/></div>
           </Col>
         </Row>
      </div>

    );
};

export default page;
