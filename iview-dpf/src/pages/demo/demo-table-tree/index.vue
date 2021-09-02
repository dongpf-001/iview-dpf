<template>
    <div>
        <Table row-key="id" :columns="columns16" :data="data12" border>
        </Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                parentRow: null, // 对应父节点的数据
                tongjiRow: [], // 记录同级节点的数据
                columns16: [
                    {
                        title: 'Name',
                        key: 'name',
                        tree: true,
                        render: (h, params) => {
                            return h('span', [
                                h('Checkbox', {
                                    props: {
                                        value: params.row._checked
                                    },
                                    on: {
                                        'on-change': (flag) => {
                                            this.handleChange(params.row, flag)
                                        }
                                    }
                                }),
                                h('span', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data12: [
                    {
                        id: '100',
                        parentId: '0',
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        id: '101',
                        parentId: '0',
                        name: 'Jim Green',
                        age: 24,
                        _showChildren: true,
                        address: 'London No. 1 Lake Park',
                        children: [
                            {
                                id: '10100',
                                parentId: '101',
                                name: 'John Brown',
                                age: 18,
                                address: 'New York No. 1 Lake Park'
                            },
                            {
                                id: '10101',
                                parentId: '101',
                                name: 'Joe Blackn',
                                age: 30,
                                address: 'Sydney No. 1 Lake Park'
                            },
                            {
                                id: '10102',
                                parentId: '101',
                                name: 'Jon Snow',
                                age: 26,
                                address: 'Ottawa No. 2 Lake Park',
                                _showChildren: true,
                                children: [
                                    {
                                        id: '1010200',
                                        parentId: '10102',
                                        name: 'Jim Green',
                                        age: 24,
                                        address: 'New York No. 1 Lake Park'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: '102',
                        parentId: '0',
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        id: '103',
                        parentId: '0',
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            // check状态发生改边触发的事件，里面有两个逻辑，一个是选中，一个是取消选中
            // 参数是当前的数据和改变后的状态
            handleChange (row, flag) {
                if (flag) { // 逻辑1，如果该节点是选中
                    this.handleTrue(this.data12, row, flag)
                } else { // 逻辑2，如果该节点是选中
                    // 先判断同级的其他子结点是否有选中的状态
                    let changeParentFlag = this.handleChangeParent(row)
                    this.handleFalse(this.data12, row, flag, changeParentFlag)
                }
            },
            // 树节点选中，找父节点，一直到根节点，都变成选中
            handleTrue (dataArr, row, flag) {
                // this.parentRow = null // 记录当前节点父节点的数据，得用全局变量
                for (let i=0; i<dataArr.length; i++) {
                    let item = dataArr[i]
                    if (item.id == row.parentId) { // 先记录父节点的数据
                        this.parentRow = item
                    }
                    if (item.id == row.id) { // 这个判断语句必定会进去一次，而且只会进去一次
                        this.$set(item, '_checked', flag)
                        // 当前节点改变后,如果存在父节点，则去改边父节点的数据，以此类推直到根节点结束
                        if (item.parentId != '0') { // 开启下一轮循环，把父节点当成当前数据
                            this.handleTrue(this.data12, this.parentRow, flag)
                        }
                        return
                    }
                    // 如果循环到当前层级最后一条数据仍没找到该节点，则找他的子级，然后回调
                    if (item.children && item.children.length) {
                        this.handleTrue(item.children, row, flag)
                    }
                }
            },
            // 树节点取消选中
            handleFalse (dataArr, row, flag, changeParentFlag) {
                for (let i=0; i<dataArr.length; i++) {
                    let item = dataArr[i]
                    if (item.id == row.parentId) { // 先记录父节点的数据
                        this.parentRow = item
                    }
                    if (item.id == row.id) { // 这个判断语句必定会进去一次，而且只会进去一次
                        this.$set(item, '_checked', flag)
                        // 当前节点改变后,如果存在父节点，并且父节点也要改变，则去改边父节点的数据，以此类推直到根节点结束
                        if (item.parentId != '0' && changeParentFlag) { // 开启下一轮循环，把父节点当成当前数据
                            this.handleFalse(this.data12, this.parentRow, flag, changeParentFlag)
                        }
                        return
                    }
                    // 如果循环到当前层级最后一条数据仍没找到该节点，则找他的子级，然后回调
                    if (item.children && item.children.length) {
                        this.handleFalse(item.children, row, flag, changeParentFlag)
                    }
                }
            },
            // 判断是否改边父节点状态
            handleChangeParent (row) {
                this.tongjiRow = []
                this.handleForTree(this.data12, row)
                let flag = true
                if (this.tongjiRow && this.tongjiRow.length) { // 如果存在同级节点
                    this.tongjiRow.forEach(item => {
                        if (item.id != row.id && item._checked) {
                            flag = false
                        }
                    })
                }
                return flag
            },
            // 循环树数据
            handleForTree (dataArr, row) {
                for (let i=0; i<dataArr.length; i++) {
                    let item = dataArr[i]
                    if (item.id == row.parentId) { // 找到父级
                        this.tongjiRow = item.children
                        return
                    }
                    // 如果循环到当前层级最后一条数据仍没找到该节点，则找他的子级，然后回调
                    if (item.children && item.children.length) {
                        this.handleForTree(item.children, row)
                    }
                }
            }
        }
    }
</script>
<style>
    .ivu-table-cell-tree {
        border: unset;
        background-color: unset;
    }
    .ivu-icon-ios-add:before {
        content: "\F341"
    }
    .ivu-icon-ios-remove:before {
        content: "\F33D"
    }
</style>
