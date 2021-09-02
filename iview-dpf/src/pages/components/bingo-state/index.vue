<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <Divider>下拉选框</Divider>
                    <bingo-form :col="query.col" :labelWidth="query.labelWidth" :data="data"
                                ref="form" :button="query.button">
                        <bingo-grid-item>
                            <bingo-form-item label="默认下拉" prop="states1" label-for="states1">
                                <bingo-state type="select" v-model="data.states1" :size="22"></bingo-state>
                                {{data.states1}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="自定义数据源" prop="states2" label-for="states2">
                                <bingo-state type="select" v-model="data.states2" :states="statesOwn" :size="22"></bingo-state>
                                {{data.states2}}
                            </bingo-form-item>
                        </bingo-grid-item>
                    </bingo-form>
                    <Divider style="margin-top: 70px">鼠标滑入选择</Divider>
                    <bingo-state v-model="states3" :size="22"></bingo-state>
                    {{states3}}
                    <Divider style="margin-top: 70px">纵向选择形式</Divider>
                    <bingo-state type="vertical" v-model="states4" isCondition title="SSS" @on-change="onChange" :size="30">
                    </bingo-state>
                    {{states4}}
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、type代表组件类型，不写的话默认是鼠标划入选择形式，为select时是下拉选择形式，为vertical
                    时是纵向选择形式，默认形式可用在表格里</p>
                    <p style="margin-top: 12px">2、states为状态灯的数据源，默认是红、黄、绿、红黄，可自定义传入数据源</p>
                    <p style="margin-top: 12px">3、自定义数据源的格式为states:[{value: 1, color: '#ccc', msg: '自定义提示', disabled: true}]
                    其中msg代表状态灯提示信息，disabled代表该状态是否可以选择</p>
                    <p style="margin-top: 12px">4、size代表灯的大小</p>
                    <p style="margin-top: 12px">5、isCondition代表选择状态前是否有条件，为true时on-change事件会多个callback函数，用于条件成立给
                    v-model赋值</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-state-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                states3: 2,
                states4: 2,
                query: {
                    col: 2,
                    labelWidth: 100,
                    button: false
                },
                data: {
                    states1: 1,
                    states2: 1
                },
                statesOwn: [ // 自定义数据源
                    {
                        value: 1,
                        color: 'lightblue',
                    },
                    {
                        value: 2,
                        color: 'orange',
                    },
                    {
                        value: 3,
                        color: 'linear-gradient(to bottom, lightblue 0%, lightblue, lightblue, lightblue, orange, orange, orange, orange 100%)'
                    },
                    {
                        value: 4,
                        color: 'lightgreen',
                        msg: '不可选择',
                        disabled: true
                    },
                ]
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
            onChange (value, callback) {
                if (value === 3) {
                    this.$BMessage.warning('黄灯不可以选！')
                } else {
                    callback()
                }
            },
        }
    };
</script>
<style lang="less" scoped>
</style>
