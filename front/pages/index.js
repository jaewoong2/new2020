import Head from 'next/head'
import AppLayout from '../Component/AppLayout'
import CardComponent from '../Component/CardComponent'
import { LOAD_MY_INFO_REQUEST } from '../reducer/user'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type : LOAD_MY_INFO_REQUEST
    })

  },[])

  return (
    <div className="container">
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
