<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1" mode="vertical">
                <div slot="top" class="demo-split-pane left-pane">
                    <div class="drag-box-card">
                        <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
                        <bingo-drag-list :list1.sync="list1" :list2.sync="list2" :dropConClass="dropConClass" @on-change="handleChange">
                            <h3 slot="left-title">待办事项</h3>
                            <Card class="drag-item" slot="left" slot-scope="left">
                                <div style="width: 100%;height: 100%;" :style="left.itemLeft.color ? 'color:' + left.itemLeft.color : ''">
                                    {{ left.itemLeft.name }}
                                </div>
                            </Card>
                            <h3 slot="right-title">完成事项</h3>
                            <Card class="drag-item" slot="right" slot-scope="right">
                                <div style="width: 100%;height: 100%;" :style="right.itemRight.color ? 'color:' + right.itemRight.color : ''">
                                    {{ right.itemRight.name }}
                                </div>
                            </Card>
                        </bingo-drag-list>
                    </div>
                    <div class="handle-log-box">
                        <h3>操作记录</h3>
                        <div class="handle-inner-box">
                            <p v-for="(item, index) in handleList" :key="`handle_item_${index}`">{{ item }}</p>
                        </div>
                    </div>
                    <div class="res-show-box">
                        <pre>{{ list1 }}</pre>
                    </div>
                    <div class="res-show-box">
                        <pre>{{ list2 }}</pre>
                    </div>
                </div>
                <div slot="bottom" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、list1和list2分别为左右数据源</p>
                    <p style="margin-top: 12px">2、@on-change为操作的事件，返回的参数分别是开始方向、结束方向、开始坐标位置、结束坐标位置</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bingo-drag-list-demo',
        components: {
        },
        data () {
            return {
                split1: 0.8,
                list1: [],
                list2: [],
                dropConClass: {
                    left: ['drop-box', 'left-drop-box'],
                    right: ['drop-box', 'right-drop-box']
                },
                data: [ // 数据源
                    {
                        name: '数据1',
                        id: 10,
                        color: 'red'
                    },
                    {
                        name: '数据5',
                        id: 20
                    },
                    {
                        name: '数据4',
                        id: 30
                    },
                    {
                        name: '数据3',
                        id: 40
                    },
                    {
                        name: '数据2',
                        id: 50
                    }
                ],
                handleList: [], // 操作记录
            }
        },
        computed: {},
        created () {},
        mounted () {
            this.list1 = this.data
        },
        methods: {
            handleChange ({ src, target, oldIndex, newIndex }) {
                this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
            }
        }
    };
</script>
<style lang="less">
    .drag-box-card{
        display: inline-block;
        width: 400px;
        height: 300px;
        .drag-item{
            margin: 10px;
            cursor: pointer;
        }
        h3{
            padding: 10px 15px;
        }
        .drop-box{
            border: 1px solid #eeeeee;
            height: 455px;
            border-radius: 5px;
        }
        .left-drop-box{
            margin-right: 10px;
        }
        .right-drop-box{
            //
        }
    }
    .handle-log-box{
        display: inline-block;
        margin-left: 20px;
        border: 1px solid #eeeeee;
        vertical-align: top;
        width: 200px;
        height: 500px;
        h3{
            padding: 10px 14px;
        }
        .handle-inner-box{
            height: ~"calc(100% - 44px)";
            overflow: auto;
            p{
                padding: 14px 0;
                margin: 0 14px;
                border-bottom: 1px dashed #eeeeee;
            }
        }
    }
    .res-show-box{
        display: inline-block;
        margin-left: 20px;
        border: 1px solid #eeeeee;
        vertical-align: top;
        width: 250px;
        height: 500px;
    }
</style>
