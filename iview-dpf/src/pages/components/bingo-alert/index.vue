<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <Divider>bingo-alert</Divider>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、bingo-modal 弹窗组件</p>
                    <p style="margin-top: 12px">2、bingo-modal-edit 编辑框组件，两个按钮时自定义footer插槽显示在下面，两个以上按钮显示在toolbar上</p>
                    <p style="margin-top: 12px">3、bingo-message分为success和warning两种提示，警告后面会带个删除，</p>
                    <p style="margin-top: 12px">4、bingo-message得用法是this.$BMessage.success(msg, 3000);第一个参数为提示得消息，第二个参数为显示的时间，
                    默认是3秒</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-alert-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
            }
        },
        computed: {},
        methods: {
        },
        created () {},
        mounted () {
        },
    };
</script>
<style lang="less" scoped>
    .demo-split-pane {
        button {
            margin-left: 12px;
        }
    }
</style>
