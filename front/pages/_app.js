import React, { useMemo } from 'react';

import 'antd/dist/antd.css'

import Head from 'next/head'
import '../Component/app.css'
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';
import { Layout } from 'antd'
const { Footer } = Layout
const myApp = ( { Component, pageProps } ) => {
 
    return (
        <div>
        <Head>
            <meta charSet="utf-8"></meta>
            <title>Woong'S-page</title>
        </Head>
        <main>
            <Component {...pageProps}/>
        </main>
      
        </div>
    );
};

// export default wrapper.withRedux(withReduxSaga(NodeBird));
export default wrapper.withRedux(withReduxSaga(myApp));
