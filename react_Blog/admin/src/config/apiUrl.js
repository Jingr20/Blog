let ipUrl = 'http://127.0.0.1:7001/admin/';
// let ipUrl = 'http://192.168.1.116:7001/admin/';

let servicePath = {
    checkLogin:ipUrl + 'checkLogin' ,  //  验证登录
    getTypeInfo:ipUrl + 'getTypeInfo', // 查询文章类型
    addArticle:ipUrl + 'addArticle',   // 添加文章
    updateArticle:ipUrl + 'updateArticle',   // 更新文章
    getArticleList:ipUrl + 'getArticleList', // 获取文章列表
    delArticle:ipUrl + 'delArticle/',         // 删除文章
    getArticleById:ipUrl + 'getArticleById/'
};

export default servicePath;