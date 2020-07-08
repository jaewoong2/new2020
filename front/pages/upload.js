import React, { useCallback, useState, useRef, useEffect } from 'react';
import AppLayout from '../Component/AppLayout';
import { Upload, Button, Form, Input, Row, Col, message } from 'antd';
import { UploadOutlined, DeleteOutlined, LineOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import faker from 'faker';
import { UP_LOAD_POST_REQUEST } from '../reducer/post';
import Router, { useRouter } from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../reducer/user';
import hashtag from '../../back/models/hashtag';

const imagePaths = [ faker.image.image(),faker.image.image(), faker.image.image()];

const upload = () => {
    const [content, setContent] = useState('');    
    const [title, setTitle] = useState('');    
    const [price, setPrice] = useState(0);   
    const [hashtag, setHashtag] = useState('')

    const { me } = useSelector((state) => state.user);
    const { upLoadPostDone, upLoadPostLoading } = useSelector(state => state.post)
    const router = useRouter();
    const imageInput = useRef();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
          type : LOAD_MY_INFO_REQUEST
        })
      },[])

      useEffect(() =>{
        if(!me?.email) {
            message.warn('로그인한 회원만 접근 할 수 있습니다.')
            Router.replace('/')
        }
      },[me])

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    },[imageInput.current])

    const onChangeInput = useCallback((e) => {
        console.log('images', e.target.files) // 우리가 선택한 이미지 정보
        // const imageFormData = new FormData(); // multer 가 처리하기 위해
        // [].forEach.call(e.target.files, (f) => {
        //     imageFormData.append('image', f); // 키, 값 ( upload.array('image') ) 의 키('images) 값이랑 같아야함
        //     console.log(imageFormData)
        // });
        dispatch({
            type : 'UPLOAD_IMAGES_REQUEST',
            data : e.target.files
        })
    });

    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    },[])

    const onChangeHashtag = useCallback((e) => {
        setHashtag(e.target.value);
    },[])

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    },[])

    const onChangePrice = useCallback((e) => {
        setPrice(parseInt(e.target.value, 10));
    },[])

    const onRemoveItem =() => {
        // 구현 해야함
    }

    const onImageUpload = useCallback(() =>{
        const arrHash = [];

        hashtag?.split(/(#[^\s#]+)/g).map(((v) => {
            if (!v.match(/(#[^\s#]+)/g)) {
                if(v.trim() !== "") {
                    arrHash.push(v)
                }
            }}));

            if(arrHash.length > 0) {
                console.log(arrHash)
                return  message.warn('해쉬태그만 사용해주세요')
            } else {
                dispatch({
                    type : UP_LOAD_POST_REQUEST,
                    data : {
                        description : content,
                        image : imagePaths,
                        title : title,
                        price : String(price),
                        hashtag : hashtag
                    }
                })
                !upLoadPostLoading && Router.replace('/');
                !upLoadPostLoading && message.info('업로드 되었습니다.')
            }
    },[content, title, imagePaths, price, hashtag])
    

    return (
        <AppLayout>
            <Row style={{ marginLeft :'10px', marginRight : "10px" }} gutter={24}>
                {imagePaths.map((v, i) => {
                  return  (
                      <>
                          <Col xs={12} md={12}>
                          <div key={v} style={{width: '100%', height: '100%'}}>
                              <MinusSquareOutlined onClick={onRemoveItem} style={{marginTop : '10px', color: 'rgb(234, 16, 34)' ,fontSize: '16px', float : 'right'}}/>
                            <img src={v} style={{ width : '100%'}} alt={v} />
                        {/* <img src={`http://localhost:3055/${v}`} style={{ width :'200px' }} alt={v}/> */}
                    </div>
                        </Col>
                        </>
                  )
                })}
            </Row>
            <br/><br/><br/>
            <div>
            <Form style={{ marginLeft : '10px', marginRight : '10px' }} encType="multipart/form-data" onFinish={onImageUpload}>
            <label>Title</label>
            <Input type='text' value={title} onChange={onChangeTitle}></Input>
            <br/><br/>
            <Input.TextArea 
             value={content}
             onChange={onChangeContent}
             style={{ minHeight : '320px' }}
             placeholder="상품소개"
            />
            <Input style={{ marginTop : "10px" }} type="number" value={price}  placeholder="가격" onChange={onChangePrice}></Input>
            <Input style={{ marginTop : "10px" }}  required={true} type="text" value={hashtag}  placeholder="해쉬태그" onChange={onChangeHashtag}></Input>
              <div style={{ marginTop : "10px" }}>
                <input type="file" name='image' multiple hidden ref={imageInput} onChange={onChangeInput}/>
                <Button onClick={onClickImageUpload}>
                    이미지 업로드
                </Button>
                <Button htmlType="submit" type="primary" style={{float:'right'}} htmlType="submit">
                    업로드
                </Button>
            </div>
            
            </Form>
            </div>
        </AppLayout>
    );
};

export default upload;
