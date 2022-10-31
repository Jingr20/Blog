import React,{useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios'

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import {Row,Col,Breadcrumb,Affix} from 'antd';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

// import ReactMarkdown from 'react-markdown';
// import MarkNav from 'markdown-navbar';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx';

import servicePath from '../config/apiUrl';



const Detailed = (props) => {

  useEffect(()=>{
    console.log('Detailed组件首次渲染');
  },[]);

  // markdown解析配置
  const renderer = new marked.Renderer();
  // 文章导航
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
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
  // console.log(props.article_content);
  let html = marked(props.article_content);
  // console.log(html);

  return (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header></Header>
      <Row className='comm-main' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className='bread-div'>
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href='/list'>前端笔记</a></Breadcrumb.Item>
              <Breadcrumb.Item>react</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="detailed-title">
            {props.title}
          </div>
          <div className="list-icon center">
            <span><CalendarOutlined/> {props.addTime}</span>
            <span><FolderOutlined/> {props.typeName}</span>
            <span><FireOutlined /> {props.view_count}</span>
          </div>
          <div className="detailed-content" 
            dangerouslySetInnerHTML={{__html:html}}>
            {/* // dangerouslySetInnerHTML={{__html:props.article_content}}> */}
          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          {/* <Advert/> */}
          <Affix>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Detailed.getInitialProps = async (context)=>{
  let id = context.query.id;
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById+id).then(
      (res)=>{
        // console.log(res);
        resolve(res.data.data[0]);
      }
    );
  });
  return await promise;
}

export default Detailed;