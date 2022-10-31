module.exports = app => {
    const { router, controller } = app;
    // 声明并引入中间件
    const adminauth = app.middleware.adminauth();
    router.post('/admin/checkLogin', controller.admin.home.checkLogin);
    router.post('/admin/getTypeInfo',adminauth,controller.admin.home.getTypeInfo);
    router.post('/admin/addArticle',adminauth,controller.admin.home.addArticle);
    router.post('/admin/updateArticle',adminauth,controller.admin.home.updateArticle);
    router.get('/admin/getArticleList',adminauth,controller.admin.home.getArticleList);
    router.get('/admin/delArticle/:id',adminauth,controller.admin.home.delArticle);
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.home.getArticleById);
};