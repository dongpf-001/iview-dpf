<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-form :col="query.col" :labelWidth="query.labelWidth" :data="data"
                                ref="form" :button="query.button" :rules="rules">
                        <bingo-grid-item>
                            <bingo-form-item label="选择周" prop="weekNumber" label-for="weekNumber">
                                <bingo-date-week types="date"
                                                 ref="week"
                                                 v-model="data.weekNumber"
                                                 format="KWww"
                                                 @on-change="onChanges">
                                </bingo-date-week>
                                {{data.weekNumber}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="选择区域" prop="weekNumber2" label-for="weekNumber2">
                                <bingo-date-week types="daterange"
                                                 v-model="data.weekNumber2"
                                                 format="yyyyKWww"
                                                 placeholder="选择周"
                                                 @on-change="onChanges">
                                </bingo-date-week>
                                {{data.weekNumber2}}
                            </bingo-form-item>
                        </bingo-grid-item>
                    </bingo-form>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、types属性分为date和daterange，分别对应选择周和选择周范围</p>
                    <p style="margin-top: 12px">2、format属性可配置显示的格式，小写的ww对应组件返回的大众周，例如：format="yyyyKWww"，最终显示就是2020KW50</p>
                    <p style="margin-top: 12px">3、回显时使用v-model，要求是日期格式，不可以根据大众周直接回显，也就是v-model绑定的是日期，
                        @on-change方法返回的参数是大众周，此处建议后台数据库表定义两个字段，分别存日期和大众周，日期用于组件回显，
                        大众周用于其他显示</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-date-week-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                query: {
                    col: 1,
                    labelWidth: 110,
                    button: false
                },
                data: {
                    weekNumber: '2019-12-13', // 选择周
                    weekNumber2: [new Date('2019-12-13'), new Date('2020-01-13')]
                },
                rules: {
                    weekNumber: [
                        {required: true, type: 'date', message: $t('page.common.noEmpty'), trigger: 'change'},
                    ],
                }
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
            // 返回的参数是大众周和类型
            onChanges (date, type) {
                this.$BMessage.success('选择的大众周是：'+date, 5000)
                console.log(date);
                console.log(type);
            }
        }
    };
</script>
<style lang="less" scoped>
</style>
