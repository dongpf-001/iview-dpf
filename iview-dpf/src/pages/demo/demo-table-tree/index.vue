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
                allChildData: [], // 该节点所有子级节点
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
                } else { // 逻辑2，如果该节点是取消选中
                    this.handleFalse(this.data12, row, flag) // 取消选中他的所有父节点
                    this.handleFalseChild(this.data12, row, flag) // 取消选中他所有的子结点
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
            handleFalse (dataArr, row, flag) {
                // 先判断同级的其他子结点是否有选中的状态
                let changeParentFlag = this.handleChangeParent(row)
                for (let i=0; i<dataArr.length; i++) {
                    let item = dataArr[i]
                    if (item.id == row.parentId) { // 先记录父节点的数据
                        this.parentRow = item
                    }
                    if (item.id == row.id) { // 这个判断语句必定会进去一次，而且只会进去一次
                        this.$set(item, '_checked', flag)
                        // 当前节点改变后,如果存在父节点，并且父节点也要改变，则去改边父节点的数据，以此类推直到根节点结束
                        if (item.parentId != '0' && changeParentFlag) { // 开启下一轮循环，把父节点当成当前数据
                            this.handleFalse(this.data12, this.parentRow, flag)
                        }
                        return
                    }
                    // 如果循环到当前层级最后一条数据仍没找到该节点，则找他的子级，然后回调
                    if (item.children && item.children.length) {
                        this.handleFalse(item.children, row, flag)
                    }
                }
            },
            // 判断是否改边父节点状态
            handleChangeParent (row) {
                this.tongjiRow = [] // 定义的全局变量制空，看他的名称，他是获取你点击节点的同级其他节点
                this.handleForTree(this.data12, row) // 然后调用循环树型数据方法
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
            // 循环树数据，用于判断
            handleForTree (dataArr, row) {
                for (let i=0; i<dataArr.length; i++) { // 循环树形数据
                    let item = dataArr[i] // 每条数据
                    if (item.id == row.parentId) { // 找到当前节点父级
                        this.tongjiRow = item.children // 父级下面的所有数据就是该节点的同级数据
                        return
                    }
                    // 如果循环到当前层级最后一条数据仍没找到该节点，则找他的子级，然后回调
                    if (item.children && item.children.length) {
                        this.handleForTree(item.children, row) // 有children的话再次回调
                    }
                }
            },
            // 取消选中所有子结点
            handleFalseChild (dataArr, row, flag) {
                this.allChildData = [] // 先查询所有子级节点，然后把数据源中对应的子级节点的状态都变成false
                this.getAllChildData(dataArr, row) // 你写这的时候就把这个方法换成你的接口，直接让this.allChildData等于后台返回的数据
                this.handleForTreeChild(dataArr, flag) // 改变树元数据所有子结点的状态
            },
            // 获取该节点所有子结点的数据，这个方法就相当于你那后台接口，根据父节点查询所有子级节点
            getAllChildData (dataArr, row) {
                dataArr.forEach(item => {
                    if (item.id == row.id) { // 找到当前节点
                        if (item.children && item.children.length) {
                            this.allChildData = this.allChildData.concat(item.children)
                            item.children.forEach(item2 => { // 再查子结点的子结点
                                this.getAllChildData(dataArr, item2)
                            })
                        }
                    }
                    // 如果循环到当前层级最后一条数据仍没找到该节点，则找他的子级，然后回调
                    if (item.children && item.children.length) {
                        this.getAllChildData(item.children, row) // 有children的话再次回调
                    }
                })
            },
            // 循环树数据，用于把所有的子结点都变成false
            handleForTreeChild (dataArr, flag) {
                for (let i=0; i<dataArr.length; i++) { // 循环树形数据
                    let item = dataArr[i] // 每条数据
                    for (let j=0; j<this.allChildData.length; j++) { // 循环所有子结点数据
                        let item2 = this.allChildData[j]
                        if (item.id == item2.id) { // 在树型结构数据中找到当前节点数据
                            this.$set(item, '_checked', flag) // 改变状态
                            break // 跳出循环进行下一次
                        }
                    }
                    // 如果循环到当前层级最后一条数据仍没找到该节点，则找他的子级，然后回调
                    if (item.children && item.children.length) {
                        this.handleForTreeChild(item.children, flag) // 有children的话再次回调
                    }
                }
            },
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
