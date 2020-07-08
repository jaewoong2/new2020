import Head from 'next/head'
import AppLayout from '../Component/AppLayout'
import CardComponent from '../Component/CardComponent'
import { LOAD_MY_INFO_REQUEST } from '../reducer/user'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_POST_REQUEST } from '../reducer/post'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import { message } from 'antd'

export default function Home() {
  const { infiniteScroll, mainPosts, loadPostLoading, loadPostDone } = useSelector((state) => state.post)
  const dispatch = useDispatch();
  const myRef = useRef(null);

  useEffect(() => {
    dispatch({
      type : LOAD_MY_INFO_REQUEST
    })
  },[])

  useEffect(() => {
    mainPosts.length === 0 && dispatch({ 
      type : LOAD_POST_REQUEST
    })
  },[mainPosts])


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
