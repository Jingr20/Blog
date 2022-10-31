module.exports = app => {
    const { router, controller } = app;
    router.get('/default', controller.default.home.index);
    router.get('/default/getArticleList', controller.default.home.getArticleList);
    router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
    router.get('/default/getArticleListByTypeId/:id', controller.default.home.getArticleListByTypeId);
};