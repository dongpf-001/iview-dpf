/**
 * @description 全屏指令
 * 全屏指令，点击元素进行全屏/退出全屏的操作。支持元素后面是否插入全屏图标、
 * 参数：icon 是否添加图标
 * 用例：<div v-screenfull.icon> 全屏 </div>
 * */
import screenfull from 'screenfull'

export default {
    bind (el, binding) {
        if (binding.modifiers.icon) {
            if (el.hasIcon) return
            // 创建全屏图标
            const iconElement = document.createElement('i')
            iconElement.setAttribute('class', 'icon iconfont iconjiaoseguanli')
            iconElement.setAttribute('style', 'margin-left:5px')
            el.appendChild(iconElement)
            el.hasIcon = true
        }
        el.style.cursor = el.style.cursor || 'pointer'
        // 监听点击全屏事件
        el.addEventListener('click', () => handleClick())
    }
}

function handleClick () {
    if (!screenfull.enabled) {
        alert('浏览器不支持全屏')
        return
    }
    screenfull.toggle()
}
