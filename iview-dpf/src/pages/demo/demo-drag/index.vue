<template>
    <div class="content-inner">
        <Card>
            <div class="left">
                <Row class="item-row" style="background: #f8f8f9;font-weight: bold">
                    <i-col span="8">序号soft</i-col>
                    <i-col span="8">姓名</i-col>
                    <i-col span="8">年龄</i-col>
                </Row>
                <!--draggable属性可控制哪写子元素不可拖拽，例如class为item的子元素不可拖拽-->
                <draggable class="drop-box1" group="site" :value="list1"
                           @input="handleListChange($event, 'left')" @end="handleEnd($event, 'left')"
                           @update="handleUpdate($event, 'left')" @choose="handleChoose($event, 'left')">
                    <Row v-for="(itemLeft, index) in list1" :id="itemLeft.id" :key="`drag_li1_${index}`" :class="setColor(itemLeft) ? 'handle' : ''"
                        class="item-row" @click.native="onSelect(itemLeft)" :style="setColor(itemLeft) ? 'background:#ebf7ff' : ''">
                        <i-col span="8">{{itemLeft.soft}}</i-col>
                        <i-col span="8">{{itemLeft.name}}</i-col>
                        <i-col span="8">{{itemLeft.age}}</i-col>
                    </Row>
                </draggable>
            </div>
            <div class="right">
                <Row class="item-row" style="background: #f8f8f9;font-weight: bold">
                    <i-col span="8">序号soft</i-col>
                    <i-col span="8">姓名</i-col>
                    <i-col span="8">年龄</i-col>
                </Row>
                <!--draggable属性可控制哪写子元素不可拖拽，例如class为item的子元素不可拖拽-->
                <draggable class="drop-box1" group="site" :value="list2"
                           @input="handleListChange($event, 'right')" @end="handleEnd($event, 'right')"
                           @update="handleUpdate($event, 'right')" @choose="handleChoose($event, 'right')">
                    <Row v-for="(itemRight, index) in list2" :id="itemRight.id" :key="`drag_li1_${index}`" :class="setColor(itemRight) ? 'handle' : ''"
                         class="item-row" @click.native="onSelect(itemRight)" :style="setColor(itemRight) ? 'background:#ebf7ff' : ''">
                        <i-col span="8">{{itemRight.soft}}</i-col>
                        <i-col span="8">{{itemRight.name}}</i-col>
                        <i-col span="8">{{itemRight.age}}</i-col>
                    </Row>
                </draggable>
            </div>
        </Card>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'demo-drag',
        components: {
            draggable
        },
        data () {
            return {
                dragItem: {}, // 要拖拽的元素
                selectArr: [], // 选中的数据集
                options: { group: 'drag_list' },
                list1: [
                    {
                        id: 1,
                        name: '张三',
                        age: '9',
                        soft: 1
                    },
                    {
                        id: 2,
                        name: '李四',
                        age: '10',
                        soft: 2
                    },
                    {
                        id: 3,
                        name: '王五',
                        age: '11',
                        soft: 3
                    },
                    {
                        id: 4,
                        name: '赵六',
                        age: '12',
                        soft: 4
                    },
                    {
                        id: 5,
                        name: '马七',
                        age: '13',
                        soft: 5
                    },
                    {
                        id: 6,
                        name: '侯八',
                        age: '14',
                        soft: 6
                    },
                    {
                        id: 7,
                        name: '孙九',
                        age: '15',
                        soft: 7
                    },
                ],
                list2: [
                    {
                        id: 8,
                        name: '十',
                        age: '16',
                        soft: 8
                    },
                ]
            }
        },
        computed: {
            setColor () { // 给选中的数据添加背景颜色
                return function (item) {
                    let flag = false
                    this.selectArr.forEach(item2 => {
                        if (item.id == item2.id) {
                            flag = true
                        }
                    })
                    return flag
                }
            }
        },
        created () {},
        mounted () {
        },
        methods: {
            // 选中某行
            onSelect (item) {
                if (this.selectArr.indexOf(item) >= 0) { // 选中的数据源是否包含当前数据
                    this.selectArr = this.selectArr.filter(item2 => !(item2.id == item.id)) // 有选中的则删除
                } else {
                    this.selectArr.push(item) // 未选中则添加
                }
                // this.selectArr = [...new Set(this.selectArr)] // 数组去重
            },
            // 拖拽时选中的元素
            handleChoose (value, type) {
                if (this.selectArr.length) { // 多条数据拖动
                    this.dragItem = this.list1[value.oldIndex]
                }
            },
            // 拖拽过程中触发
            handleUpdate (value, type) {
            },
            handleListChange (value, type) {
                if (type == 'left') {
                    this.list1 = value
                    this.selectArr.forEach(item => {
                        this.list1 = this.list1.filter(item2 => !(item2.id == item.id) || item2.id == this.dragItem.id) // 把除拖拽的数据外其他数据删除
                    })
                    let index = this.list1.indexOf(this.dragItem)
                    this.list1 = this.list1.filter(item2 => !(item2.id == this.dragItem.id))
                    this.selectArr = this.selectArr.sort(this.handleCompare('age')) // 对选中的数据进行排序
                    this.selectArr.forEach(item => {
                        this.list1.splice(index, 0, item)
                        index += 1
                    })
                } else if (type == 'rigth') {
                    this.list2 = value
                }
            },
            // 对数组里面的对象根据某个属性排序
            handleCompare(property){
                return function(a, b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1 - value2;
                }
            },
            handleEnd (event, type) {
                this.selectArr = []
                this.$BMessage.success('更改成功！')
            }
        }
    };
</script>
<style lang="less" scoped>
    .left {
        width: 48%;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px;
        float: left;
    }
    .right {
        width: 48%;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px;
        float: right;
    }
    .drop-box1 {
        height: calc(~"100% - 38px");
    }
    .item-row {
        border-top: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        text-align: center;
        .ivu-col {
            padding: 8px 4px;
            border-left: 1px solid #ccc;
        }
    }
    .dragClass {
        border: 1px solid #ebf7ff;
    }
</style>
