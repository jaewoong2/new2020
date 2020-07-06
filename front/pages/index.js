import Head from 'next/head'
import AppLayout from '../Component/AppLayout'
import CardComponent from '../Component/CardComponent'

export default function Home() {
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
