import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

export default {
    path: '/tools',
    name: 'tools',
    redirect: {
        name: 'directive'
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'directive',
            name: 'directive',
            meta: {
                ...meta,
                title: '指令'
            },
            component: () => import('@/pages/tools/directive')
        }
    ]
};
