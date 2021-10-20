<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <div style="width: 500px;height: 350px">
                        <bingo-calendar-jane @on-change="handleChange"></bingo-calendar-jane>
                    </div>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、v-model是日期格式，根据日期回显</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-calender-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                day: '2019-12-03',
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
            // 切换日期
            handleChange (date, dateStr) {
                this.$BMessage.success('选择的日期是：'+dateStr);
            },
            onTypeChange (type) {
                this.$BMessage.success(type);
            }
        }
    };
</script>
<style lang="less" scoped>
</style>
