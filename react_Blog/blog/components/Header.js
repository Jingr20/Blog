import Link from 'next/link';
import Router from 'next/router';

import {Menu,Row,Col} from 'antd';
import {
    HomeOutlined,
    YoutubeOutlined,
    SmileOutlined
  } from '@ant-design/icons';


function Header(){

    function handleClick(e){
        if(e.key==0){
            Router.push('/');
        }else{
            Router.push({pathname:'/list/',query:{id:e.key}});
        }
    }

    return (
        <div className='header'>
            <Row justify='center'>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className='headerLogo'>JingR</span>
                    <span className='headerTxt'>一个不断学习的前端程序媛</span>
                </Col>
                <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                    <Menu 
                        mode='horizontal'
                        onClick={handleClick}
                    >
                        <Menu.Item key={0}>
                            <HomeOutlined/>
                            <span>博客首页</span>
                        </Menu.Item>
                       
                        <Menu.Item key={1}>
                            <YoutubeOutlined/>
                            <span>React</span>
                        </Menu.Item>
                       
                        <Menu.Item key={2}>
                            <SmileOutlined/>
                            <span>JavaScript</span>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    );
}

export default Header;