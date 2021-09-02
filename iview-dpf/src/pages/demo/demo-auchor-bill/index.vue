<template>
    <div class="my-bill">
        <div class="auchor-title">
            <Anchor show-ink :affix="false">
                <AnchorLink href="#demo1" title="demo1" />
                <AnchorLink href="#demo2" title="demo2" />
                <AnchorLink href="#demo3" title="demo3" />
            </Anchor>
        </div>
        <div class="auchor-body">
            <div id="demo1">
                <bingo-shrink-card height="300">
                    <span slot="icon">
                        <Icon type="md-close"/>
                    </span>
                    <div style="height: 100%">
                        ------------one
                        <Card class="ivu-mb-8" style="height: calc(100% - 25px)">
                            模块1
                        </Card>
                    </div>
                </bingo-shrink-card>
            </div>
            <div id="demo2">
                <bingo-shrink-card height="300">
                    <span slot="icon">
                        <Icon type="md-close"/>
                    </span>
                    <div style="height: 100%">
                        ------------two
                        <Card class="ivu-mb-8" style="height: calc(100% - 25px)">
                            模块2
                        </Card>
                    </div>
                </bingo-shrink-card>
            </div>
            <div id="demo3">
                <bingo-shrink-card height="300">
                    <span slot="icon">
                        <Icon type="md-close"/>
                    </span>
                    <div style="height: 100%">
                        ------------three
                        <Card class="ivu-mb-8" style="height: calc(100% - 25px)">
                            模块3
                        </Card>
                    </div>
                </bingo-shrink-card>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'demo-auchor-bill',
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
    .my-bill {
        position: relative;
        overflow-y: scroll;
    }
    .auchor-body {
        width: 80%;
        float: left;
    }
    .auchor-title {
        float: right;
        margin-right: 30px;
    }
</style>
