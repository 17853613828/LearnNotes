// 1.引入express
const express = require('express');

// 2.创建应用对象
const app = express();

// 3.创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/server', (request, response)=>{
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应体
  response.send('HELLO AJAX')
});

app.post('/server', (request, response)=>{
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  // 设置响应体
  response.send('HELLO AJAX POST')
});

// app.all 可以接收任意类型的请求
app.all('/json-server', (request, response)=>{
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  // 响应一个数据
  const data = { name: 'atguigu' }
  // 响应体只能接收字符串类型的数据 所以我们要对对象进行字符串转换
  let str = JSON.stringify(data)
  // 设置响应体
  response.send(str)
});


// ie缓存问题
app.all('/ie', (request, response)=>{
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应体
  response.send('HELLO IE')
});


// 超时与网络异常
app.all('/delay', (request, response)=>{
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  setTimeout(function() {
    // 设置响应体
    response.send('延时响应')
  }, 3000)
});


// jQuery服务
// app.get('/jquery-server', (request, response)=>{
//   // 设置响应头
//   response.setHeader('Access-Control-Allow-Origin', '*')
//   response.send('Hello JQuery AJAX')
// });
// app.post('/jquery-server', (request, response)=>{
//   // 设置响应头
//   response.setHeader('Access-Control-Allow-Origin', '*')
//   response.send('Hello JQuery AJAX')
// });
app.all('/jquery-server', (request, response)=>{
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  const str = { name: 'atguigu' }
  setTimeout(function(){
    response.send(JSON.stringify(str))
  }, 3000)
});

app.all('/axios-server', (request, response)=>{
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  const str = { name: 'atguigu' }
  response.send(JSON.stringify(str))
});

app.all('/fetch-server', (request, response)=>{
  // 设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  const str = { name: 'atguigu' }
  response.send(JSON.stringify(str))
});

// 4.监听端口服务启动
app.listen(8000, ()=>{
  console.log('服务已经启动，8000端口监听中...')
})