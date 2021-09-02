<template>
    <div class="content-inner">
        <Card>
            <Row style="border: 1px solid #ccc;padding: 10px 0">
                <i-col span="8" class="col-style">1</i-col>
                <i-col span="8" class="col-style">
                    <div ref="tagDiv" class="tagDiv">
                        <!--showTagNumber指计算出应显示多少个tag，v-if是控制条件，超出showTagNumber个数的tag不显示-->
                        <Tag v-for="(item, index) in tags" v-if="index<showTagNumber" :ref="item.name" :name="item.name" :color="item.color" size="large">{{item.name}}</Tag>
                        <!--这个Tag是指标签超出showTagNumber时显示+n-->
                        <Tooltip v-if="showTagFlag" :content="tagTooltip" max-width="200">
                            <Tag size="large">+{{tags.length - showTagNumber}}...</Tag>
                        </Tooltip>
                    </div>
                </i-col>
                <i-col span="8" class="col-style">3</i-col>
            </Row>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'demo-tag-layout',
        components: {
        },
        data () {
            return {
                tags: [
                    {name: 'tag1', color: 'purple'},
                    {name: 'tag2', color: 'purple'},
                    {name: 'tag3', color: 'purple'},
                    {name: 'tag4', color: 'purple'},
                    {name: 'tag5', color: 'purple'},
                    {name: 'tag6', color: 'purple'},
                    {name: 'tag7', color: 'purple'},
                    {name: 'tag8', color: 'purple'},
                    {name: 'tag9', color: 'purple'},
                    {name: 'tag10', color: 'purple'},
                ],
                showTagNumber: 0, // 标签显示的个数
                showTagFlag: false, // 判断标签是否过多
                tagTooltip: '', // +n的tooltip
            }
        },
        computed: {
        },
        created () {},
        mounted () {
            let self = this
            self.getIsShowTags(self)
            window.addEventListener('resize', () => {
                self.showTagNumber = 0
                self.showTagFlag = false
                self.getIsShowTags(self)
            });
        },
        methods: {
            // 计算显示多少个tag
            getIsShowTags (self) {
                self.showTagNumber = self.tags.length // 默认显示全部 必须得先全显示出来，才能获取每个tag的宽度
                self.$nextTick(() => {
                    let tagWidth = 0 // 累计每个Tag的宽度和
                    let tagDivWidth = self.$refs.tagDiv.offsetWidth // 整个装显示标签的div的宽度
                    for (let i=0; i<self.tags.length; i++) {
                        let item = self.tags[i]
                        // self.$refs[item.name][0].$el.offsetWidth指标签的宽度   后面+4指该标签margin-left的大小
                        tagWidth += self.$refs[item.name][0] ? (self.$refs[item.name][0].$el.offsetWidth + 4) : 0
                        if (tagWidth >= tagDivWidth) { // 如果标签的宽度和大于外面div的宽度
                            self.showTagNumber = i-1 // 应该显示多少个标签
                            self.showTagFlag = true // 显示+n的tag
                            break
                        }
                    }
                    if (!self.showTagFlag) return // 如果不显示+n，直接结束
                    let tagTooltipArr = []
                    self.tags.forEach((item, index) => { // 构造tooltip显示的内容
                        if (index >= self.showTagNumber) {
                            tagTooltipArr.push(item.name)
                        }
                    })
                    self.tagTooltip = tagTooltipArr.join(',')
                })
            }
        }
    };
</script>
<style lang="less" scoped>
    .col-style {
        height: 36px;
    }
    .tagDiv {
        display: inline-block;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
</style>
