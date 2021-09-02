<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-calendar v-model="day" @on-change="onChange"
                                    @on-type-change="onTypeChange" :cell-height="80">
                        <template slot="month" slot-scope="{ date, data }">
                            <div v-if="data.day === '2019-12-11'" style="background-color: yellow">今天有重要的事</div>
                        </template>
                    </bingo-calendar>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、v-model是日期格式，根据日期回显</p>
                    <p style="margin-top: 12px">2、@on-change事件返回的参数分别是日期和对应的大众周</p>
                    <p style="margin-top: 12px">3、日历默认是从星期日开始，这样日期与大众周水平方向对应最准确</p>
                    <p style="margin-top: 12px">4、提供month和year插槽，可自定义日历样式</p>
                    <p style="margin-top: 12px">5、locale属性对应日历头部的显示，可自定义显示内容</p>
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
            onChange (date, week) {
                this.$BMessage.success('选择的日期是：'+date.toString()+';对应的大众周是'+week);
            },
            onTypeChange (type) {
                this.$BMessage.success(type);
            }
        }
    };
</script>
<style lang="less" scoped>
</style>
