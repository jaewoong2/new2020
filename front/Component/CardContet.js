import React, { useCallback, useEffect } from 'react';
import { Card, Col, message } from 'antd';
import { ShoppingTwoTone, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_TO_CART_REQUEST, ITEM_BYE_CART_REQUEST } from '../reducer/user';

const { Meta } = Card;


const CardContet = ({ content }) => {
    const dispatch = useDispatch();
    const {  itemToCartLoading, me, itemByeCartLoading } = useSelector(state => state.user);

    const onClicktoCart = useCallback(() => {
        !me?.email && message.warn('로그인 후 이용가능합니다')
        
        if(!me?.Carts.find(v => v.id === content.id)) {
             dispatch({
                type : ITEM_TO_CART_REQUEST,
                data : content
            })
            !itemToCartLoading && message.info('장바구니에 담는 중...')
        }
    
       if(me?.Carts.find(v => v.id === content.id)) {
            dispatch({
               type : ITEM_BYE_CART_REQUEST,
               data : content.id
            });
            !itemByeCartLoading && message.info('장바구니에서 빼는 중...')
        }


    },[itemToCartLoading, me, itemByeCartLoading]) 


    

    return (
        <>
        <Col xs={12} md={8}>
    <Card
    bordered={false}
    extra={<div style={{color : 'red'}}>{content.title}</div>}
    hoverable
    style={{ width: '100%' }}
    cover={<img alt="example" src={content.image} />}
    actions={[
        <span>{content.price ? `${content.price} 원` : 'free'}</span>,
        // itemToCartLoading || itemByeCartLoading  ? <LoadingOutlined />
         <ShoppingTwoTone onClick={onClicktoCart} twoToneColor={me?.Carts.find(v => v.id === content.id) ? 'gray' : '#3f9e13e1'} />
    ]}
    >
    <Meta description={content.description} />
  </Card>
        </Col>
        </>
    );
};

export default CardContet;