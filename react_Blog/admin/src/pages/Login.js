import {useState} from 'react';

import {Input,Button,Card,Spin,message} from 'antd';
import 'antd/dist/antd.css';
import {UserOutlined,KeyOutlined} from '@ant-design/icons';
import '../static/css/Login.css';

import servicePath from '../config/apiUrl';
import axios from 'axios';


function Login(props){

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false); 

    function checkLogin(){
        setIsLoading(true);
        // 判断是否为空
        if(!userName){
            message.error('用户名不能为空');
            setTimeout(()=>{
                setIsLoading(false);
            },500)
            return false;
        }
        if(!password){
            message.error('密码不能为空');
            setTimeout(()=>{
                setIsLoading(false);
            },500)
            return false;
        }
        // 验证用户名和密码
        let dataProps = {
            'userName':userName,
            'password':password
        }
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
            withCredentials:true   // 前后端共享session/cookie
        }).then((res)=>{
            setIsLoading(false);
            if(res.data.data=='登录成功'){
                localStorage.setItem('openId',res.data.openId);
                window.location.href = '/index'   // 应该是重定向
            }else{
                message.error('用户名或密码错误！');
            }
        });
    }

    return (
        <div className='login-div'>
            <Spin tip='Loading...' spinning={isLoading}>
                <Card title='Blog System' bordered={true} style={{width:400}}>
                    <Input  id='username' 
                            size='large'
                            placeholder='Enter your username'
                            onChange={(e)=>{setUserName(e.target.value)}}
                            prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}}/>}/>
                    <br/><br/>
                    <Input.Password 
                            id='username' 
                            size='large'
                            placeholder='Enter your password'
                            onChange={(e)=>{setPassword(e.target.value)}}
                            prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}}/>}/>

                    <br/><br/>
                    <Button type='primary' size='large' block onClick={checkLogin}>Login</Button>
                </Card>
            </Spin>
        </div>  
    );
}

export default Login;