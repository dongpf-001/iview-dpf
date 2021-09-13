const pre = '/demo/';
export default {
    path: '/demo',
    title: 'Demo示例',
    header: 'home',
    icon: 'md-options',
    children: [
        {
            path: `${pre}demo-drag`,
            title: '拖拽使用'
        },
        {
            path: `${pre}demo-tag-layout`,
            title: '标签响应式'
        },
        {
            path: `${pre}demo-auchor-bill`,
            title: '锚点实现单据'
        },
        {
            path: `${pre}demo-part-num`,
            title: '零件号'
        },
        {
            path: `${pre}demo-table-tree`,
            title: '表格树型结构'
        },
        {
            path: `${pre}demo-page-layout`,
            title: '不规则页面布局'
        },
    ]
}
