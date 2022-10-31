import {Avatar,Divider} from 'antd';
import {
    GithubOutlined,
    QqOutlined,
    WechatOutlined
} from '@ant-design/icons';

function Author(){
    return (
        <div className="author-div comm-box">
            <div className='author-photo'> 
                <Avatar size={100} src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2Fv2-1b356e476398dbae48bb27de21c6e274_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645957265&t=4e32c748d6ab4a8cb1a30b68c99acb2e" />
                {/* <Avatar size={100} src={<img src='/me.jpg'/>}/> */}
            </div>
            <div className="author-introduction">
                在读研究生，自学前端，在此记录学习过程...
                <Divider>社交账号</Divider>
                <a className='account' href='https://github.com/'><GithubOutlined /></a>
                <a className='account'><QqOutlined/></a>
                <a className='account'><WechatOutlined/></a>
            </div>
        </div>
    );
}

export default Author;