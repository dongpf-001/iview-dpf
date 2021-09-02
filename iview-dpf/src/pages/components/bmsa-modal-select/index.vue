<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-form :col="query.col" :labelWidth="query.labelWidth" :data="data"
                                ref="form" :button="query.button" :rules="rules">
                        <bingo-grid-item>
                            <bingo-form-item label="单选根据字段回显" prop="defaultRadio1" label-for="defaultRadio1">
                                <bmsa-modal-select :apiList="api.getList"
                                                :columns="column1"
                                                rowId="id"
                                                rowName="userName"
                                                :defaultRadio="data.defaultRadio1"
                                                @on-select="handleRadioSelect">
                                </bmsa-modal-select>
                                {{data.defaultRadio1}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="多选根据字段回显" prop="defaultCheckbox1" label-for="defaultCheckbox1">
                                <bmsa-modal-select :apiList="api.getList"
                                                ref="xModal"
                                                :columns="column2"
                                                rowId="id"
                                                rowName="userName"
                                                icon="md-person-add"
                                                :query="queryData"
                                                :multiple="true"
                                                :defaultCheckbox="data.defaultCheckbox1"
                                                @on-select="handleCheckSelect">
                                    <template #query>
                                        <Input v-model.trim="queryData.userName" placeholder="姓名:"
                                               icon="ios-search" @on-enter="handleQuery"
                                               @on-click="handleQuery" style="margin: 12px 0;width: 230px"/>
                                    </template>
                                </bmsa-modal-select>
                                {{data.defaultCheckbox1}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="单选根据数据集回显" prop="defaultRadio2" label-for="defaultRadio2">
                                <bmsa-modal-select :apiList="api.getList"
                                                :columns="column3"
                                                :isDefaultGather="true"
                                                rowId="id"
                                                rowName="userName"
                                                :defaultRadio="data.defaultRadio2"
                                                @on-select="handleRadioSelect2">
                                </bmsa-modal-select>
                                {{data.defaultRadio2}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="多选根据数据集回显" prop="defaultCheckbox2" label-for="defaultCheckbox2">
                                <bmsa-modal-select :apiList="api.getList"
                                                :columns="column4"
                                                :isDefaultGather="true"
                                                rowId="id"
                                                rowName="userName"
                                                icon="md-person-add"
                                                :multiple="true"
                                                :defaultCheckbox="data.defaultCheckbox2"
                                                @on-select="handleCheckSelect2">
                                </bmsa-modal-select>
                                {{data.defaultCheckbox2}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="按钮形式弹出选择">
                                <Button @click="handleBtnClick">点击添加人员</Button>
                                <bmsa-modal-select ref="btnModal"
                                                   :showInput="false"
                                                   :apiList="api.getList"
                                                   :columns="column5"
                                                   :isDefaultGather="true"
                                                   rowId="id"
                                                   rowName="userName"
                                                   icon="md-person-add"
                                                   :multiple="true"
                                                   :defaultCheckbox="data.defaultCheckbox3"
                                                   @on-select="handleCheckSelect3">
                                </bmsa-modal-select>
                                {{data.defaultCheckbox3}}
                            </bingo-form-item>
                        </bingo-grid-item>
                    </bingo-form>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、与下拉表格的使用方式完全一致</p>
                    <p style="margin-top: 12px">2、可传icon属性自定义input上的图标</p>
                    <p style="margin-top: 12px">3、showInput属性控制是否显示input框，可自定义按钮点击显示弹窗，自定义按钮点击事件只需要掉组件里的handleShow方法即可</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    import Api from '@/api/demo';
    export default {
        name: 'bmsa-modal-select-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                api: Api,
                query: {
                    col: 1,
                    labelWidth: 160,
                    button: false
                },
                data: {
                    defaultRadio1: 2, // radio选中的数据
                    defaultRadio2: { id: 2, userName: '王五'},
                    defaultCheckbox1: [ 1, 3, 4, 11 ], // check选中的数据
                    defaultCheckbox2: [
                        {id: 2, userName: '王五'},
                        {id: 11, userName: 'Test11 '}
                    ],
                    defaultCheckbox3: [
                        {id: 2, userName: '王五'},
                        {id: 11, userName: 'Test11 '}
                    ],
                },
                queryData: {
                    userName: ''
                },
                column1: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'userName', title: '姓名', width: 200 },
                    { field: 'depart', title: '部门' },
                ],
                column2: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'userName', title: '姓名', width: 200 },
                    { field: 'depart', title: '部门' },
                ],
                column3: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'userName', title: '姓名', width: 200 },
                    { field: 'depart', title: '部门' },
                ],
                column4: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'userName', title: '姓名', width: 200 },
                    { field: 'depart', title: '部门' },
                ],
                column5: [
                    { type: 'seq', title: $t('page.common.index'), align: 'center', fixed: 'left', width: 60 },
                    { field: 'userName', title: '姓名', width: 200 },
                    { field: 'depart', title: '部门' },
                ],
                rules: {
                    defaultRadio1: [
                        {required: true, type: 'number', message: $t('page.common.noEmpty'), trigger: 'change'},
                    ],
                    defaultRadio2: [
                        {required: true, type: 'object', message: $t('page.common.noEmpty'), trigger: 'change'},
                    ],
                    defaultCheckbox1: [
                        {required: true, type: 'array', message: $t('page.common.noEmpty'), trigger: 'change'},
                    ],
                    defaultCheckbox2: [
                        {required: true, type: 'array', message: $t('page.common.noEmpty'), trigger: 'change'},
                    ],
                },
            }
        },
        computed: {},
        methods: {
            // 单选
            handleRadioSelect (row) {
                if (JSON.stringify(row) == '{}') {
                    this.data.defaultRadio1 = null
                } else {
                    this.data.defaultRadio1 = row.id
                }
                this.$refs.form.$refs.form.validateField('defaultRadio1')
            },
            // 单选2
            handleRadioSelect2 (row) {
                if (JSON.stringify(row) == '{}') {
                    this.data.defaultRadio2 = null
                } else {
                    this.data.defaultRadio2 = row
                }
                this.$refs.form.$refs.form.validateField('defaultRadio2')
            },
            // 多选
            handleCheckSelect (rows) {
                this.data.defaultCheckbox1 = []
                if (rows && rows.length) {
                    rows.forEach(item => {
                        this.data.defaultCheckbox1.push(item.id)
                    })
                } else {
                    this.data.defaultCheckbox1 = []
                }
                this.$refs.form.$refs.form.validateField('defaultCheckbox1')
            },
            // 多选2
            handleCheckSelect2 (rows) {
                this.data.defaultCheckbox2 = []
                if (rows && rows.length) {
                    this.data.defaultCheckbox2 = rows
                } else {
                    this.data.defaultCheckbox2 = []
                }
                this.$refs.form.$refs.form.validateField('defaultCheckbox2')
            },
            // 按钮点击弹出，多选3
            handleCheckSelect3 (rows) {
                this.data.defaultCheckbox3 = []
                if (rows && rows.length) {
                    this.data.defaultCheckbox3 = rows
                } else {
                    this.data.defaultCheckbox3 = []
                }
            },
            // 点击按钮显示弹窗
            handleBtnClick () {
                this.$refs.btnModal.handleShow()
            },
            // 查询
            handleQuery () {
                this.$refs.xModal.getData()
            }
        },
        created () {},
        mounted () {
        },
    };
</script>
<style lang="less">
</style>
