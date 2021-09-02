<template>
    <div class="content-inner">
        <Card>
            <bingo-query ref="query" type="float" :col="query.col" :labelWidth="query.labelWidth" @on-submit="handleGetData"
                         @on-reset="handleReset" :data="queryData" >
                <bingo-grid-item>
                    <bingo-form-item label="姓名" label-for="userName">
                        <Input v-model.trim="queryData.userName" />
                    </bingo-form-item>
                </bingo-grid-item>
            </bingo-query>
            <bmsa-table-tool class="bmsa-query-height">
                <!--左侧自定义按钮-->
                <template #left-buttons>
                    <Button type="primary" customIcon="iconfont iconxinjian">{{ $t('page.common.new') }}</Button>
                    <Button type="primary" customIcon="iconfont iconshanchu">批量操作</Button>
                </template>
                <!--其他操作，可用于简单查询-->
                <template #other-buttons>
                    <Input  shape="circle" suffix="ios-search" style="width: auto" />
                </template>
                <!--右侧自定义按钮-->
                <template #right-buttons>
                    <Tooltip transfer content="自定义">
                        <span>
                            <i class="icon iconfont iconshanchu"></i>
                        </span>
                    </Tooltip>
                </template>
                <vxe-grid slot="table" ref='xGrid' v-bind="gridOptions" class="bmsa-table">
                    <template #operate="{ row }">
                        <bmsa-table-action :row="row" @on-edit="handleEdit" @on-delete="handleDelete"></bmsa-table-action>
                    </template>
                </vxe-grid>
            </bmsa-table-tool>
        </Card>
    </div>
</template>
<script>
    import Api from '@/api/demo';
    export default {
        name: 'bmsa-table',
        components: {
        },
        data () {
            return {
                allAlign: null,
                selectRow: null, // 单选
                query: { // 过滤区域
                    col: 3, // 显示几列
                    labelWidth: 100 // label宽度
                },
                queryData: {
                    userName: ''
                },
                gridOptions: { // 表格的通用配置
                    height: 'auto',
                    data: [],
                    border: true,
                    resizable: true,
                    showHeaderOverflow: true,
                    showOverflow: true,
                    autoResize: true,
                    highlightHoverRow: true,
                    loading: false,
                    size: 'small',
                    stripe: true, // 斑马纹
                    columns: [
                        { type: 'checkbox', width: 60, align: 'center' },
                        { type: 'seq', title: $t('page.common.index'), width: 60, align: 'center' },
                        { field: 'userName', title: $t('system.page.user.UserName') },
                        { field: 'depart', title: $t('system.page.user.Department') },
                        { title: '操作', width: 200, align: 'center', slots: { default: 'operate' } }
                    ]
                },
            }
        },
        computed: {},
        created () {},
        mounted () {
            // 获取表格数据
            this.handleGetData()
        },
        methods: {
            // 查询
            handleGetData () {
                let params = {
                    pageNum: 1,
                    pageSize: 10
                }
                Api.getList(params).then((res) => {
                    this.gridOptions.data = res.rows
                })
            },
            // 重置
            handleReset () {
                this.queryData = {
                    userName: ''
                }
                this.handleGetData()
            },
            // 编辑
            handleEdit (row) {
                this.$BMessage.success('编辑id为：' + row.id)
            },
            // 删除
            handleDelete (row) {
                this.$BMessage.success('删除id为：' + row.id)
            }
        }
    };
</script>
<style lang="less" scoped>
    .demo-table {
        width: 100%;
        height: 100%;
    }
    .menu-vxe-left {
        margin-left: 8px;
    }
</style>
