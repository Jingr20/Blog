import {useState,useEffect} from 'react';
import { List ,Row ,Col , Modal ,message ,Button} from 'antd';
import axios from 'axios';
import servicePath from  '../config/apiUrl';
import '../static/css/ArticleList.css';

function ArticleList(){
    const [list,setList] = useState([]);

    function getArticleList(){
        axios(servicePath.getArticleList,{
            headers:{
            'sessionId':localStorage.getItem('openId')
            }
        }).then((res)=>{
            if(res.data.data=='没有登录'){
                localStorage.removeItem('openId');
                window.location.href = '/';
            }else{
                setList(res.data.data);
            }
        });
    }

    useEffect(()=>{
        getArticleList();
    },[]);

    function handleDelete(id){
        Modal.confirm({
            title:'确定要删除这篇博客文章吗?',
            content:'若点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk(){
                axios(servicePath.delArticle+id,{
                    headers:{
                        'sessionId':localStorage.getItem('openId')
                    }
                }).then((res)=>{
                    message.success('文章删除成功')
                    getArticleList();
                });
            }
        });
       
    }

    function handleUpdate(id){
        window.location.href = '/index/addArticle/'+id;
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>简介</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={(item)=>{
                    return (
                        <List.Item>
                            <Row className="list-div">
                                <Col span={8}>{item.title}</Col>
                                <Col span={3}>{item.typeName}</Col>
                                <Col span={3}>{item.addTime}</Col>
                                <Col span={3}>{item.introduce}</Col>
                                <Col span={3}>{item.view_count}</Col>
                                <Col span={4}>
                                    <Button type="primary" onClick={()=>{handleUpdate(item.id)}}>修改</Button>&nbsp;
                                    <Button onClick={()=>handleDelete(item.id)}>删除</Button>
                                </Col>
                            </Row>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
}

export default ArticleList;