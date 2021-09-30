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
                    <p style="margin-top: 12px">1、readonly控制只读</p>
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
