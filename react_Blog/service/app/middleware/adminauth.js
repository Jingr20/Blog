const jwt = require('jsonwebtoken');
const cert = "jingran"; // 密钥，用于签名
module.exports = options =>{

    // 验证token
    function verifyToken(token){
        try{
            let arr = jwt.verify(token,cert,{
                issuer:'jr',
                algorithms:["HS256"]
            });
            // return arr;
            return true;
        }catch(err){
            // return {
            //     code:10000,
            //     message:err.message
            // }
            return false;
        }
    }

    return async function adminauth(ctx,next){
        console.log('**',ctx.request.header.sessionid)
        if(ctx.request.header.sessionid!=='null' && verifyToken(ctx.request.header.sessionid)){
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}