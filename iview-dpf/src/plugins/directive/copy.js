/**
 * @description 复制指令
 * 使用该指令可以复制元素的文本内容（指令支持单击复制 v-copy、双击复制 v-copy.dblclick、
 * 点击icon复制 v-copy.icon 三种模式），不传参数时，默认使用单击复制。
 *  参数：dblclick 双击复制、icon 单击icon复制文本内容
 * 用例：<div v-copy> 单击复制 </div>
         <div v-copy.dblclick> 双击复制 </div>
         <div v-copy.icon> icon复制 </div>
 * */
import Vue from 'vue';
let vm = new Vue(); // 定义vue实例，用于调用prototype原型
export default {
    bind (el, binding) {
        // 双击触发复制
        if (binding.modifiers.dblclick) {
            el.addEventListener('dblclick', () => handleClick(el.innerText))
            el.style.cursor = 'copy'
        }
        // 点击icon触发复制
        else if (binding.modifiers.icon) {
            if (el.hasIcon) return
            const iconElement = document.createElement('i')
            iconElement.setAttribute('class', 'icon iconfont iconfuzhi')
            el.appendChild(iconElement)
            el.hasIcon = true
            iconElement.addEventListener('click', () => handleClick(el.innerText))
            iconElement.style.cursor = 'copy'
        }
        // 单击触发复制
        else {
            el.addEventListener('click', () => handleClick(el.innerText))
            el.style.cursor = 'copy'
        }
    }
}

function handleClick (text) {
    // 创建元素
    if (!document.getElementById('copyTarget')) {
        const copyTarget = document.createElement('input')
        copyTarget.setAttribute('style', 'position:fixed;top:0;left:0;opacity:0;z-index:-1000;')
        copyTarget.setAttribute('id', 'copyTarget')
        document.body.appendChild(copyTarget)
    }

    // 复制内容
    const input = document.getElementById('copyTarget')
    input.value = text
    input.select()
    document.execCommand('copy')
    vm.$BMessage.success('复制成功！')
}
