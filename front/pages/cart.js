import React, { useState, useEffect } from 'react';
import AppLayout from '../Component/AppLayout';
import { List ,message, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingTwoTone } from '@ant-design/icons';
import { useCallback } from 'react';
import { ITEM_BYE_CART_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducer/user';

const cart = () => {
    const { me } = useSelector(state => state.user); 
    const [sum, setSum] = useState(0);
    const dispatch = useDispatch();

    const onClicktoCart = useCallback((id) => () => {
      dispatch({
        type : ITEM_BYE_CART_REQUEST,
        data : id
      });
      message.info('장바구니에서 상품을 빼는 중 입니다.')
    },[])
    
    useEffect(() => {
      dispatch({
        type : LOAD_MY_INFO_REQUEST
      })

    },[])

    useEffect(() => {
      setSum(0);
      me?.Carts?.map(v => {
        setSum(prev => prev + v.price)
      })
    },[me?.Carts])

    const onPayCart = useCallback(() =>{
      // 구현 해야함
    },[])

    return (
        <AppLayout>
            <List
        itemLayout="horizontal"
        dataSource={me?.Carts}
        loading={false}
        renderItem={item => (
          <List.Item
            actions={[<ShoppingTwoTone onClick={onClicktoCart(item.id)} twoToneColor='gray'/>]}
          >
            {/* <Skeleton avatar title={true}  active> */}
              <List.Item.Meta
                avatar={
                  <img style={{ width : 150 }} src={item.image} />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
              <span color='gray' style={{ fontSize : 'large' }}>{item.price}원</span>
            {/* </Skeleton> */}
          </List.Item>
        )}
      />
      <hr/>
          <List
          >
            <List.Item
              actions={[<Button size="large" onClick={onPayCart} type="primary">결제</Button>]}
            >
            <List.Item.Meta
            avatar={
              <div style={{ width : 150,  fontSize : 32}}>결제금액</div>
            }
            description={<div style={{marginLeft : 20 , fontSize : 32}}>{sum} 원</div>}
            >
            </List.Item.Meta>
            </List.Item>
          </List>

          
        </AppLayout>
    );
};

export default cart;