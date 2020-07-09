import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { HomeOutlined, AppstoreOutlined, SettingOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { Menu, Modal, message, Input } from 'antd';
import LoginForm from './LoginForm';
import ModalForm from './ModalForm';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducer/user';
import styled from 'styled-components';
const { SubMenu } = Menu;


const SearchInput = styled(Input.Search)`
    vertical-align : middle;
`;


const NavBar = () => {
    const [current, setCurrent] = useState('');
    const [clickSearch, setClickSearch] = useState(false);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const { me, loginLoading, loginDone } = useSelector((state) => state.user);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if(search) {
            setClickSearch(true)
        }
        if(!search) {
            setClickSearch(false)
        }
    },[search])


    const style = useMemo(() => {
        return {
            float : 'right'
          }
    },[]);

    const styleDIv = useMemo(() => {
        return {
            width : '100%', 
            display : "flex"
          }
    },[]);

    const styleMenu = useMemo(() => {
        return {
            width : '100%'
          }
    },[]);

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const onChangeSearch = useCallback((e) =>{
        setSearch(e.target.value)
    }, [])
    
    const onLogOutClick = useCallback(() => {
        dispatch({
            type : LOG_OUT_REQUEST
        })
         loginDone && loginLoading && message.success('로그아웃 성공')
    },[loginDone, loginLoading])
    
    const onModal = useCallback(() => {
        setModal(prev => !prev)
    },[])

    const onSearch = useCallback(() => {
        message.info('구현 중 입니다')
        // Router.push(`/hashtag/${search}`)
    },[search])

    return (
        <div  style={styleDIv}>
        <Menu onClick={handleClick} style={styleMenu} selectedKeys={current} mode="horizontal" overflowedIndicator={<div style={style}>...</div>} >
            <Menu.Item key="Home" icon={<HomeOutlined />}>
                <Link href="/"><a>Home</a></Link>
            </Menu.Item>
            <Menu.Item key="upload" icon={<AppstoreOutlined />}>
                <Link href="/upload"><a>Upload</a></Link>
            </Menu.Item>
            <Menu.Item onClick={() => {!clickSearch && setClickSearch(true)}}>
            {!clickSearch ?
                <SearchOutlined /> :
                    (<SearchInput 
                    value={search}
                    onChange={onChangeSearch}
                    onSearch={onSearch}
                    enterButton='검색'/>
                )}
                </Menu.Item>
            {!me?.email ? 
            (<Menu.Item key="login" style={style} icon={<AppstoreOutlined />}>
                <a onClick={onModal}>로그인</a>
            </Menu.Item>) : 
            (<Menu.Item  key="logout" onClick={onLogOutClick} style={style} icon={<AppstoreOutlined />}>
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
