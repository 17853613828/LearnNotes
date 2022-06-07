const fs = require('fs')

// 调用方法读取文件
// fs.readFile('./17.为学.md', (err, data) => {
//   // 如果失败，则抛出错误
//   if(err) throw err;
//   // 如果没有出错，则输出内容
//   // console.log(data) // Buffer格式的
//   console.log(data.toString());
// })

// 使用 promise 封装
const p = new Promise(function(resolve, reject) {
  fs.readFile('./17.为学.md', function(err, data) {
    // 判断如果失败
    if(err) reject(err);
    // 如果成功
    resolve(data);
  })
})

p.then(function(data) {
  console.log(data.toString())
},function(reason) {
  console.log('读取失败！！')
})