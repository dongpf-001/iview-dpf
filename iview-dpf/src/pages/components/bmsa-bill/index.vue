<template>
    <div class="bill-wrapper" >
        <bmsa-bill billName="bill-template1" :tabs="tabs" active="one" :mode="mode" :isScroll="isScroll">
            <div slot="one" ref="one" style="height:100%">
                <span>基本信息简介</span>
            </div>
            <div slot="two" :style="isScroll ? 'height: 100px' : 'height: 100%'">
                <bingo-tabs value="name1">
                    <TabPane label="标签一" name="name1">标签一的内容</TabPane>
                    <TabPane label="标签二" name="name2">标签二的内容</TabPane>
                </bingo-tabs>
            </div>
            <div slot="three" :style="isScroll ? 'height: 100px' : 'height: 100%'">
                ------------ three
            </div>
            <template #footer>
                <Button type="primary" >保存</Button>
            </template>
        </bmsa-bill>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isScroll: false, // 是否有滚动
                tabs: [
                    {name: 'one', title: '基本信息', showLayout: false},
                    {name: 'two', title: '单据第二', icon: 'ios-people', hideTitleName: true},
                    {name: 'three', title: '单据第三个数字超长号三个数字超长号', icon: 'ios-stats', hideTitle: true},
                ],
                mode: 'left',
                query: {
                    col: 3,
                    labelWidth: 90,
                    button: false
                },
                data: {
                    status1: '',
                    status2: '',
                    status3: '',
                    status4: '',
                    status5: ''
                },
                layData: {
                    status1: { show: true, label: '姓名', required: true, isLink: false },
                    status2: { show: true, label: '我的年龄', required: true, isLink: false },
                    status3: { show: true, label: '公司', required: false, isLink: false },
                    status4: { show: true, label: '职位', required: false, isLink: false },
                    status5: { show: true, label: '性别', required: false, isLink: false },
                },
                rules: {
                    status1: [
                        { required: true, message: '请输入编号', trigger: 'blur' }
                    ],
                    status2: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                columns1: [
                    {
                        title: '属性',
                        key: 'props-name',
                        width: 170
                    },
                    {
                        title: '说明',
                        key: 'props-decp',
                        width: 700
                    },
                    {
                        title: '类型',
                        key: 'props-type',
                        width: 170
                    },
                    {
                        title: '默认值',
                        key: 'props-default',
                        width: 170
                    }
                ],
                data1: [
                    {
                        'props-name': 'mode',
                        'props-decp': '单据页展现的形式 ， vertical 为竖向  horizontal为水平',
                        'props-type': '数组',
                        'props-default': 'vertical'
                    },
                    {
                        'props-name': 'tabs',
                        'props-decp': '每个单据的配置',
                        'props-type': '数组',
                        'props-default': ''
                    },
                    {
                        'props-name': 'tabs > name',
                        'props-decp': '每个模块的标识 ,需唯一',
                        'props-type': 'String',
                        'props-default': ''
                    },
                    {
                        'props-name': 'tabs > title',
                        'props-decp': '每个模块显示的标题名称',
                        'props-type': 'String',
                        'props-default': ''
                    },
                    {
                        'props-name': 'tabs > icon',
                        'props-decp': '每个模块显示图标',
                        'props-type': 'String',
                        'props-default': ''
                    },
                    {
                        'props-name': 'tabs > show',
                        'props-decp': '每个模块是否默认显示',
                        'props-type': 'Boolean',
                        'props-default': '默认第一个模块显示'
                    },
                    {
                        'props-name': 'tabs > expend',
                        'props-decp': '每个模块是否展开',
                        'props-type': 'Boolean',
                        'props-default': '默认全部展开'
                    }
                ],
            };
        },
        components: {},
        created() {
        },
        mounted() {

        },
        computed: {},
        watch: {},
        methods: {
            save() {
                this.$refs.form.setValidate(function () {

                });
            }
        }
    };
</script>
<style>

</style>
