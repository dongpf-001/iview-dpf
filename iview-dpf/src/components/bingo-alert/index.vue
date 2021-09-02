<template>
  <div>
    <bingo-modal ref="alert" v-model="show" width="460" onlyBody v-if="type=='info'">
      <div class="bingo-alert-content">
        <div class="bingo-alert-icon bingo-alert-warning">?</div>
        <div class="bingo-alert-title">{{title}}</div>
        <div class="bingo-alert-content">{{content}}</div>
      </div>
      <div slot="footer" class="bingo-alert-button">
        <button type="button" class="cannel ivu-btn ivu-btn-default ivu-btn-long" @click="onCanel">
          <span>{{canelName}}</span>
        </button>
        <button type="button" class="ivu-btn ivu-btn-warning" @click="onOk">
          <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="loading"></i>
          <span>
                        <span>（<span>{{duration}}</span>s后）</span>{{okName}}
                    </span>
        </button>
      </div>
    </bingo-modal>
    <bingo-modal ref="alert" v-model="show" width="460" onlyBody v-if="type=='error'" footer-hide>
      <div class="ivu-result">
        <div class="ivu-result-icon ivu-result-icon-error"><!---->
          <i class="ivu-icon ivu-icon-ios-close"></i>
        </div>
        <div class="ivu-result-title">{{title}}</div>
        <div class="ivu-result-desc">
          <div>{{content}}</div>
        </div>
        <div class="ivu-result-extra" v-if="showBody">
          <div style="font-size: 14px;">
            <div>{{bodyTitle}}</div>
            <div v-for="(item, key) in bodyList" :key="key">
              <i class="ivu-icon ivu-icon-ios-close-circle-outline" style="color: rgb(237, 64, 20);"></i>
              {{item}}
            </div>
          </div>
        </div> <!---->
      </div>
    </bingo-modal>
  </div>
</template>
<script>
    import bingoModal from '@/components/bingo-modal';
    export default {
        name: 'bing-alert',
        props: {
        },
        data () {
            return {
                title:'',
                type: '',
                content:'',
                duration: 3, // 倒计时
                loading: false,
                show: false, // 是否显示弹窗
                hideTime: false, //显示计数器
                showBody: true,
                bodyTitle: '',
                bodyList: [],
                canelName: '取消',
                okName: '确定',
                buttonName: ['取消', '确定'],
                timer: null
            }
        },
        computed: {
            targetTime () {
                return new Date().getTime() + this.duration*1000
            }
        },
        watch: {
            show (value) {
                if (value) {
                    this.timer = setInterval(() => { // 从后台开始获取进度
                        if (this.duration == 0) {
                            console.log('触发了关闭事件')
                            this.handleEnd()
                        } else {
                            this.duration -= 1
                        }
                    }, 1000);
                } else {
                    clearInterval(this.timer);
                }
            }
        },
        components: {
            bingoModal
        },
        created () {
            if (this.buttonName.length > 0) {
                this.canelName = this.buttonName[0]
                this.okName = this.buttonName[1]
            }
        },
        mounted () {
        },
        methods: {
            format(time){
                let ss = Math.floor(time/1000%60)
                return ss
            },
            handleEnd(){
                this.onOk();
            },
            onCanel(){
                this.show = false
            },
            onOk(){ // ok事件
                this.isShowCount = false
                this.loading = true
                this.$parent.ok()
            }
        }
    }
</script>
<style lang="less">
  .ivu-result {
    width: 100%;
  }
  .ivu-result-extra {
    padding: 16px 30px!important;
    max-height: 140px!important;
    overflow: auto!important;
  }
</style>
