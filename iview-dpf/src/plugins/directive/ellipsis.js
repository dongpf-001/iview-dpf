/**
 * @description 文字超出省略指令
 * 超长显示省略号
 * 参数：width 显示的宽度，超出显示省略号
 * 用例：<div v-ellipsis:100> 需要省略的文字是阿萨的副本阿萨的副本阿萨的副本阿萨的副本</div>
 * */
export default function (el, binding) {
    el.style.width = binding.arg || 100 + 'px'
    el.style.whiteSpace = 'nowrap'
    el.style.overflow = 'hidden';
    el.style.textOverflow = 'ellipsis';
}
