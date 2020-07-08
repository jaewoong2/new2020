import React, { useEffect, useState } from 'react';
import SignUp from './SignUpForm';
import LoginForm from './LoginForm';
import { Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import  Router from 'next/router';

const ModalForm = ({ name }) => {
    const { loginDone, me } = useSelector((state) => state.user);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if(name === "SignUp" && me?.email) {
            message.warn('로그아웃 하신 후에 가능합니다')
            Router.replace('/')
        }
        if(me?.email) {
            setVisible(false)
        }
    },[me])

    return (
        <Modal
        title={name}
        visible={visible} // false => 안보이게 true => 보이게
        maskClosable={false}
        onCancel={() => { name !=="SignUp" && setVisible(false)}}
        footer
      >
        {name === "SignUp" ? <SignUp /> : <LoginForm/>}
      </Modal>
    );
};

export default ModalForm;