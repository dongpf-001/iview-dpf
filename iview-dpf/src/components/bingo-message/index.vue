<template>
  <transition name="slide">
    <div class="message-wrap" v-if="visible && type=='success'">
      <div class="content" :class="type">
        <i class="ivu-icon ivu-icon-ios-checkmark-circle content-success"></i>
        {{content}}
      </div>
    </div>

    <div class="message-wrap" v-if="visible && type=='warning'">
      <div class="content" :class="type">
        <i class="ivu-icon ivu-icon-ios-information-circle content-warning"></i>
        {{content}}
        <i class="ivu-icon ivu-icon-ios-close content-close" style="font-size: 22px" @click="close"></i>
      </div>
    </div>
  </transition>
</template>
<script>
    export default {
        name: 'bing-message',
        props: {
        },
        data () {
            return {
                type: '',
                visible: false,
                content: '',
                duration: 3000
            }
        },
        watch: {
            visible (value) {
                if (value) {
                    setTimeout(() => {
                        this.visible = false
                    }, this.duration);
                }
            }
        },
        components: {
        },
        created () {
        },
        mounted () {
        },
        computed: {
        },
        methods: {
            close () {
                this.visible = false
            }
        }
    }
</script>
<style lang="less">
</style>
