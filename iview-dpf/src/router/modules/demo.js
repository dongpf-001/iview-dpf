import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

export default {
    path: '/demo',
    name: 'demo',
    redirect: {
        name: 'drag'
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'demo-drag',
            name: 'demo-drag',
            meta: {
                ...meta,
                title: '拖拽示例'
            },
            component: () => import('@/pages/demo/demo-drag')
        },
        {
            path: 'demo-tag-layout',
            name: 'demo-tag-layout',
            meta: {
                ...meta,
                title: '标签响应式'
            },
            component: () => import('@/pages/demo/demo-tag-layout')
        },
        {
            path: 'demo-auchor-bill',
            name: 'demo-auchor-bill',
            meta: {
                ...meta,
                title: '锚点实现单据'
            },
            component: () => import('@/pages/demo/demo-auchor-bill')
        },
        {
            path: 'demo-part-num',
            name: 'demo-part-num',
            meta: {
                ...meta,
                title: '零件号'
            },
            component: () => import('@/pages/demo/demo-part-num')
        },
        {
            path: 'demo-table-tree',
            name: 'demo-table-tree',
            meta: {
                ...meta,
                title: '表格树型结构'
            },
            component: () => import('@/pages/demo/demo-table-tree')
        },
        {
            path: 'demo-page-layout',
            name: 'demo-page-layout',
            meta: {
                ...meta,
                title: '不规则页面布局'
            },
            component: () => import('@/pages/demo/demo-page-layout')
        },
        {
            path: 'demo-audio',
            name: 'demo-audio',
            meta: {
                ...meta,
                title: '动态语音播报'
            },
            component: () => import('@/pages/demo/demo-audio')
        },
        {
            path: 'demo-carousel',
            name: 'demo-carousel',
            meta: {
                ...meta,
                title: '动态构造轮播'
            },
            component: () => import('@/pages/demo/demo-carousel')
        },
        {
            path: 'demo-chorm',
            name: 'demo-chorm',
            meta: {
                ...meta,
                title: '浏览器降频问题'
            },
            component: () => import('@/pages/demo/demo-chorm')
        }
    ]
};
