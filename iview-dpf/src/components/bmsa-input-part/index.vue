<!--
* 零件号组件
* 可自定义规则输入编码，一般用于表单中输入零件号、银行卡号、验证码等等
-->
<template>
    <div class="bmsa-input-part-wrapper ivu-input">
        <template v-for="(item, index) in numberLen">
            <Input class="node-input"
                   :key="index"
                   :maxlength="1"
                   v-model="model[index]"
                   v-direction="{x: (index+1), y: 0, index: index}"
                   @on-change="handleChange"
                   @on-focus="handleFocus($event, item, index)"/>
            <span v-if="showBlank(index)">&nbsp;&nbsp;</span>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'demo-part-num',
        components: {
        },
        data () {
            return {
                direction: null, // 指令
                // data: new Array(this.numberLen)
            }
        },
        props: {
            value: { // 双向绑定
                type: [String, Array],
                default: ''
            },
            numberLen: { // 可输入字符的长度
                type: Number,
                default: 15
            },
            blankIndex: { // 空格插入的位置
                type: Array,
                default: () => {
                    return [3, 7, 11]
                }
            }
        },
        computed: {
            model: { // 双向绑定 数组形式有空格元素 字符串形式有空格位置
                get: function () {
                    let arr = new Array()
                    for (let i=0; i<this.numberLen; i++) {
                        arr[i] = ''
                    }
                    if (typeof this.value == 'string') { // 字符串形式
                        this.value.split('').forEach((item, index) => {
                            if (item && item != ' ') {
                                arr[index] = item
                            } else {
                                arr[index] = ''
                            }
                        })
                        return arr
                    } else { // 数组形式
                        this.value.forEach((item, index) => {
                            if (item && item != ' ') {
                                arr[index] = item
                            } else {
                                arr[index] = ''
                            }
                        })
                        return arr
                    }
                },
                set: function (value) {
                    this.$emit('input', value);
                },
            },
            showBlank () { // 添加空格的位置
                return function (index) {
                    let flag = false
                    this.blankIndex.forEach(item => {
                        if (index+1 == item) {
                            flag = true
                        }
                    })
                    return flag
                }
            }
        },
        methods: {
            // 聚焦
            handleFocus (e) {
                let obj = e.srcElement
                obj.focus()
                if (obj.value == ' ') { // 聚焦时控制是空格的话则可以录入数据
                    obj.value = ''
                }
                let len = obj.value.length
                setTimeout(() => {
                    obj.selectionStart = obj.selectionEnd = len
                })
                this.$emit('on-focus', e.value)
            },
            // input内容改变后的事件
            handleChange (e) {
                if (e.data && e.data.length) {
                    this.direction.next()
                }
                let valueStr = ''
                this.model.forEach(item => {
                    valueStr += item ? item.toString() : ' '
                })
                if (typeof this.value == 'string') { // 根据字符串回显则绑定字符串形式
                    this.$emit('input', valueStr);
                } else { // 根据数组回显则绑定数组形式
                    this.$emit('input', this.model);
                }
                // 数据改边emit， 返回值：字符串、数组
                this.$emit('on-change', valueStr, this.model);
            }
        },
        created () {
            let self = this
            this.direction = this.$getDirection() // 获取指令属性，使用指令解决原生写法左右切换时的卡顿问题
            this.direction.on('keydown', function (e, val) { // 监听键盘事件
                if (e.keyCode === 39) { // 左方向键
                    self.direction.next() // 跳转下一位
                }
                if (e.keyCode === 37) { // 右方向键
                    self.direction.previous()
                }
                if (e.keyCode === 8 && (!self.model[val.index] || self.model[val.index]==' ')) { // 删除键 && 当前位置没值，则返回到上一位
                    self.direction.previous() // 返回上一位
                }
            })
        },
        mounted () {
        },
    };
</script>
<style lang="less" scoped>
    .bmsa-input-part-wrapper {
        overflow: hidden;
        .node-input {
            width: 10px;
            margin-right: 2px;
            /deep/ .ivu-input {
                height: 20px;
                border: unset;
                border-radius: unset;
                text-align: center;
                border-bottom: 1px solid #dcdee2;
                padding: 0;
                &:focus {
                    box-shadow: unset;
                    border-color: #57a3f3;
                }
            }
        }
    }
</style>
