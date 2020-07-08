import React, { useRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../../reducer/user';
import { LOAD_ONE_POST_REQUEST } from '../../reducer/post';
import { Carousel, Select, Row, Col, Typography } from 'antd';
import NavBar from '../../Component/NavBar';
import Link from 'next/link';

const hundered = Array(100).fill(0).map((v, i) => v = i + 1);
const { Option } = Select;

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

    
    const style = useMemo(() => {
        return {
            height: '20%',
            lineHeight: '20%',
            background: '#dfdfdfec',
            overflow: 'hidden',
        }
    })

    const styledDiv = useMemo(() => {
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
           <Col xs={24} md={2}/>
           <Col xs={24} md={20}>
           <Carousel style={style} autoplay draggable={true}>
                {onePost?.Images?.map(v => {
                    return (
                        <div style={styleDiv}>
                <img style={styleImg} src={v.src}></img>
                        </div>
                    )
                })}
            </Carousel>
            <div>
            <Typography.Text style={{ marginTop: '7px', float: 'right' }} keyboard>{onePost?.PostHashTags?.map(v => (<Link href="#" ><a>{`#${v.name} `}</a></Link>))}</Typography.Text>
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
           </Col>
         </Row>
      </div>

    );
};

export default page;
