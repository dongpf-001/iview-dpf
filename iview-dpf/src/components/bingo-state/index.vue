<template>
    <div class="state-wrapper">
        <Poptip :trigger="disabled ? 'click' : 'hover'"
                :disabled="disabled"
                v-if="type!='select' && type!='vertical'"
                :placement="placement">
            <span class="traffic-light" @click="onClick"
                  :style="{width:size+'px', height:size+'px', background: stateColor}"></span>
            <div class="api" slot="content">
                <div v-for='item in states' :key='item.value' class="state-content">
                    <span class="traffic-light" @click="change(item.value)"
                          :style="{width:size+'px', height:size+'px', background: item.color}">
                        <Icon type="md-checkmark" class="state-icon" v-if="state == item.value"/>
                    </span>
                </div>
            </div>
        </Poptip>

        <Select v-model='state' :placeholder="placeholder" :disabled="disabled" :transfer="transfer"
                @on-change='handleSelectState' v-if="type=='select'">
            <span class='traffic-light' slot='prefix' :style="{width:size+'px', height:size+'px', background: stateColor}"></span>
            <Option v-for='item in states' :disabled="item.disabled" :value='item.value' :key='item.value' label=' '>
                <span class="traffic-light" :style="{width:size+'px', height:size+'px', background: item.color}">
                </span>
                <span style="float: right;margin-top: 5px;">{{item.msg}}</span>
            </Option>
        </Select>

        <div v-if="type=='vertical'" class="state-vertical">
            <div class="state-vertical-title">
                <p>{{title}}</p>
            </div>
            <div v-for='item in states' :key='item.value' class="state-vertical-state">
                <span class="traffic-light" @click="change(item.value)"
                      :style="state == item.value ? styleVerticalY(item.color) : styleVerticalN(item.color)">
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'bingo-state',
        data () {
            return {
                state: this.value, // 当前选中状态的value
                stateIcon: this.value,
                showRed: false,
                showRedYellow: false,
                showYellow: false,
                showGreen: false,
            }
        },
        props: {
            states: { // 数据源
                type: [Array, Function],
                default () {
                    return [
                        {
                            value: 1,
                            color: 'red',
                            msg: '警告'
                        },
                        {
                            value: 2,
                            color: 'linear-gradient(to bottom, red 0%, red, red, red, yellow, yellow, yellow, yellow 100%)'
                        },
                        {
                            value: 3,
                            color: 'yellow'
                        },
                        {
                            value: 4,
                            color: 'green'
                        }
                    ]
                }
            },
            value: { // 双向绑定
                type: [String, Number],
                default () {
                    return ''
                }
            },
            disabled: { // 是否禁用
                type: Boolean,
                default: false
            },
            isCondition: { // 选择状态前判断是否有条件
                type: Boolean,
                default: false
            },
            type: { // 组件类型
                type: String,
                default: ''
            },
            title: { // 纵向形式时的title
                type: String,
                default: ''
            },
            size: { // 状态灯的大小
                type: Number,
                default: 22
            },
            placement: { // 默认形态显示灯的方向
                type: String,
                default: 'right'
            },
            placeholder: { // 水印
                type: String,
                default: ''
            },
            transfer: { // 是否提出到body
                type: Boolean,
                default: false
            },
        },
        watch: {
            value (value) {
                this.state = value
            }
        },
        mounted () {
        },
        computed: {
            // 纵向形式状态灯选中样式
            styleVerticalY () {
                return function (color) {
                    let style = {
                        width: `${this.size}px`,
                        height: `${this.size}px`,
                        background: color
                    };
                    return style;
                }
            },
            // 纵向形式状态灯未选中样式
            styleVerticalN () {
                return function (color) {
                    let style = {
                        width: `${this.size}px`,
                        height: `${this.size}px`,
                        opacity: 0.2,
                        background: color
                    };
                    return style;
                }
            },
            // 当前显示灯的颜色
            stateColor () {
                let color = '#C0C0C0';
                this.states.forEach(item => {
                    if (item.value == this.state) {
                        color = item.color
                    }
                })
                return color
            }
        },
        methods: {
            change (type) {
                if (!this.disabled) { // 只读状态下不可操作
                    let _this = this
                    if (this.isCondition) { // 判断是否有条件
                        this.$emit('on-change', type, () => {
                            _this.state = type
                        })
                        this.$emit('input', _this.state);
                    } else {
                        _this.state = type
                        this.$emit('on-change', type)
                        this.$emit('input', _this.state);
                    }
                }
            },
            onClick () {
                this.$emit('on-click');
            },
            // 事件
            handleSelectState (value) {
                for (let state of this.states) {
                    if (state.value === value) {
                        this.stateIcon = state.color;
                        break;
                    }
                }
                this.$emit('input', this.state);
            }
        }
    }
</script>
<style lang="less">
</style>
