<template>
    <div class="bmsa-modal-select-wrapper">
        <div class="bmsa-modal-select-tooltip" v-if="showInput">
            <Input readonly
                   v-model="queryRadioData"
                   :icon='icon'
                   :clearable="!multiple"
                   @on-click="handleShow"
                   @on-focus="handleShow"
                   @on-blur="handleBlur"
                   @on-clear="handleRadioClose"/>
            <!--选中数据后显示-->
            <div class="bmsa-modal-select-tag" v-if="multiple">
                <Tag v-for="(item, key) in getCheckSelect"
                     :key="key"
                     closable
                     @on-close="handleCheckClose(item)">
                    {{item[rowName]}}
                </Tag>
                <Tooltip :content="getTooltip" transfer v-if="checkSelect.length>maxTagCount" :max-width="150">
                    <Tag v-if="checkSelect.length>maxTagCount">
                        + {{checkSelect.length-maxTagCount}}...
                    </Tag>
                </Tooltip>
            </div>
        </div>
        <!--弹窗-->
        <bingo-modal ref="modal"
                     class-name="bmsa-model-select-modal"
                     v-model="show"
                     :title="title"
                     :closable="model.closable"
                     :maskClosable="model.maskClosable"
                     :fullscreen="model.fullscreen"
                     :draggable="model.draggable"
                     :footer-hide="model.footerHide"
                     :width="model.width"
                     @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange">
            <div class="bmsa-modal-select-table">
                <slot name="query"></slot>
                <vxe-grid ref="xTable" v-bind="gridOptions" class="bmsa-table"
                          :row-id="rowId"
                          :checkbox-config="{checkRowKeys: getCheckDefault, trigger: 'row'}"
                          @current-change="handleRadioSelect"
                          @cell-dblclick="handleRadioChange"
                          @checkbox-change="handleCheckChange"
                          @checkbox-all="handleCheckAll">
                    <!--分页-->
                    <template #pager>
                        <vxe-pager border
                                   size="medium"
                                   align="center"
                                   :layouts="['Total', 'PrevPage', 'Number', 'NextPage', 'Sizes']"
                                   :current-page.sync="page.currentPage"
                                   :page-size.sync="page.pageSize"
                                   :total="page.totalResult"
                                   @page-change="handlePageChange">
                        </vxe-pager>
                    </template>
                </vxe-grid>
                <!--多选显示选中的集合-->
                <p v-if="multiple">{{$t('bmsa.bingoModalSelect.data')}}：{{checkSelect.length}}</p>
                <div class="bmsa-model-select-show-all" v-if="multiple">
                    <textarea name="" cols="3" class="ivu-input">
                    </textarea>
                    <div class="tag-div">
                        <div class="ivu-tag ivu-tag-checked" v-for="(item, key) in checkSelect" :key="key">
                            <span class="ivu-tag-text">{{item[rowName]}}</span>
                            <i class="ivu-icon ivu-icon-ios-close" v-if="!item._disabled" @click="handleCheckClose(item)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </bingo-modal>
    </div>
