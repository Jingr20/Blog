let ipUrl = 'http://127.0.0.1:7001/default/';
// let ipUrl = 'http://192.168.1.116:7001/default/';
let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleById:ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getArticleListByTypeId:ipUrl + 'getArticleListByTypeId/'
};

export default servicePath;