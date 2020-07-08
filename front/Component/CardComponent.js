import React, { useEffect } from 'react';
import CardContet from './CardContet';
import { Row, Col, message } from 'antd';
import { dummyCardMaking, LOAD_POST_REQUEST } from '../reducer/post';
import { useDispatch, useSelector } from 'react-redux';



const CardComponent = () => {
    const { mainPosts, loadPostLoading }  = useSelector(state => state.post);
    const dispatch = useDispatch();
    
    useEffect(() =>{
        loadPostLoading && message.loading('로딩 중 입니다')
    },[loadPostLoading])

    return (
        <div>
            <Row style={{ marginTop : '15px', marginLeft : '15px', marginRight : '15px'}} gutter={[24, 24]}>
            {mainPosts && mainPosts.map((v, i) => {
                return (
                    <CardContet key={i + '안녕'} content={v} />
                )
            })}
          </Row>
        </div>
    );
};

export default CardComponent;