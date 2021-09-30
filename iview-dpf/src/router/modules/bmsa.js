import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'bmsa-';
const oldpre = 'bingo-';

export default {
    path: '/bmsa',
    name: 'bmsa',
    redirect: {
        name: `${pre}table`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'bmsa-table',
            name: `${pre}table`,
            meta: {
                ...meta,
                title: '表格',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-table')
        },
        {
            path: 'bmsa-shear-image',
            name: `${pre}shear-image`,
            meta: {
                ...meta,
                title: '图片裁剪',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-shear-image')
        },
        {
            path: 'bmsa-org-tree',
            name: `${pre}org-tree`,
            meta: {
                ...meta,
                title: '组织结构',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-org-tree')
        },
        {
            path: 'bmsa-drop-grid',
            name: `${pre}drop-grid`,
            meta: {
                ...meta,
                title: '下拉表格',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-drop-grid')
        },
        {
            path: 'bmsa-modal-select',
            name: `${oldpre}modal-select`,
            meta: {
                ...meta,
                title: '弹窗选择组件',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-modal-select')
        },
        {
            path: 'bmsa-bill-vertical',
            name: `${pre}bill-vertical`,
            meta: {
                ...meta,
                title: '垂直单据',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-bill/bmsa-bill-vertical')
        },
        {
            path: 'bmsa-bill-horizontal',
            name: `${pre}bill-horizontal`,
            meta: {
                ...meta,
                title: '水平单据',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-bill/bmsa-bill-horizontal')
        },
        {
            path: 'bingo-toolbar',
            name: `${oldpre}toolbar`,
            meta: {
                ...meta,
                title: 'toolbar',
                closable: true
            },
            component: () => import('@/pages/components/bingo-toolbar')
        },
        {
            path: 'bingo-query',
            name: `${oldpre}query`,
            meta: {
                ...meta,
                title: 'toolbar',
                closable: true
            },
            component: () => import('@/pages/components/bingo-query')
        },
        {
            path: 'bingo-shrink-card',
            name: `${oldpre}shrink-card`,
            meta: {
                ...meta,
                title: '收缩展开',
                closable: true
            },
            component: () => import('@/pages/components/bingo-shrink-card')
        },
        {
            path: 'bingo-modal',
            name: `${oldpre}modal`,
            meta: {
                ...meta,
                title: '收缩展开',
                closable: true
            },
            component: () => import('@/pages/components/bingo-modal')
        },
        {
            path: 'bingo-alert',
            name: `${oldpre}alert`,
            meta: {
                ...meta,
                title: '消息组件',
                closable: true
            },
            component: () => import('@/pages/components/bingo-alert')
        },
        {
            path: 'bingo-head-photo',
            name: `${oldpre}head-photo`,
            meta: {
                ...meta,
                title: '头像组件',
                closable: true
            },
            component: () => import('@/pages/components/bingo-head-photo')
        },
        {
            path: 'bingo-super-flow',
            name: `${oldpre}super-flow`,
            meta: {
                ...meta,
                title: '流程组件',
                closable: true
            },
            component: () => import('@/pages/components/bingo-super-flow')
        },
        {
            path: 'bingo-select-icon',
            name: `${oldpre}select-icon`,
            meta: {
                ...meta,
                title: '图标选择组件',
                closable: true
            },
            component: () => import('@/pages/components/bingo-select-icon')
        },
        {
            path: 'bingo-tree',
            name: `${oldpre}tree`,
            meta: {
                ...meta,
                title: '树组件',
                closable: true
            },
            component: () => import('@/pages/components/bingo-tree')
        },
        {
            path: 'bingo-quill',
            name: `${oldpre}quill`,
            meta: {
                ...meta,
                title: '富文本',
                closable: true
            },
            component: () => import('@/pages/components/bingo-quill')
        },
        {
            path: 'bingo-select',
            name: `${oldpre}select`,
            meta: {
                ...meta,
                title: '下拉选择组件',
                closable: true
            },
            component: () => import('@/pages/components/bingo-select')
        },
        {
            path: 'bingo-create-info',
            name: `${oldpre}create-info`,
            meta: {
                ...meta,
                title: '创建修改信息',
                closable: true
            },
            component: () => import('@/pages/components/bingo-create-info')
        },
        {
            path: 'bingo-state',
            name: `${oldpre}state`,
            meta: {
                ...meta,
                title: '状态选择组件',
                closable: true
            },
            component: () => import('@/pages/components/bingo-state')
        },
        {
            path: 'bingo-part',
            name: `${oldpre}part`,
            meta: {
                ...meta,
                title: '零件组件',
                closable: true
            },
            component: () => import('@/pages/components/bingo-part')
        },
        {
            path: 'bmsa-divide',
            name: `${pre}divide`,
            meta: {
                ...meta,
                title: '进度化分组件',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-divide')
        },
        {
            path: 'bingo-date-week',
            name: `${oldpre}date-week`,
            meta: {
                ...meta,
                title: '大众周日期',
                closable: true
            },
            component: () => import('@/pages/components/bingo-date-week')
        },
        {
            path: 'bingo-calendar',
            name: `${oldpre}calendar`,
            meta: {
                ...meta,
                title: '大众周日历',
                closable: true
            },
            component: () => import('@/pages/components/bingo-calendar')
        },
        {
            path: 'bingo-drag-list',
            name: `${oldpre}drag-list`,
            meta: {
                ...meta,
                title: '列表拖拽',
                closable: true
            },
            component: () => import('@/pages/components/bingo-drag-list')
        },
        {
            path: 'bmsa-input-part',
            name: `${pre}input-part`,
            meta: {
                ...meta,
                title: '零件号组件',
                closable: true
            },
            component: () => import('@/pages/components/bmsa-input-part')
        },
    ]
};
