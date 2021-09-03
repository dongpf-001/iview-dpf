<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <Divider>bingo-alert</Divider>
                    <Button type="primary" @click="openAlert(10)">请求地址出错</Button>
                    <Button type="primary" @click="openAlert(11)">导入出错</Button>
                    <Button type="primary" @click="openAlert(12)">网络异常</Button>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、bingo-alert 消息组件</p>
                    <p style="margin-top: 12px">2、</p>
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
            openAlert (value) {
                switch (value) {
                case 1:
                    this.$BAlert.info({
                        title: '删除确认',
                        content: '是否确认删除？',
                        buttonName: ['取消删除', '立即删除'],
                        duration: 3000,
                        onOk: (e)=> {
                            setTimeout(() => {
                                e.loading = false // 去掉loading
                                e.show = false // 关闭弹窗
                            }, 2000)
                        }
                    });
                    break;
                case 10:
                    this.$BAlert.error({
                        title: '请求出错',
                        bodyTitle: '请求地址出错:/api/v1/organization/department/user-layout/user-layout?userId=1271',
                    });
                    break;
                case 11:
                    this.$BAlert.error({
                        title: '导入失败',
                        content: '请核对并修改以下信息后，再重新导入。',
                        bodyTitle: '您导入的内容有如下错误：',
                        bodyList: ['车型字段不能为空', '年龄字段需要是Number类型', ]
                    });
                    break;
                case 12:
                    this.$BAlert.error({
                        title: '网络异常',
                        hideBody: true,
                        setHeight: true,
                        icon: 'iconxinhao-wu'
                    });
                    break;
                default:
                    break;
                }
            }
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
