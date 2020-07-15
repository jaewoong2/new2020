import Head from 'next/head'
import AppLayout from '../Component/AppLayout'
import CardComponent from '../Component/CardComponent'
import { LOAD_MY_INFO_REQUEST } from '../reducer/user'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_POST_REQUEST } from '../reducer/post'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import { message } from 'antd'
import wrapper from '../store/configureStore'
import axios from 'axios';
import { END } from 'redux-saga'

export default function Home() {
  const { infiniteScroll, mainPosts, loadPostLoading, loadPostDone, first } = useSelector((state) => state.post)
  const dispatch = useDispatch();
  const myRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if(infiniteScroll && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length -1]?.id;
          dispatch({
            type : LOAD_POST_REQUEST,
            lastId : lastId
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  },[infiniteScroll, loadPostLoading, mainPosts])


  
  return (
    <div  ref={myRef} className="container">
      <Head>
        <title>Woong'S-page | Main</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <CardComponent/>
        </AppLayout>
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = ''; // 로그인 전에는 쿠키 제거
  //로그인이 공유되는 것을 주의해야함 (내 쿠키값이 한번 넣어지고 그게 저장되서)
  if(context.req && cookie) { // 로그인 하고나서는
      axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
      type: LOAD_POST_REQUEST,
  });
  context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END); // dispatch가 끝나는것을 기다려줌
  await context.store.sagaTask.toPromise(); // saga 서버사이드를 위해서
}); // 이부분이 home 보다 먼저 시작된다

