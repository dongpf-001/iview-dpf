<template>
    <div class="content-inner">
        <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <bingo-quill v-model="value" :row="3" :border="true" :height="200"/>
                </div>
                <div slot="right" class="demo-split-pane">
                    <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <p style="margin-top: 12px">1、需要构造树形结构数据，isRender默认是false，代表组件内部给渲染节点，显示数据中label和name字段</p>
                </div>
            </Split>
        </Card>
    </div>
</template>

<script>

    export default {
        name: 'bmsa-divide-demo',
        components: {
        },
        data () {
            return {
                split1: 0.7,
                value: 'bingo-quill富文本编辑器',
            }
        },
        created() {
        },
        mounted() {

        },
        computed: {},
        watch: {},
        methods: {
        }
    };
</script>
<style>

</style>
