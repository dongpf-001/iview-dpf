import Vue from 'vue'
import Message from './index.vue'
const MessageBox = Vue.extend(Message) // 创建的是一个组件构造器，不是实例
const BingoMessage = {
    install: (options, duration, type) => {
        if (options === undefined || options === null) {
            options = {
                content: ''
            }
        } else if (typeof options === 'string' || typeof options === 'number') {
            options = {
                content: options
            }
            if (duration != undefined && options != null) {
                options.duration = duration;
            }
            if (type != undefined && options != null) {
                options.type = type;
            }
        }
        let instance = new MessageBox({
            data: options
        }).$mount()
        document.body.appendChild(instance.$el) // 添加dom元素
        Vue.nextTick(() => { // dom元素渲染完成后执行回调
            instance.visible = true
        })
    }
}
// Vue.prototype.$BMessage = BingoMessage.install;
// ['success', 'warning'].forEach(type => {
//     Vue.prototype.$BMessage[type] = (option, duration) => {
//         return Vue.prototype.$BMessage(option, duration, type)
//     }
// })
export default {
    name: 'bingoMessage',
    success (options, duration) {
        return BingoMessage.install(options, duration, 'success');
    },
    warning (options, duration) {
        return BingoMessage.install(options, duration, 'warning');
    }
}
