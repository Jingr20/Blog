import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import '../static/css/AdminIndex.css';

import { UserOutlined,PieChartOutlined,LaptopOutlined, FileAddOutlined } from '@ant-design/icons';


const { SubMenu } = Menu;
const {Content, Footer, Sider } = Layout;

function AdminIndex(){
    function handleClickTitle(e){
        if(e.key==='addArticle'){
            window.location.href='/index/addArticle'
        }else{
            window.location.href='/index/list'
        }
    }
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsed={false} >
                <div className="logo" style={{color:'#fff',textAlign:'center',height:'40px',lineHeight:'40px',fontSize:'18px'}}>JR-博客</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
                    onClick={handleClickTitle}
                >
                    <Menu.Item key="addArticle">
                        <LaptopOutlined/>
                        <span>添加文章</span>
                    </Menu.Item>
                    <Menu.Item key="list">
                        <PieChartOutlined/>
                        {/* <UserOutlined/> */}
                        <span>文章列表</span>
                    </Menu.Item>
                    {/* <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <UserOutlined/>
                                <span>文章管理</span>
                            </span>
                        }
                        onClick={handleClickTitle}
                    >
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="list">文章列表</Menu.Item>

                    </SubMenu> */}
                    <Menu.Item key="5">
                        <FileAddOutlined/>
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                    {/* <Breadcrumb.Item>工作台</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Jingran.com</Footer>
            </Layout>
      </Layout>
    );
}

export default AdminIndex;