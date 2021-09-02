/**
 * 插件
 * */

// 错误捕获
import pluginError from '@/plugins/error';
// 日志插件
import pluginLog from '@/plugins/log';
// 鉴权指令
import directiveAuth from '@/plugins/auth';
// 滚动触发方法
import scroll from '@/plugins/scroll';
// 复制指令
import copy from '@/plugins/directive/copy';
// 全屏指令
import screenfull from '@/plugins/directive/screenfull';
// tooltip指令
import tooltip from '@/plugins/directive/tooltip';
// 省略号指令
import ellipsis from '@/plugins/directive/ellipsis';
// 空状态指令
import empty from '@/plugins/directive/empty';

export default {
    async install (Vue, options) {
        // 插件
        Vue.use(pluginError);
        Vue.use(pluginLog);

        // 指令
        Vue.directive('auth', directiveAuth);
        Vue.directive('scroll', scroll);
        Vue.directive('copy', copy);
        Vue.directive('screenfull', screenfull);
        Vue.directive('tooltip', tooltip);
        Vue.directive('ellipsis', ellipsis);
        Vue.directive('empty', empty);
    }
}
