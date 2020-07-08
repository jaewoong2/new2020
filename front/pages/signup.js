import React, { useState } from 'react';
import AppLayout from '../Component/AppLayout';
import ModalForm from '../Component/ModalForm';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { message } from 'antd';
import Router from 'next/router';

const signup = () => {
  const { me } = useSelector((state) => {return state.user});
  

  useEffect(() => {
    me && message.error('로그아웃 후 이용 부탁 드립니다.')
    Router.replace('/')
  },[me])

    return (
      <AppLayout>
        <ModalForm name="SignUp"/>
      </AppLayout>
    );
};

export default signup;

