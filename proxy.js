const express = require('express');
const proxy = require("http-proxy-middleware");
const proxyServer = express();

proxyServer.use('/',proxy({
  target:'http://localhost:82',
  changeOrigin:true,
  /* router:{ // 接口在目标服务器存在
    '/':'http://www.xujing917.xyz:3001',
    '/index':'http://www.xujing917.xyz:3002'
  } */
}));

proxyServer.listen(8000,()=>{
  console.log('proxyServer is running  on prot 8000...');
});

module.exports = proxyServer;

/* 
** target:目标服务器
** /project/zd 本地发送请求匹配的路径
** pathRewrite:{'^/api/old-path' : '/api/new-path'} 访问的是源路径/api/old-path，请求会被解析为/api/new-path
** 解析完成的路径需要在目标服务器上存在
** 优先解析router
** router里可以匹配路径和主机地址，同样的，解析完成的路径需要在目标服务器上面存在
*/

/* seat_api
前端发送请求给3000端口/通过3000端口反向访问网页（proxy）
proxy接收请求，并把请求转发 
 	/api/*转发给 服务器 8090  重写路径去掉api
 	/img/*转发给服务器 8090  
  / 其他所有请求转发到服务器8081 存放了静态资源 */
  
/* 
** 前端发送请求的服务器应该是代理服务器
** 想要通过/project/:pro 跳转到不同服务器下
** 需要在目标服务器有对应api
** 如果想通过 http://localhost:82/project/zd 访问 http://www.xujing917.xyz:3001
** ①重定向 
** ②端口转发（要修改其他项目，pass）
*/