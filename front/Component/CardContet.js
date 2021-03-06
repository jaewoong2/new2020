import React, { useCallback, useEffect } from 'react';
import { Card, Col, message, Carousel, Tooltip } from 'antd';
import { ShoppingTwoTone, LoadingOutlined, TagOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_TO_CART_REQUEST, ITEM_BYE_CART_REQUEST } from '../reducer/user';
import Link from 'next/link';
import { useMemo } from 'react';
import { DELETE_POST_REQUEST } from '../reducer/post';
import styled from 'styled-components';
import  Router from 'next/router';

const { Meta } = Card;


const Styledimage = styled.img`
    transition: box-shadow 0.5s;
    &:hover {
        box-shadow: 1px 4px 8px 1px rgba(0, 0, 0, 0.7), 1px 6px 20px 1px rgba(0, 0, 0, 0.69);
    }    
`

const CarouselImage = styled(Carousel)`
text-align: center;
overflow: hidden;
`


const CardContet = ({ content }) => {

    const dispatch = useDispatch();
    const {  itemToCartLoading, me, itemByeCartLoading } = useSelector(state => state.user);
    const { deletePostLoading, deletePostError } = useSelector((state) => state.post);

    const onClicktoCart = useCallback(() => {
        if(!me?.email) {return message.warn('로그인 후 이용가능합니다')}
        
        if(!me?.Carts?.find(v => v.id === content.id)) {
             dispatch({
                type : ITEM_TO_CART_REQUEST,
                data : content.id
            })
            !itemToCartLoading && message.info('장바구니에 담는 중...')
        }
    
       if(me?.Carts?.find(v => v.id === content.id)) {
            dispatch({
               type : ITEM_BYE_CART_REQUEST,
               data : content.id
            });
            !itemByeCartLoading && message.info('장바구니에서 빼는 중...')
        }
        
    },[itemToCartLoading, me, itemByeCartLoading]) 

    const styledImg = useMemo(() => {
        return {
            display : 'block',
            width : '100%',
            margin : '0',
        }
    },[])

    const onClickRemove = useCallback(() => {
        me?.id === content.UserId && dispatch({
            type : DELETE_POST_REQUEST,
            data : content.id
        })
        !deletePostError && !deletePostLoading && message.success('게시글 삭제')
    },[deletePostError, deletePostLoading, me])


    const onClickItem = useCallback(() => {
        Router.replace(`/page/${content.id}`)
    },[])

    return (
        <>
        <Col xs={12} md={8}>
    <Card
    key={`${content?.id}_${content?.title}_${content?.UserId}__`}
    bordered={false}
    title={<Tooltip title={content.title}><span onClick={onClickItem}>{content.title}</span></Tooltip>}
    extra={me?.id === content.UserId ? (!deletePostLoading ? <div onClick={onClickRemove}><a href="#">삭제</a></div> : <LoadingOutlined/>) : <TagOutlined/>}
    style={{ width: '100%' }}
    cover={<CarouselImage draggable autoplay>
        {content?.Images?.map((v) => {
            if(!v?.InfoId) { 
            return (<div>
           {v?.src ? (<Styledimage onClick={onClickItem} key={`${content.id}${me?.id}_imgcover`} style={styledImg} alt="example" src={`http://localhost:3055/${v.src}`}/>) :
           (<div>이미지</div>)}
            </div>) 
            }
        })}
        </CarouselImage>}
    actions={[
        <span>{content.price ? `${content.price} 원` : 'free'}</span>,
        // itemToCartLoading || itemByeCartLoading  ? <LoadingOutlined />
         <ShoppingTwoTone onClick={onClicktoCart} twoToneColor={me?.Carts?.find(v => v?.Cart?.PostId === content.id) ? 'gray' : '#3f9e13e1'} />
    ]}
    >
    <Meta description={content.PostHashTags.map((v =>{return <Link href={`/hashtag/${v.name}`}><a>{`#${v.name} `}</a></Link>}))}/>
  </Card>
        </Col>
        </>
    );
};

export default CardContet;