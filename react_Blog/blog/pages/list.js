import React,{useState,useEffect,useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link';
import axios from 'axios';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import {Row,Col,List,Breadcrumb} from 'antd';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import servicePath from '../config/apiUrl';


const Mylist = (props) => {
  console.log('Mylist组件渲染！！！！');

  const [myList,setMylist] = useState(props.data.data); // 只在Mylist组件首次渲染时赋值
  let listId = useRef(props.listId); // 首次渲染时赋值
  useEffect(()=>{
    console.log('Mylist组件首次渲染！！！！');
  },[]);

  useEffect(()=>{
    if(props.listId !== listId.current){
      // 每次渲染判断list传入的id有没有变，变换的话更新listID、Mylist数据
      console.log('list路由改变，MyList赋值');
      listId.current = props.listId;
      setMylist(props.data.data);
    }
  });

  // markdown解析配置
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  });


  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      <Row className='comm-main' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>前端笔记</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div className='list-header'>学习日志</div>}
            itemLayout='vertical'
            dataSource={myList}
            renderItem = {(item)=>(
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                    {item.title}
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined/> {item.addTime}</span>
                  <span><FolderOutlined/> {item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>  
              </List.Item>
            )}
  
          />
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          {/* <Advert/> */}
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Mylist.getInitialProps = async (context)=>{
  let id = context.query.id;
  console.log('Mylist.getInitialProps执行！！！'+id);
 
  let promise = new Promise((resolve)=>{
    axios(servicePath.getArticleListByTypeId+id).then((res)=>{
      let data = {};
      data.data = res.data;
      data.listId = id;
      resolve(data);
    });
  });
  return await promise;
}

export default Mylist;