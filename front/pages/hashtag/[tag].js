import React, { useEffect, useRef } from 'react';
import { SEARCH_HASHTAG_REQUEST } from '../../reducer/post';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../Component/AppLayout';
import CardComponent from '../../Component/CardComponent';
import { LOAD_MY_INFO_REQUEST } from '../../reducer/user';


const hashtag = () => {
    
    const dispatch = useDispatch();
    const router = useRouter();
    const myRef = useRef(null);

    const { mainPosts, infiniteScroll, serachHashtagsLoading } = useSelector((state) => state.post)
    const { tag } = router.query;

    useEffect(() => {
        const onScroll = () => {
          if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (infiniteScroll && !serachHashtagsLoading) {
              dispatch({
                type: SEARCH_HASHTAG_REQUEST,
                lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
                data: tag,
              });
            }
          }
        };
        window.addEventListener('scroll', onScroll);
        return () => {
          window.removeEventListener('scroll', onScroll);
        };
      }, [mainPosts, mainPosts.length, infiniteScroll, tag, serachHashtagsLoading]);


    useEffect(() => {
        dispatch({
            type : SEARCH_HASHTAG_REQUEST,
            data : tag
        })
        dispatch({
            type : LOAD_MY_INFO_REQUEST
        })
    },[])


    return (
      <div  ref={myRef} className="container">
      <AppLayout>
        <CardComponent/>
        </AppLayout>
    </div>
    );
};

export default hashtag;