</template>
<script>
    export default {
        name: 'bingo-modal-select',
        data () {
            return {
                queryRadioData: '', // 选中后显示的内容
                show: false,
                model: { // 弹窗的属性
                    closable: true,
                    fullscreen: false,
                    maskClosable: true,
                    draggable: false,
                    footerHide: false,
                    width: '900'
                },
                gridOptions: { // 表格的通用配置
                    height: this.height,
                    data: [],
                    border: true,
                    resizable: true,
                    showHeaderOverflow: true,
                    showOverflow: true,
                    autoResize: true,
                    highlightHoverRow: true,
                    loading: false,
                    highlightCurrentRow: !this.multiple,
                    size: 'small',
                    stripe: true, // 斑马纹
                    columns: this.columns
                },
                page: { // 表格分页
                    currentPage: 1, // 查询页数
                    pageSize: 10, // 查询数量
                    totalResult: 0, // 总数量
                },
                radioSelect: {}, // 单选选中的数据
                checkSelect: [], // 多选选中的数据
            }
        },
        props: {
            icon: { // input上的图标
                type: String,
                default: 'md-person'
            },
            title: {
                type: String,
                default: '编辑'
            },
            columns: { // 表格列
                type: Array,
                default: () => {
                    return []
                }
            },
            apiList: { // 查询数据源的api方法
                type: Function,
            },
            rowId: { // 区分数据唯一的字段
                type: String,
                default: 'id'
            },
            rowName: { // 选中后显示的字段
                type: String,
                default: 'name'
            },
            multiple: { // 是否支持多选
                type: Boolean,
                default: false
            },
            isDefaultGather: { // 回显时是否根据数据集回显，默认是直接根据rowId回显
                type: Boolean,
                default: false
            },
            height: { // 弹窗表格的高度
                type: [String, Number],
                default: '350'
            },
            query: { // 自定义的过滤条件
                type: Object,
                default: () => {
                    return {}
                }
            },
            defaultRadio: { // 单选时默认回显的数据
                type: [String, Number, Object],
                default: null
            },
            defaultCheckbox: { // 多选时默认回显的数据
                type: Array,
                default: () => {
                    return []
                }
            },
            maxTagCount: { // input框最多显示的个数
                type: Number,
                default: 2
            },
            showInput: { // 是否显示input，可用于按钮形式弹出
                type: Boolean,
                default: true
            }
        },
        computed: {
            // 获取显示框内应该显示的数据，这样写性能最佳
            getCheckSelect () {
                return this.checkSelect.slice(0, this.maxTagCount)
            },
            getTooltip () { // 构造显示的tooltip
                let message = []
                if (this.checkSelect.length) {
                    this.checkSelect.forEach((item, key) => {
                        if (key > this.maxTagCount - 1) {
                            message.push(item[this.rowName])
                        }
                    })
                }
                return message.join(',')
            },
            getCheckDefault () { // 多选情况下获取默认回显的字段集合
                let rowIds = []
                if (this.isDefaultGather) { // 根据数据集回显
                    this.defaultCheckbox.forEach(item => {
                        rowIds.push(item[this.rowId])
                    })
                } else {
                    rowIds = this.defaultCheckbox
                }
                return rowIds
            }
        },
        watch: {
        },
        created () {
        },
        methods: {
            // 点击打开弹窗
            handleShow () {
                if (!this.columns.length) {
                    this.$Message.warning('请传入表格列！')
                    return
                }
                if (this.api == {}) {
                    this.$Message.warning('请传入表格api！')
                    return
                }
                this.page = { // 重置表格分页
                    currentPage: 1,
                    pageSize: 10,
                    totalResult: 0,
                }
                this.$refs.modal.show = true;
                this.getData() // 获取列表数据源
                this.$emit('on-open-modal');
            },
            // 失焦事件 用于单选时，input框重置数据
            handleBlur () {
                if (!this.multiple) { // 单选
                    if (JSON.stringify(this.radioSelect)!='{}') {
                        this.queryRadioData = this.radioSelect[this.rowName]
                    } else {
                        this.queryRadioData = ''
                    }
                }
            },
            // 构造表格列
            setColumns () {
                // 多选时添加选框
                if (this.columns && this.columns.length) {
                    if (this.multiple) { // 多选
                        this.columns.unshift({
                            type: 'checkbox',
                            align: 'center',
                            fixed: 'left',
                            width: 60
                        })
                    }
                }
            },
            // 弹窗点击确定
            ok () {
                this.$refs.modal.show = false; // 关闭modal
                if (this.multiple) { // 多选
                    this.$emit('on-select', this.checkSelect); // 多选点击确定
                } else {
                    this.queryRadioData = this.radioSelect[this.rowName]
                    this.$emit('on-select', this.radioSelect); // 多选点击确定
                }
            },
            // 弹窗点击取消
            cancel () {
                this.$refs.modal.show = false;
                this.$emit('on-cancel');
            },
            // 弹窗状态发生改边时的回调
            visibleChange (value) { // 选人弹窗状态
                this.$emit('on-visible-change', this.show)
            },
            // 调用接口(核心接口)，接口返回数据格式是data[rows:{}]
            getApiData (params) {
                // 核心api，需要自定义传，要求根据分页查询。
                return new Promise((resolve) => {
                    this.apiList(params).then(res=>{
                        resolve(res)
                    })
                })
            },
            // 获取列表数据源，刷新数据一律走此方法
            getData (params) {
                let page = {
                    pageNum: this.page.currentPage,
                    pageSize: this.page.pageSize,
                }
                if (JSON.stringify(this.query)!='{}') { // 有查询条件
                    page = Object.assign(page, this.query)
                }
                if (params) { // 有查询条件
                    page = Object.assign(page, params)
                }
                this.gridOptions.loading = true
                this.getApiData(page).then(res => { // 调用接口
                    this.gridOptions.data = res.rows // 获取数据源
                    this.page.totalResult = res.total // 获取总数
                    this.gridOptions.loading = false
                    // 构造回显后必须从新reloadData下表格，多选时回显需要此方法
                    if (this.$refs.xTable) {
                        this.$refs.xTable.reloadData(this.gridOptions.data)
                    }
                    // 单选的时候回显高亮，单选时回显需要此方法
                    this.getRadioHighlight()
                })
            },
            // 获取默认选中的数据，单选：radioSelect，多选：checkSelect。代表选中的数据，组件初始化的时候就要获取到
            // 要求构造好回显参数再触发组件渲染，此方法多选时略卡，所以没做监听，只在初始化时触发一次
            getDefaultSelect () {
                // 获取默认选中的数据
                this.radioSelect = {} // 单选时回显
                this.checkSelect = [] // 多选时
                if (this.isDefaultGather) { // 根据数据集回显
                    if (this.multiple && this.defaultCheckbox.length) { // 多选
                        this.checkSelect = this.defaultCheckbox
                    } else if (!this.multiple && this.defaultRadio) { // 单选
                        if (this.defaultRadio.constructor === Object) { // 判断是对象
                            this.radioSelect = this.defaultRadio
                            this.queryRadioData = this.radioSelect[this.rowName]
                        } else {
                            this.$Message.warning('回显的参数(defaultRadio)必须是对象！')
                        }
                    }
                } else { // 根据rowId回显
                    const allApi = [] // 异步接口集合
                    if (this.multiple && this.defaultCheckbox.length) { // 多选
                        this.defaultCheckbox.forEach(item => {
                            let page = {
                                pageNum: this.page.currentPage,
                                pageSize: this.page.pageSize,
                            }
                            page[this.rowId] = item
                            const oneApi = this.getApiData(page)
                            allApi.push(oneApi)
                        })
                        Promise.all(allApi).then((data) => { // 获取选中的数据
                            data.forEach(item => {
                                item.rows.forEach(item2 => {
                                    this.checkSelect.push(item2)
                                })
                            })
                        })
                    } else if (!this.multiple && this.defaultRadio) { // 单选
                        let page = {
                            pageNum: this.page.currentPage,
                            pageSize: this.page.pageSize,
                        }
                        page[this.rowId] = this.defaultRadio
                        this.getApiData(page).then(res => {
                            if (res.rows.length) {
                                this.radioSelect = res.rows[0]
                                this.queryRadioData = this.radioSelect[this.rowName]
                            }
                        })
                    }
                }
            },
            // 切换页码
            handlePageChange ({ currentPage, pageSize }) {
                this.page.currentPage = currentPage
                this.page.pageSize = pageSize
                this.getData() // 获取列表数据源
            },
            // 单选事件，单机时选中行
            handleRadioSelect ({ row }) {
                if (!this.multiple) {
                    this.radioSelect = row
                }
            },
            // 单选事件，双击行
            handleRadioChange ({ row }) {
                if (!this.multiple) {
                    this.radioSelect = row
                    this.queryRadioData = this.radioSelect[this.rowName]
                    this.$refs.modal.show = false;
                    this.$emit('on-select', this.radioSelect) // 选完查询条件后的回调
                }
            },
            // 单选的时候回显触发高亮，由于接口分页，所以每次getData都要触发
            getRadioHighlight () {
                if (!this.multiple && this.defaultRadio) {
                    for (let i=0; i<this.gridOptions.data.length; i++) {
                        let item = this.gridOptions.data[i]
                        if (item[this.rowId] == (this.isDefaultGather ? this.defaultRadio[this.rowId] : this.defaultRadio)) {
                            this.$refs.xTable.setCurrentRow(this.gridOptions.data[i])
                            break
                        }
                    }
                }
            },
            // 单选时删除input中标签
            handleRadioClose () {
                if (!this.multiple) {
                    let deleteItem = JSON.parse(JSON.stringify(this.radioSelect))
                    this.radioSelect = {}
                    this.$emit('on-select', {}) // 选完查询条件后的回调
                    this.$emit('on-delete', deleteItem) // 单独提供删除的回调方法
                }
            },
            // 多选事件
            handleCheckChange ({ row }) {
                if (!this.multiple) return
                let flag = true // true为选中，false为取消选中
                let index = 0
                for (let i=0; i<this.checkSelect.length; i++) {
                    let item = this.checkSelect[i]
                    if (item[this.rowId] == row[this.rowId]) {
                        flag = false
                        index = i
                        break
                    }
                }
                if (flag) { // 选中添加
                    this.checkSelect.push(row)
                } else { // 取消删除
                    this.checkSelect.splice(index, 1)
                }
                // 选中的全部数据/参数为当前选中的数据
                this.$emit('on-select', this.checkSelect, row)
            },
            // 全选事件
            handleCheckAll ({ records }) {
                if (!this.multiple) return
                let datas = JSON.parse(JSON.stringify(this.checkSelect)) // 拷贝当前选中的数据
                if (records.length) { // 表示选中当前页数据
                    this.gridOptions.data.forEach(item => { // 当前页数据循环
                        let flag = true
                        datas.forEach(item2 => {
                            if (item[this.rowId] == item2[this.rowId]) { // 代表选中的数据中已存在该数据
                                flag = false
                            }
                        })
                        if (flag) { // 添加
                            this.checkSelect.push(item)
                        }
                    })
                } else { // 表示取消选中当前页数据
                    this.gridOptions.data.forEach(item => { // 当前页数据循环
                        let rowId = null
                        datas.forEach(item2 => {
                            if (item[this.rowId] == item2[this.rowId]) { // 代表选中的数据中已存在该数据
                                rowId = item2[this.rowId]
                            }
                        })
                        if (rowId) { // 添加
                            this.checkSelect.forEach((item, index) => {
                                if (item[this.rowId] == rowId) {
                                    this.checkSelect.splice(index, 1)
                                }
                            })
                        }
                    })
                }
                this.$emit('on-select', this.checkSelect)
            },
            // 多选时删除input中标签
            handleCheckClose (row) {
                if (!this.multiple) return
                for (let i=0; i<this.checkSelect.length; i++) {
                    let item = this.checkSelect[i]
                    if (item[this.rowId] == row[this.rowId]) {
                        this.checkSelect.splice(i, 1)
                        break
                    }
                }
                if (this.$refs.xTable) {
                    this.$refs.xTable.reloadData(this.gridOptions.data) // 从新加载数据
                }
                this.$emit('on-select', this.checkSelect) // 选完查询条件后的回调
                this.$emit('on-delete', row)
            },
        },
        mounted () {
            this.setColumns() // 构造表格列
            this.getDefaultSelect() // 获取选中数据
        },
    }
</script>
<style lang="less">
    .bmsa-modal-select-wrapper {
        .bmsa-modal-select-tooltip { // input框
            position: relative;
            overflow: hidden;
            .bmsa-modal-select-tag { // 显示的标签
                max-width: calc(~'100% - 40px');
                overflow: hidden;
                position: absolute;
                top: 2px;
                left: 4px;
            }
        }
    }
    .bmsa-model-select-modal {
        .ivu-modal-body {
            padding: 16px 16px 0 16px !important;
        }
    }
    .bmsa-model-select-show-all { // 多选时，弹窗下面显示的集合
        position: relative;
        overflow: hidden;
        overflow-y: auto;
        margin-bottom: 4px;
        .tag-div {
            position: absolute;
            top: 1px;
            left: 1px;
        }
    }
</style>
