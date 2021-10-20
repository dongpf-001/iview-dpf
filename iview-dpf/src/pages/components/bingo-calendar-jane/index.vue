<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <div style="width: 500px">
                        <bingo-calendar-jane v-model="selectDate"
                                             @on-change="handleChange"
                                             @on-change-month="handleChangeMonth"
                                             @on-reset="handleReset">
                        </bingo-calendar-jane>
                        双向绑定：{{selectDate}}
                    </div>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、v-model绑定的是日期格式或字符串格式，根据日期回显，组件内部自动将字符串转换成日期格式</p>
                    <p style="margin-top: 12px">2、切换日期触发on-change方法，返回参数分别是日期和日期字符串</p>
                    <p style="margin-top: 12px">3、回到今天触发on-reset方法，返回参数分别是当前日期和日期字符串</p>
                    <p style="margin-top: 12px;color: red">4、添加大众周功能待做</p>
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
                selectDate: this.getDateStr(new Date()),
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
            // 切换月份
            handleChangeMonth (month, monthStr) {
                this.$BMessage.success('选择的月份是：'+monthStr);
            },
            // 回到今天
            handleReset (date, dateStr) {
                this.$BMessage.success('回到今天：'+dateStr);
            },
            // 根据日期返回类似 2016-01-02 格式的字符串
            getDateStr (date) {
                let pdate = date.getFullYear()+'-'+((date.getMonth()+1)<10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1))+'-'+
                    ((date.getDate()<10 ? '0'+date.getDate() : date.getDate()));   //把日期格式转换成字符串
                return pdate
            },
        }
    };
</script>
<style lang="less" scoped>
    .demo-split-pane{
        height: 100%;
        overflow: auto;
    }
</style>
