/**
 * @description 空状态指令
 * 使用该指令可以显示缺省的空状态。可以传入默认图片（可选，默认无图片）、默认文字内容（可选，默认为暂无数据）、以及标示是否显示空状态（必选）。
 * 参数：emptyValue 是否添加图标
 * 用例：<div v-screenfull.icon> 全屏 </div>
 * */
import Vue from 'vue';
export default {
    bind (el, binding, vnode) {
        debugger
        el.style.position = el.style.position || 'relative'
        const { offsetHeight, offsetWidth } = el
        const { visible, content, img } = binding.value
        const image = img ? `<img src="${img}" height="30%" width="30%"></img>` : ''
        const defaultStyle = 'position:absolute;top:0;left:0;z-index:9999;background:#fff;display:flex;justify-content: center;align-items: center;'
        const empty = Vue.extend({
            template: `<div style="height:${offsetHeight}px;width:${offsetWidth}px;${defaultStyle}">
                          <div style="text-align:center">
                            <div>${image}</div>
                            <div>${content || '暂无数据'}</div>
                          </div>
                        </div>`
        })
        const component = new empty().$mount().$el
        if (visible) {
            el.appendChild(component)
        } else {
            el.removeChild(el.lastChild)
        }
    },
}
