<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-form :col="query.col" :labelWidth="query.labelWidth"
                                ref="form" :button="query.button" :rules="rules">
                        <bingo-grid-item>
                            <bingo-form-item label="绑定字符串" prop="weekNumber" label-for="weekNumber">
                                <bmsa-input-part v-model="inputData1"></bmsa-input-part>
                                {{inputData1}} ============= 长度{{inputData1.length}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="绑定字符串回显" prop="weekNumber" label-for="weekNumber">
                                <bmsa-input-part v-model="inputData2">
                                </bmsa-input-part>
                                {{inputData2}} ============= 长度{{inputData2.length}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="绑定数组" prop="weekNumber" label-for="weekNumber">
                                <bmsa-input-part v-model="inputData3"></bmsa-input-part>
                                {{inputData3}} ============= 长度{{inputData3.length}}
                            </bingo-form-item>
                        </bingo-grid-item>
                        <bingo-grid-item>
                            <bingo-form-item label="绑定数组回显" prop="weekNumber" label-for="weekNumber">
                                <bmsa-input-part v-model="inputData4"
                                                 :numberLen="9"
                                                 :blankIndex="[3,6]">
                                </bmsa-input-part>
                                {{inputData4}} ============= 长度{{inputData4.length}}
                            </bingo-form-item>
                        </bingo-grid-item>
                    </bingo-form>
                    
                    <Divider>零件号示例</Divider>
                    <bingo-form :col="query2.col" :labelWidth="query2.labelWidth" :data="data"
                                ref="form" :button="query2.button" :rules="rules2">
                        <bingo-grid-item>
                            <bingo-form-item label="零件号" prop="partNum" label-for="partNum">
                                <bmsa-input-part v-model="data.partNum"
                                                 :numberLen="18"
                                                 :blankIndex="[]"></bmsa-input-part>
                            </bingo-form-item>
                        </bingo-grid-item>
                        <br/>
                        <p>{{data.partNum}} ============= 长度{{data.partNum.length}}</p>
                    </bingo-form>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、v-model代表双向绑定，包括Array和String，常用String</p>
                    <p style="margin-top: 12px">2、numberLen属性代表控制可输入字符的长度，键盘左右可以控制切换位置</p>
                    <p style="margin-top: 12px">3、blankIndex属性可在输入区域指定位置插入空格，此空格不会显示在数据中，只是单纯的用于隔断</p>
                    <p style="margin-top: 12px">4、on-change数据改边事件，返回的参数分别是字符串形式和数组形式的数据</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'bmsa-input-part-demo',
        components: {
        },
        data () {
            const validatePart = (rule, value, callback) => { // 零件号校验
                if (value === '') {
                    callback(new Error('请输入零件号！'));
                }
                // 规则校验开始
                let inputValue = value.replace(/(^\s*)|(\s*$)/g, "") // 输入的数据去掉左右空格
                let inputArr = inputValue.split('') // 字符串转数组
                if (inputValue.length == 11) { // 判断是否满足11位规则
                    if (inputArr[3] == ' ' && inputArr[7] == ' ') {
                        callback();
                    } else {
                        callback(new Error('输入的零件号格式不正确！'));
                    }
                } else if (inputValue.length == 15) { // 判断是否满足15位规则
                    if (inputArr[3] == ' ' && inputArr[7] == ' ' && inputArr[11] == ' ') {
                        callback();
                    } else {
                        callback(new Error('输入的零件号格式不正确！'));
                    }
                } else {
                    callback(new Error('输入的零件号格式不正确！'));
                }
            };
            return {
                split1: 0.7,
                query: {
                    col: 1,
                    labelWidth: 140,
                    button: false
                },
                query2: {
                    col: 2,
                    labelWidth: 110,
                    button: false
                },
                data: {
                    partNum: '',
                },
                rules: {
                },
                rules2: {
                    partNum: [
                        { required: true, validator: validatePart, trigger: 'blur' }
                    ],
                },
                inputData1: '',
                inputData2: '11  334 aabbccd',
                inputData3: [],
                inputData4: [1, 3, 5, '', 4, '', 8],
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
        }
    };
</script>
<style lang="less" scoped>
</style>
