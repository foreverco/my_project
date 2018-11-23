
import base from './css/base.css'
import main from './css/main.css'
/*输出一个函数  */
export default (text='hello webpack22') => {
  // 创建两个元素
  const div = document.createElement('div');
  div.innerHTML = text;
  const p = document.createElement('p');
  p.innerHTML = 'This is a demo';
  div.appendChild(p);
  // 分别给元素附上样式
  div.className += base.box;
  p.className += main.box;
  return div;
}

