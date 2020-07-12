import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import AppLayout from '../Component/AppLayout';
import { Upload, Button, Form, Input, Row, Col, message } from 'antd';
import { UploadOutlined, DeleteOutlined, LineOutlined, MinusSquareOutlined, InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import faker from 'faker';
import { UP_LOAD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducer/post';
import Router, { useRouter } from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../reducer/user';
import hashtag from '../../back/models/hashtag';
import styled from 'styled-components';
import Dragger from 'antd/lib/upload/Dragger';

const ButtonInputImage = styled(Button)`
    display : block;
    margin: auto;
    width: 35vw;
    height: 200px;
    border : 1.5px dotted #d9d9d9;
    background-color: #fafafa;
    cursor: pointer;
    transition: border-color 0.3s;
  
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    outline: none;
    box-shadow: none;
  }
  
`

const StyledInputs = styled(Input)`
    border : 0;
    border-bottom : solid 1.2px #ababab;
    width : 30%;
    &:focus {
        width : 80%;
        outline : none;
        box-shadow : none;
    }
    `
// antd는 outline 을 안쓰고 box-shadow를 쓴다

const upload = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [hashtag, setHashtag] = useState('')

    const { me, loadMyInfoLoading } = useSelector((state) => state.user);
    const { upLoadPostDone, upLoadPostLoading, imagePaths } = useSelector(state => state.post)
    const router = useRouter();
    const imageInput = useRef();
    const imageInfoInput = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST
        })
    }, [])

    useEffect(() => {
        if (!loadMyInfoLoading && !me?.email) {
            message.warn('로그인한 회원만 접근 할 수 있습니다.')
            Router.replace('/')
        }
    }, [me])

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current])

    const onChangeInput = useCallback((e) => {
        // console.log(e.target)
        console.log('images', e.target.files) // 우리가 선택한 이미지 정보
        const imageFormData = new FormData(); // multer 가 처리하기 위해
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f); // 키, 값 ( upload.array('image') ) 의 키('images) 값이랑 같아야함
            console.log(imageFormData)
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData
        })
    });


    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, [])

    const onChangeHashtag = useCallback((e) => {
        setHashtag(e.target.value);
    }, [])

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, [])

    const onChangePrice = useCallback((e) => {
        setPrice(parseInt(e.target.value, 10));
    }, [])

    const onRemoveItem = () => {
        // 구현 해야함
    }

    const onImageUpload = useCallback(() => {
        const arrHash = [];

        hashtag?.split(/(#[^\s#]+)/g).map(((v) => {
            if (!v.match(/(#[^\s#]+)/g)) {
                if (v.trim() !== "") {
                    arrHash.push(v)
                }
            }
        }));

        if (!content && !content.trim()) {
            return message.warn('게시글을 작성 해주세요');
        }

        if (arrHash.length > 0) {
            console.log(arrHash)
            return message.warn('해쉬태그만 사용해주세요')
        } else {
            const formData = new FormData();
            imagePaths.forEach((image) => {
                formData.append('image', image)
            });
            formData.append('description', content)
            formData.append('title', title)
            formData.append('price', String(price))
            formData.append('hashtag', hashtag)
            dispatch({
                type: UP_LOAD_POST_REQUEST,
                data: formData
            })
            !upLoadPostLoading && Router.replace('/');
            !upLoadPostLoading && message.info('업로드 되었습니다.')
        }
    }, [content, title, imagePaths, price, hashtag])


    const marginTopStyle = useMemo(() => {
        return {
            marginTop: '10px',
            border: '0',
        }
    });

    const RowStyle = useMemo(() => {
        return {
            marginLeft: '10px',
            marginRight: "10px"
        }
    });

    const divStyle = useMemo(() => {
        return {
            width: '100%',
            height: '100%'
        }
    })

    const imgStyle = useMemo(() => {
        return {
            width: '100%'
        }
    })

    const iconStyle = useMemo(() => {
        return {
            marginTop: '10px',
            color: 'rgb(234, 16, 34)',
            fontSize: '16px',
            float: 'right'
        }
    });

    const formStyle = useMemo(() => {
        return {
            marginLeft: '10px',
            marginRight: '10px',
        }
    })

    const textAreaStyle = useMemo(() => {
        return {
            minHeight: '320px',
            border: '0',
            padding: '15px 0px 10px 20px'
        }
    })


    return (
        <AppLayout>
            <Row style={RowStyle} gutter={24}>
                {imagePaths.map((v, i) => {
                    return (
                        <>
                            <Col xs={12} md={12}>
                                <div key={v} style={divStyle}>
                                    <MinusSquareOutlined onClick={onRemoveItem} style={iconStyle} />
                                    {/* <img src={v} alt={v} /> */}
                                    <img src={`http://localhost:3055/${v}`} style={imgStyle} alt={v} />
                                </div>
                            </Col>
                        </>
                    )
                })}
            </Row>
            <br /><br /><br />
            <div>
                <Form style={formStyle} encType="multipart/form-data" onFinish={onImageUpload}>
                    <StyledInputs required={true} placeholder="상품명" key={`${me?.id} + ${me?.email} + title `} style={{ fontSize: '32px', fontWeight: 'bold' }} type='text' value={title} onChange={onChangeTitle}></StyledInputs>
                    <br /><br />
                    <input type="file" name='image' multiple hidden ref={imageInfoInput} onChange={onChangeInput} />
                    <ButtonInputImage onClick={onClickImageUpload}><InboxOutlined style={{ fontSize : 32 }}/></ButtonInputImage>
            <Input.TextArea
                        required={true}
                        value={content}
                        onChange={onChangeContent}
                        style={textAreaStyle}
                        placeholder="상품소개"
                    />
                    <StyledInputs key={`${me?.id} + ${me?.email} + price `} style={marginTopStyle} type="number" value={price} placeholder="가격" onChange={onChangePrice}></StyledInputs>
                    <br />
                    <StyledInputs key={`${me?.id} + ${me?.email} + hashtag `} style={marginTopStyle} required={true} type="text" value={hashtag} placeholder="해쉬태그" onChange={onChangeHashtag}></StyledInputs>
                    <div style={{ marginTop: '10px' }}>
                    <input type="file" name='image' multiple hidden ref={imageInput} onChange={onChangeInput} />
                        <Button onClick={onClickImageUpload}>
                            이미지 업로드
                </Button>
                        <Button htmlType="submit" type="primary" style={{ float: 'right' }} htmlType="submit">
                            업로드
                </Button>
                    </div>
                </Form>
            </div>
        </AppLayout>
    );
};

export default upload;

