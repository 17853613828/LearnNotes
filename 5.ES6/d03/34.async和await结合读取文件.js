/* ----------------------- async和await结合读取文件 ------------------------ */

// 1.引入fs模块
const fs = require('fs');

function readWeiXue() {
  return new Promise((resolve, reject)=>{
    fs.readFile('./34.为学.md', (err, data)=>{
      if(err) reject(err);
      resolve(data)
    })
  }) 
}
function readChayang() {
  return new Promise((resolve, reject)=>{
    fs.readFile('./34.插秧诗.md', (err, data)=>{
      if(err) reject(err)
      resolve(data); 
    })
  })
}
function readGuanShu() {
  return new Promise((resolve, reject)=>{
    fs.readFile('./34.观书有感.md', (err, data)=>{
      if(err) reject(err)
      resolve(data)
    })
  })
}

// 声明一个async函数
async function main() {
  // 获取为学内容
  let weixue = await readWeiXue();
  // 获取插秧诗内容
  let chayang = await readChayang();
  // 获取观书有感内容
  let guanshu = await readGuanShu();

  console.log(weixue.toString())
  console.log(chayang.toString())
  console.log(guanshu.toString())
}
main();