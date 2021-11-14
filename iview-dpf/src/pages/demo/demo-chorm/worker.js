import { workerTimer } from './workerTimer'
/**
 *通过遍历器遍历参数
 *new出新的worker类
 *调用定时器方法
 */

// function timedCount() {
//     let workertimer = new workerTimer()
//     workertimer.timeInterval(self)
// }
//
// timedCount();


self.onmessage = function(evt){
    //工作线程接收到主线程的消息
    let data = new Date()
    //向主线程发送消息
    postMessage(data);
};

export default self
