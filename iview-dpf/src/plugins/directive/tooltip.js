/**
 * @description tooltip指令
 * 为元素添加tooltip
 * 参数：tooltip 提示内容、 tootipParams 提示方向
 * 用例：<div v-tooltip:提示内容为XXX1> 提示1</div>
 * tootipParams: {
        placement: 'top',
        effect: 'light',
    }
 * */
import Vue from 'vue'
export default function (el, binding) {
    if (el.hasIcon) return
    const iconElement = structureIcon(el, binding.arg, binding.value)
    el.appendChild(iconElement)
    el.hasIcon = true
}

function structureIcon (el, content, attrs) {
    // 拼接绑定属性
    let attrStr = ''
    for (let key in attrs) {
        attrStr += `${key}=${attrs[key]} `
    }
    const a = `<Tooltip content=${content} ${attrStr}><Icon type="ios-information-circle" style="font-size: 16px;margin-left: 5px"/></Tooltip>`
    // 创建构造器
    const tooltip = Vue.extend({
        template: a
    })
    // 创建一个 tooltip 实例并返回 dom 节点
    const component = new tooltip().$mount()
    return component.$el
}
