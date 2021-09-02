<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane left-pane">
                    <bingo-part :backUrl="backUrl"
                                :actionUrl="actionUrl"
                                :checkIndex="checkIndex"
                                :defects="defects"
                                :model="model"
                                @on-success="handleSuccess"
                                @on-part-click="onClick">
                    </bingo-part>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、该组件用于显示零件，并标注零件缺陷位置，用于后期维护与展示</p>
                    <p style="margin-top: 12px">2、model参数代表当前零件数据</p>
                    <p style="margin-top: 12px">3、backUrl为图片地址，为空时组件可自行上传</p>
                    <p style="margin-top: 12px">4、gridX、gridY为横纵网格数，默认是5、4，整个组件的宽高比为5：4，使用时只需定义宽度即可</p>
                    <p style="margin-top: 12px">5、checkIndex为选中的某个网格</p>
                    <p style="margin-top: 12px">6、@on-part-click为点击事件，返回的参数是点击的位置和当前零件的数据</p>
                    <p style="margin-top: 12px">7、defects为涂色的位置，每个集合里面有四个属性，imgPositionX、imgPositionY代表x、y轴位置，
                    isRepair代表是否已维修，true时代表已维修，显示绿色，false时显示红色，numberPosition代表缺陷编号</p>
                </div>
            </Split>
        </Card>
    </div>
</template>
<script>
    import img from '../../../assets/images/car.jpg'
    export default {
        name: 'bingo-part-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                model: {
                    name: '零件1'
                },
                backUrl: img, // 背景图片
                actionUrl: '//jsonplaceholder.typicode.com/posts/', // 上传地址
                checkIndex: {}, // 网格选中的位置
                defects: [{imgPositionX: 3, imgPositionY: 2, isRepair: true, numberPosition: 1}],
            }
        },
        computed: {},
        created () {},
        mounted () {
        },
        methods: {
            // 上传成功
            handleSuccess (response, file) {
                this.$emit('on-success', response.data, file)
            },
            // 图片的点击事件 index:点击的位置，data当前零件数据
            onClick (index, data) {
                this.checkIndex = index
                this.$BMessage.success('当前零件是：' + data.name)
            }
        }
    };
</script>
<style lang="less" scoped>
    .left-pane {
        width: 400px;
    }
</style>
