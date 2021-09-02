<template>
    <div class="content-inner">
        <div class="ivu-card">
            <Divider>复制指令 | v-copy</Divider>
            <div class="demo-split">
                <Split v-model="split1">
                    <div slot="left" class="demo-split-pane">
                        <div v-copy class="copy-div"> 单击复制 </div>
                        <div v-copy.dblclick class="copy-div"> 双击复制 </div>
                        <div v-copy.icon class="copy-div-icon">
                            我是一段超长的文本，你可以点击按钮来进行复制！
                        </div>
                    </div>
                    <div slot="right" class="demo-split-pane">
                        <div v-html="getCopy"></div>
                    </div>
                </Split>
            </div>
            <Divider>全屏指令 | v-screenfull</Divider>
            <div class="demo-split">
                <Split v-model="split1">
                    <div slot="left" class="demo-split-pane">
                        <div class="screenfull-div" v-screenfull.icon> 全屏 </div>
                    </div>
                    <div slot="right" class="demo-split-pane">
                    </div>
                </Split>
            </div>
            <Divider>tooltip指令 | v-tooltip</Divider>
            <div class="demo-split">
                <Split v-model="split1">
                    <div slot="left" class="demo-split-pane">
                        <div v-tooltip:提示内容为XXX1>提示1</div>
                    </div>
                    <div slot="right" class="demo-split-pane">
                    </div>
                </Split>
            </div>
            <Divider>ellipsis指令 | v-ellipsis</Divider>
            <div class="demo-split">
                <Split v-model="split1">
                    <div slot="left" class="demo-split-pane">
                        <div v-ellipsis:100px> 需要省略的文字是阿萨的副本阿萨的副本阿萨的副本阿萨的副本</div>
                    </div>
                    <div slot="right" class="demo-split-pane">
                    </div>
                </Split>
            </div>
            <Divider>空状态指令 | v-empty</Divider>
            <div class="demo-split">
                <Split v-model="split1">
                    <div slot="left" class="demo-split-pane">
                        <div style="height:500px;width:500px" v-empty="state == 1"> 原本内容 </div>
                    </div>
                    <div slot="right" class="demo-split-pane">
                    </div>
                </Split>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'directive',
        components: {
        },
        data () {
            return {
                split1: 0.6,
                state: 1,
            }
        },
        computed: {
            getCopy () {
                return `<div v-copy class="copy-div"> 单击复制 </div>
                        <div v-copy.dblclick class="copy-div"> 双击复制 </div>
                        <div v-copy.icon class="copy-div-icon">
                            我是一段超长的文本，你可以点击按钮来进行复制！
                        </div>`
            }
        },
        methods: {
            glabClickoutside () {}
        },
        created () {},
        mounted () {
        },
    };
</script>
<style lang="less" scoped>
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
    .copy-div { // 复制
        width: 80px;
        height: 40px;
        margin-bottom: 6px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .copy-div-icon { // 复制
        padding: 5px;
        margin-bottom: 6px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .content-inner {
        .ivu-card {
            height: 100%;
            overflow: auto;
            padding: 16px;
        }
    }
    .screenfull-div { // 全屏
        width: 80px;
        height: 30px;
        border: 1px solid #ccc;
        padding: 4px;
    }
</style>
