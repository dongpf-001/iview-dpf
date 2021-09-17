<template>
    <div class="my-bill">
        <div class="auchor-title">
            <Anchor ref="anchorLink" @on-select="handleSelect" show-ink :affix="false" container=".auchor-body">
                <AnchorLink href="#demo1" title="demo1"/>
                <AnchorLink href="#demo2" title="demo2"/>
                <AnchorLink href="#demo3" title="demo3"/>
                <AnchorLink href="#demo4" title="demo4"/>
            </Anchor>
        </div>
        <div class="auchor-body">
            <div id="demo1">
                <bingo-shrink-card height="400">
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
                <bingo-shrink-card height="400">
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
                <bingo-shrink-card height="400">
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
            <div id="demo4">
                <bingo-shrink-card height="400">
                    <span slot="icon">
                        <Icon type="md-close"/>
                    </span>
                    <div style="height: 100%">
                        ------------fore
                        <Card class="ivu-mb-8" style="height: calc(100% - 25px)">
                            模块4
                        </Card>
                    </div>
                </bingo-shrink-card>
            </div>
        </div>
    </div>
</template>
<script>
    import Anchor from '@/components/anchor/anchor.vue';
    import AnchorLink from '@/components/anchor/anchor-link.vue';
    export default {
        name: 'demo-auchor-bill',
        components: {
            Anchor, AnchorLink
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
            handleSelect (href) {
                this.$nextTick(() => {
                    this.$refs.anchorLink.currentLink = href
                })
            }
        }
    };
</script>
<style lang="less" scoped>
    .my-bill {
        height: 100%;
        overflow: hidden;
    }
    .auchor-body {
        width: 80%;
        height: 100%;
        overflow: auto;
        float: left;
    }
    .auchor-title {
        float: right;
        margin-right: 30px;
    }
</style>
