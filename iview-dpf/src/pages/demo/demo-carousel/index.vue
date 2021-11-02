<template>
    <div class="content-inner">
        <Card>
            <Button @click="onClick">添加</Button>
            {{num}}
            <Carousel loop style="height: 100%">
                <CarouselItem v-for="pageNum in Math.ceil(num/((24/8)*2))" style="height: 100%">
                    <div v-for="item in getShowData(num, pageNum-1)" style="width: 50px;height: 50px">
                        {{item}}
                    </div>
                </CarouselItem>
            </Carousel>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'demo-carousel',
        components: {
        },
        data () {
            return {
                num: 0,
            }
        },
        watch: {
        },
        computed: {
            getShowData () { // 每个轮播页显示的数据
                return function (data, pageNum) {
                    let showData = []
                    let returnData = []
                    for (let i=0; i<data; i++) {
                        showData.push(i)
                    }
                    let num = (24/8)*2 // 每页的数据
                    showData.forEach((item, index) => {
                        if (index >= pageNum*num && index<(pageNum+1)*num) {
                            returnData.push(item)
                        }
                    })
                    return returnData
                }
            }
        },
        created () {},
        mounted () {
        },
        methods: {
            onClick () {
                this.num += 1
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
    /deep/ .ivu-carousel-list {
        width: 100%;
        height: 100%;
        .ivu-carousel-item {
            background-color: lightcyan;
        }
    }
</style>
