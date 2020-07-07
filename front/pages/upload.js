import React, { useCallback, useState, useRef, useEffect } from 'react';
import AppLayout from '../Component/AppLayout';
import { Upload, Button, Form, Input, Row, Col, message } from 'antd';
import { UploadOutlined, DeleteOutlined, LineOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import faker from 'faker';
import { UP_LOAD_POST_REQUEST } from '../reducer/post';
import Router, { useRouter } from 'next/router';

const imagePaths = [ faker.image.image(),faker.image.image(), faker.image.image()];

const upload = () => {
    const [content, setContent] = useState('');    
    const [title, setTitle] = useState('');    
    const [price, setPrice] = useState(0);    

    const { upLoadPostDone, upLoadPostLoading } = useSelector(state => state.post)
    const router = useRouter();
    const imageInput = useRef();
    const dispatch = useDispatch();
    
    useEffect(() => {

    },[upLoadPostDone, upLoadPostLoading])

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
        dispatch({
            type : UP_LOAD_POST_REQUEST,
            data : {
                id : Math.floor(Math.random() * 1414),
                description : content,
                image : imagePaths,
                title : title,
                price : String(price)
            }
        })
        Router.replace('/');
        
    },[content, title, imagePaths, price])
    



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
