// 声明构造函数
function Promise(executor) {
  // 添加属性
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  // 声明属性
  this.callbacks = []
  // 保存实例对象的this的值
  const self = this;
  // resolve函数
  function resolve(data) {
    // 判断状态，状态只能改变一次
    if(self.PromiseState !== 'pending') return;
    // 1.修改对象的状态（promiseState）
    self.PromiseState = 'fullfilled'
    // 2.设置对象结果值（promiseResult）
    self.PromiseResult = data
    // 调用成功的回调函数
    setTimeout(()=>{
      self.callbacks.forEach(item => {
        item.onResolved(data)
      })
    })
  }
  // reject函数
  function reject(data) {
    // 判断状态，状态只能改变一次
    if(self.PromiseState !== 'pending') return;
    // 1.修改对象的状态（promiseState）
    self.PromiseState = 'rejected'
    // 2.设置对象结果值（promiseResult）
    self.PromiseResult = data
    // 执行失败的回调
    setTimeout(() => {
      self.callbacks.forEach(item=>{
        item.onRjected(data);
      })
    });
  }
  // try...catch... 对抛出异常的处理
  try{
    // 同步调用「执行器函数」
    executor(resolve, reject);
  } catch(e){
    // 修改promise对象状态为「失败」
    reject(e);
  }
  
}

// 添加then方法
Promise.prototype.then = function(onResolved, onRejected) {
  const self = this;
  // 判断回调函数参数
  if(typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if(typeof onResolved !== 'function') {
    onResolved = value => value
  }
  /* 
    p.then的返回值是一个promise类型的对象，跟回调函数的执行结果有关，
    如果执行结果是一个非promise类型的，那么返回的结果的对象状态为「成功」，
    如果执行结果一个promise类型的对象，那么返回的结果跟promise的结果有关
  */
  return new Promise((resolve, reject)=>{
     // 封装函数
     function callback(type) {
      try { 
        // 获取回调函数的执行结果
        let result = type(self.PromiseResult);
        if(result instanceof Promise) {
          // 如果是Promise类型的对象
          result.then(v=>{
            resolve(v)
          }, r=>{
            reject(r)
          })
        } else {
          // 结果的对象状态为「成功」
          resolve(result);
        }
      } catch (error) {
        reject(error)
      }
    }
    // 调用回调函数 通过PromiseState来判断调用哪个回调函数
    // 因为then方法是实例对象调用的 所以this指向实例对象
    if(this.PromiseState === 'fulfilled') {
      setTimeout(()=>{
        callback(onResolved)
      })
    } 
    if(this.PromiseState === 'rejected') {
      setTimeout(() => {
        callback(onRejected)
      });
    }
    // 判断pending状态
    if(this.PromiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push({
        onResolved: function() {
          callback(onResolved);
        }, onRejected: function() {
          callback(onRejected)
        }
      })
    }
  })
}

// 添加catch方法
Promise.prototype.catch = function(onRejected) {
  return this.then(undefined, onRejected) 
}

// 添加resolve方法
Promise.resolve = function(value) {
  // 返回promise对象
  return new Promise((resolve, reject)=>{
    if(value instanceof Promise){
      value.then(v=>{
        resolve(v);
      }, r=>{
        reject(r);  
      })
    } else {
      // 状态设置为成功
      resolve(value) 
    }
  })
}

// 添加reject方法
Promise.reject = function(reason) {
  return new Promise((resolve, reject)=>{
    reject(reason)
  })
}

// 添加all方法
Promise.all = function(promises) {
  // 返回结果为promise对象
  return new Promise((resolve, reject)=>{
    // 声明变量
    let count = 0;
    let arr = [];
    // 遍历
    for(let i = 0; i<promises.length; i++) {
      promises[i].then(v=>{
        // 得知对象的状态是成功
        // 每个promise对象都成功
        count++;
        // 将当前promise对象成功的结果 存入到数组中
        arr[i] =v;
        // 判断
        if(count === promises.length) {
          // 修改状态
          resolve(arr);
        }
      }, r => {
        reject(r);
      })
    }
  })
}

// 添加race方法
Promise.race = function(promises) {
  return new Promise((resolve, reject)=>{
    for(let i=0; i<promises.length; i++) {
      promises[i].then(v=>{
        // 修改返回对象的状态为「成功」
        resolve(v);
      }, r=>{
        // 修改返回对象的状态为「失败」
        reject(r);
      })
    }
  })
}