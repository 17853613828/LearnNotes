// import * as m1 from './49.hello.js';

const btn = document.getElementById('btn');
btn.onclick = function() {
  // m1.hello();
  import('./49.hello.js').then(module=>{
    module.hello();
  })
}