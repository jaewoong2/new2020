import React from 'react';
import NavBar from './NavBar'
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import Sliders from './imgCarousel/Slider';


const AppLayout = ({ children, name }) => {
  const router = useRouter();  
  return (
    <div>
      <NavBar name={name} />
      {!router.pathname.slice(1) && <Sliders/>}
      {router?.pathname?.slice(1)?.split('/')[1] === '[tag]' && <Sliders/>}
      <Row justify="center" align="middle" gutter={8}>
        {/* gutter => col간에 간격 */}
        <Col xs={24} md={3}/>
        <Col xs={24} md={18}>
          {children}
        </Col>
        <Col xs={24} md={3}>
        </Col>
      </Row>
    </div>

  );
};

export default AppLayout;
