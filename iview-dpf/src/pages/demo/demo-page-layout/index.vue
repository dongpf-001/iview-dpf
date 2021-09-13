<template>
    <div class="content-inner">
        <Card>
            <div style="width: 100%;height: 80px;margin-bottom: 5px;border: 1px solid #ccc;border-radius: 4px">
            
            </div>
            <div style="height: calc(100% - 85px);width: 100%;">
                <div style="height: 100%;width: 90%;margin: 0 auto">
                    <div class="defects-lest">
                        <div class="div1" v-proportion="0.6">
                        </div>
                        <div v-proportion="0.5" style="margin-bottom: 4px">
                            <div class="div2">
                            </div>
                            <div class="div3">
                            </div>
                        </div>
                        <div v-proportion="0.5">
                            <div class="div4">
                            </div>
                            <div class="div5">
                            </div>
                        </div>
                    </div>
                    <div class="defects-center">
                        <div class="left">
                            <div class="div1" v-proportion="0.85"></div>
                            <div class="div2" v-proportion="1.6"></div>
                            <div class="div3" v-proportion="0.65"></div>
                        </div>
                        <div class="center">
                            <div class="div1" v-proportion="0.5"></div>
                            <div class="div2" v-proportion="1"></div>
                            <div class="div3" v-proportion="0.5"></div>
                        </div>
                        <div class="right">
                            <div class="div1" v-proportion="0.85"></div>
                            <div class="div2" v-proportion="1.6"></div>
                            <div class="div3" v-proportion="0.65"></div>
                        </div>
                    </div>
                    <div class="defects-right">
                        <div class="div1" v-proportion="0.6">
                        </div>
                        <div v-proportion="0.5">
                            <div class="div2">
                            </div>
                            <div class="div3">
                            </div>
                        </div>
                        <div v-proportion="0.5">
                            <div class="div4">
                            </div>
                            <div class="div5">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'demo-page-layout',
        components: {
        },
        data () {
            return {
            }
        },
        computed: {
        },
        created () {},
        mounted () {
        },
        methods: {
        }
    };
</script>
<style lang="less" scoped>
    .defects-lest {
        width: calc(~'22% - 16px');
        margin-right: 16px;
    }
    .defects-right {
        width: calc(~'22% - 16px');
        margin-left: 16px;
    }
    .defects-lest, .defects-right { // 左列图片
        height: 100%;
        float: left;
        /*background: lightgreen;*/
        .div1 {
            width: 100%;
            margin-bottom: 4px;
            background: lightgray;
        }
        .div2, .div3, .div4, .div5 {
            width: calc(~'50% - 2px');
            height: 100%;
            float: left;
        }
        .div2 { margin-right: 4px;background: lightgoldenrodyellow }
        .div3 { background: lightsalmon }
        .div4 { margin-right: 4px;background: lightslategrey }
        .div5 { background: lightcoral }
    }
    .defects-center { // 中间列图片
        width: 56%;
        height: 100%;
        float: left;
        .left, .right {
            width: 26%;
            height: 100%;
            float: left;
            .div1, .div2, .div3 {
                width: 100%;
                margin-bottom: 4px;
            }
            .div1 { background: lightsteelblue }
            .div2 { background: lightskyblue }
            .div3 { background: linen }
        }
        .center {
            width: calc(~'48% - 32px');
            margin: 0 16px;
            height: 100%;
            float: left;
            .div1, .div2, .div3 {
                width: 100%;
                margin-bottom: 4px
            }
            .div1 { background: linen }
            .div2 { background: lightcoral }
            .div3 { background: lightcyan }
        }
    }
</style>
