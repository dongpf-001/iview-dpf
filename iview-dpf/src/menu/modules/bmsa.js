const pre = '/bmsa/';

export default {
    path: '/bmsa',
    title: '组件API',
    header: 'home',
    custom: 'i-icon-demo i-icon-demo-dashboard',
    children: [
        {
            path: '/base',
            title: '基础组件',
            children: [
                {
                    path: `${pre}bingo-toolbar`,
                    title: 'toolbar'
                },
                {
                    path: `${pre}bingo-query`,
                    title: 'query'
                },
                {
                    path: `${pre}bingo-shrink-card`,
                    title: '收缩展开'
                },
            ]
        },
        {
            path: '/form',
            title: '表单组件',
            children: [
                {
                    path: `${pre}bmsa-drop-grid`,
                    title: '下拉表格'
                },
                {
                    path: `${pre}bmsa-modal-select`,
                    title: '弹窗选择组件'
                },
                {
                    path: `${pre}bingo-alert`,
                    title: '消息组件'
                },
                {
                    path: `${pre}bingo-select-icon`,
                    title: '图标选择组件'
                },
                {
                    path: `${pre}bingo-quill`,
                    title: '富文本'
                },
                {
                    path: `${pre}bingo-select`,
                    title: '下拉选择组件'
                },
                {
                    path: `${pre}bingo-create-info`,
                    title: '创建修改信息'
                },
                {
                    path: `${pre}bingo-date-week`,
                    title: '大众周日期'
                },
                {
                    path: `${pre}bingo-calendar`,
                    title: '大众周日历'
                },
                {
                    path: `${pre}bmsa-input-part`,
                    title: '零件号组件'
                },
            ]
        },
        {
            path: '/function',
            title: '功能组件',
            children: [
                {
                    path: `${pre}bmsa-table`,
                    title: '表格'
                },
                {
                    path: `${pre}bmsa-shear-image`,
                    title: '图片裁剪'
                },
                {
                    path: `${pre}bmsa-org-tree`,
                    title: '组织机构'
                },
                {
                    path: `${pre}bmsa-bill`,
                    title: '新单据'
                },
                {
                    path: `${pre}bingo-modal`,
                    title: '弹窗组件'
                },
                {
                    path: `${pre}bingo-head-photo`,
                    title: '头像组件'
                },
                {
                    path: `${pre}bingo-super-flow`,
                    title: '流程组件'
                },
                {
                    path: `${pre}bingo-tree`,
                    title: '树组件'
                },
                {
                    path: `${pre}bingo-state`,
                    title: '状态选择组件'
                },
                {
                    path: `${pre}bingo-part`,
                    title: '零件组件'
                },
                {
                    path: `${pre}bmsa-divide`,
                    title: '进度化分组件'
                },
                {
                    path: `${pre}bingo-drag-list`,
                    title: '列表拖拽组件'
                },
            ]
        },
    ]
}
