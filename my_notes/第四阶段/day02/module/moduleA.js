//这是模块A
const a = 20;
//把 a 输出出去

const  fun = (y) => {
  let x = 10;
  return x + y + a;
}

//当输出的接口只有一个时,就可以用default
//default 在一个模块中,只能用一次
// export default fun;


/* export {
  //直接写方法名
  fun
}; */

//例子3
const fun1 = (aa)=>{
  console.log(aa); 
};
const fun2 = (bb)=>{
  console.log(bb);
};
const fun3 = (cc)=>{
  console.log(cc);
};

export {
  fun,
  fun1,
  fun2,
  fun3
}