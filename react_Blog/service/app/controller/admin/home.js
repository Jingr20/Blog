'use strict';
const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const cert = "jingran"; // 密钥，用于签名

class HomeController extends Controller{

    // 生成token(签名)
    generateToken(userName,password){
        return jwt.sign(
            {
                // token数据
                userName,
                password
            },
            cert, // 密钥
            {
                // 参数
                algorithm:"HS256", // 加密算法   对称加密算法
                issuer:"jr", // 签发人
                expiresIn:300 // 过期时间   单位：s
            }

        );
    }

    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                    "' AND password = '"+password+"'"

        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            // this.ctx.cookies.set('username','jing',{
            //     maxAge:1000*3600, // 设置存储时间为一天
            //     httpOnly
            // });

            //登录成功,生成token签名
            // let openId=new Date().getTime()
            let openId = this.generateToken(userName,password);
            this.ctx.body={data:'登录成功',openId:openId}

        }else{
            this.ctx.body={data:'登录失败'}
        } 
    }

    async getTypeInfo(){
        const resType = await this.app.mysql.select('type');
        this.ctx.body = {data:resType}
    }

    async addArticle(){
        let article = this.ctx.request.body;
        let res = await this.app.mysql.insert('article',article);

        const insertSuccess = res.affectedRows === 1
        const insertId = res.insertId
        this.ctx.body={
            isSuccess:insertSuccess,
            insertId:insertId
        }
    }

    async updateArticle(){
        let article = this.ctx.request.body;
        let res = await this.app.mysql.update('article',article);
        let updateSuccess = res.affectedRows===1;
        this.ctx.body = {
            isSuccess: updateSuccess
        };
    }

    async getArticleList() {
        let sql = 'SELECT article.id as id,'+
             'article.title as title,'+
             'article.introduce as introduce,'+
             "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
             'article.view_count as view_count ,'+
             '.type.typeName as typeName '+
             'FROM article LEFT JOIN type ON article.type_id = type.Id '+
             'ORDER BY article.id DESC ';

        const results = await this.app.mysql.query(sql);
        this.ctx.body={
            data:results
        }
    }

    async delArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={data:res}
    }

    async getArticleById() {
        //先配置路由的动态传值，然后再接收值
        let id = this.ctx.params.id;

        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id=' + id;

        const results = await this.app.mysql.query(sql);
        this.ctx.body={
            data:results
        }
    }

}

module.exports = HomeController;