import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { HomeOutlined, AppstoreOutlined, SettingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { Menu, Modal } from 'antd';
import LoginForm from './LoginForm';
import ModalForm from './ModalForm';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducer/user';
const { SubMenu } = Menu;

const NavBar = () => {
    const [current, setCurrent] = useState('');
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [modal, setModal] = useState(false);

    
    const style = useMemo(() => {
        return {
            float : 'right'
          }
    },[]);
    
    const handleClick = (e) => {
        setCurrent(e.key)
    }
    
    useEffect(() => {
        if(current ==='logout') {        
        dispatch({
            type : LOG_OUT_REQUEST
        })
    }
    },[])
    
    const onModal = useCallback(() => {
        setModal(prev => !prev)
    },[])

    return (
        <div  style={{ width : '100%', display : "flex"}}>
        <Menu onClick={handleClick} style={{ width : '100%'}} selectedKeys={current} mode="horizontal" overflowedIndicator={<div style={style}>...</div>} >
            <Menu.Item key="Home" icon={<HomeOutlined />}>
                <Link href="/"><a>Home</a></Link>
            </Menu.Item>
            <Menu.Item key="upload" icon={<AppstoreOutlined />}>
                <Link href="/upload"><a>Upload</a></Link>
            </Menu.Item>
            {!me?.email ? 
            (<Menu.Item key="login" style={style} icon={<AppstoreOutlined />}>
                <a onClick={onModal}>로그인</a>
            </Menu.Item>) : 
            (<Menu.Item key="logout" style={style} icon={<AppstoreOutlined />}>
                <a>로그아웃</a>
            </Menu.Item>)}
            <SubMenu style={style} icon={<SettingOutlined />} title="">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1"><Link href="/cart"><a>장바구니</a></Link></Menu.Item>
                    <Menu.Item key="setting:2"></Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>
                {modal && <ModalForm name="Login"/>}
            </div>
    );
};

export default NavBar

// 
