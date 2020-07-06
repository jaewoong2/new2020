import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducer/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { signUpInfo , loginLoading} = useSelector((state) => state.user)

    const onFinish = values => {
        console.log('Received values of form: ', values);
        
      if(signUpInfo.find(v => v.email === values.email && v.password === values.password)){
        dispatch({
          type : LOG_IN_REQUEST,
          data : {
            email : values.email,
            password : values.password
          }
        })
      } else {
        message.warn('존재 하지 않는 아이디 입니다')
      }
      };

    return (
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input type="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>
        
              <Form.Item>
                <Button loading={loginLoading} type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                 <Link href="/signup"><a style={{ float : 'right'}} >Register</a></Link>
              </Form.Item>
            </Form>
          );
};

export default LoginForm;
