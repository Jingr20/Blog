// index.js 
import React,{useState,useRef,useEffect,useCallback} from 'react'
import Head from 'next/head'
import axios from 'axios';
import Link from 'next/link';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import {Row,Col,List} from 'antd';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import servicePath from '../config/apiUrl';

const Home = (props) => {
  const [myList,setMylist] = useState(props.data);

  // 虚拟滚动技术对列表进行展示
  /*
  3层深度的DOM结构
  1）第一层是100vh高度的容器(视口)，允许滚动  my-list-main
  2）第二层是所有元素组成高度，可以理解成是一个空有高度的空白元素，这个高度是当前已经获取的所有元素的总高度 ant-list-items
  3）第三层是固定元素个数渲染层

  domNum = window.screen.height / itemHeight 视口可展示5个item，上下个缓冲3个，一共需要11个dom元素来实现虚拟滚动；
  监听容器的滚动事件，实时计算展示数组数据里的起始位置和结束位置
  第一个元素位置 = 滚动距离/列表元素的高度。
  最后一个元素位置 = 第一个元素位置 + 视口内最多展示元素的个数

  每个元素距离父类都会有个偏移高度，默认的高度就是这个元素之上所有的兄弟元素的高度之和.
  这里只采用固定个数的元素，则通过transform或者top值来把该元素的位置钉住，来模拟滚动后自己需要处在的位置上。
  */

  const itemHeight = 148;
  const totalHeight = useRef(itemHeight * myList.length); // 所有items组成的高度，控制第二层高度
  const [curList,setCurList] = useState(props.data.slice(0,11)); // 当前视口以及缓冲区展示的11个节点数据，即第三层是固定元素个数渲染层
  const startIndex = useRef(0); // 展示的起始索引
  
  // 可滚动的元素高度需要先撑开 ant-list-items
  useEffect(()=>{
    document.getElementsByClassName('ant-list-items')[0].style.height = totalHeight.current+'px';
  },[]);

  // 滚动事件
  const scroll  = useCallback(() => {
    const slider = document.getElementsByClassName('my-list-main')[0];
    const scrollTop = slider.scrollTop; // 滚动距离
    let curStartIndex = Math.floor(scrollTop / itemHeight);
    curStartIndex = (curStartIndex-3>=0)?curStartIndex-3:0; // 注意上下各缓冲3个
    requestAnimationFrame(()=>{
      setCurList(myList.slice(curStartIndex,curStartIndex+11));
    });
    // setCurList(myList.slice(curStartIndex,curStartIndex+11));
    startIndex.current = curStartIndex;
  },[])
  // 节流
  const throttle = useCallback((func, delay)=>{
    var timer = null;
    return function(){
      var context = this;
      var args = arguments;
      if(!timer){
        timer = setTimeout(function(){
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    }
  },[]);
  
  



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
        <title >博客-JR</title>
      </Head>
      <Header></Header>
      <Row className='comm-main' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            // header={<div className='list-header'>学习日志</div>}
            itemLayout='vertical'
            dataSource={curList}
            className="my-list-main"
            onScroll = {throttle(scroll,200)}
            renderItem = {(item,index)=>(
              <List.Item
                className='my-li'
                style={{
                  position: 'absolute',
                  top: `${(startIndex.current + index) * itemHeight}px`,
                  // transform: `translateY(${index * itemHeight}px)`,
                }}
              >
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

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        // console.log('远程数据结果：',res.data.data)
        resolve(res.data)
      }
    );
  });

  return await promise;
};

export default Home