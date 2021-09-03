import Vue from 'vue'
import Alert from './index.vue'
const AlertBox = Vue.extend(Alert) // 创建的是一个组件构造器，不是实例
function alertMessage (options, type) {
    if (options === undefined || options === null) {
        options = {
            content: '是否确认删除？'
        }
    } else if (typeof options === 'string' || typeof options === 'number') {
        options = {
            content: options
        }
    }
    let instance = new AlertBox({
        data: {
            title: options.title,
            setHeight: options.setHeight ? options.setHeight : false,
            hideBody: options.hideBody ? options.hideBody : false,
            icon: options.icon ? options.icon : 'iconguanbi',
            content: options.content,
            duration: options.duration,
            bodyTitle: options.bodyTitle,
            bodyList: options.bodyList,
            buttonName: options.buttonName,
            hideTime: options.hideTime,
            type: type
        },
        methods: {
            onOk () { // ok事件
                this.isShowCount = false
                this.loading = true
                if ( options.onOk && typeof options.onOk === 'function') {
                    options.onOk(this)
                }
            }
        }
    }).$mount()
    document.body.appendChild(instance.$el) // 添加dom元素
    Vue.nextTick(() => { // dom元素渲染完成后执行回调
        instance.show = true
    })
}
// Vue.prototype.$BAlert = BingoAlert.install;
// ['info', 'error'].forEach(type => {
//     Vue.prototype.$BAlert[type] = (option) => {
//         return Vue.prototype.$BAlert(option, type)
//     }
// })
export default {
    name: 'bingoAlert',
    info (options) {
        return alertMessage(options, 'info');
    },
    error (options) {
        return alertMessage(options, 'error');
    }
}
