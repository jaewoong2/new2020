import React, { useState, useEffect, useCallback } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Checkbox,
    Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducer/user';
import  Router from 'next/router';

const SignUp = () => {
    const { signUpLoading, signUpDone } = useSelector(state => state.user);
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const onFinish = useCallback((values) => {
       dispatch({
           type : SIGN_UP_REQUEST,
           data : values
       });
       !signUpLoading && Router.replace('/')
    }, [signUpLoading]);

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
            <div>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: '이메일을 입력 해주세요',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: '비밀번호를 입력해주세요',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '비밀번호를 확인 해야합니다',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('비밀번호가 일치 하지 않습니다.');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="nickname"
                    label={
                        <span>
                            Nickname&nbsp;
            <Tooltip title="당신의 별명은 무엇인가요?">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[{ required: true, message: '닉네임을 설정해주세요', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        { validator: (_, value) => value ? Promise.resolve() : Promise.reject('동의 하셔야 합니다.') },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        <a>약관</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button loading={signUpLoading} type="primary" htmlType="submit">
                        회원가입
        </Button>
                </Form.Item>
            </Form>
            </div>
    );
};

export default SignUp;