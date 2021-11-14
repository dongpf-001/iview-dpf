<template>
    <div class="content-inner">
        <Card>
           <p>当前时间</p>
            {{getBeforeDate(this.selfDate)}}
        </Card>
    </div>
</template>
<script>
    import * as workerInterval from 'worker-interval';
    import { setTimeout } from 'timers'
    import Worker from './worker.js'
    export default {
        name: 'demo-chorm',
        components: {
        },
        data () {
            return {
                worker: null,
                selfDate: 0, // 时间戳
            }
        },
        watch: {
        },
        computed: {
        },
        created () {},
        mounted () {
            const intervalId = workerInterval.setInterval(() => {
                this.selfDate = new Date().valueOf()
                console.log(this.getBeforeDate(this.selfDate))
            }, 1000);
            // this.worker = this.$worker.run(() => {}).then(res => {
            //     self.timer(self.consoleLog, 1000)
            // })
        },
        methods: {
            consoleLog () {
                this.selfDate = new Date().valueOf()
                console.log(this.getBeforeDate(this.selfDate))
                return this.getBeforeDate(this.selfDate)
            },
            getBeforeDate (date) {
                let myDate = date ? new Date(date) : new Date();
                const year = myDate.getFullYear(); // 获取当前年份
                const month = (myDate.getMonth() + 1) >= 10 ? (myDate.getMonth() + 1) : '0' + (myDate.getMonth() + 1); // 获取当前月份(0-11,0代表1月所以要加1);
                const day = myDate.getDate() >= 10 ? myDate.getDate() : '0' + myDate.getDate(); // 获取当前日（1-31）
                const h = myDate.getHours() >= 10 ? myDate.getHours() : '0' + myDate.getHours(); // 获取当前日（1-31）
                const m = myDate.getMinutes() >= 10 ? myDate.getMinutes() : '0' + myDate.getMinutes(); // 获取当前日（1-31）
                const s = myDate.getSeconds() >= 10 ? myDate.getSeconds() : '0' + myDate.getSeconds(); // 获取当前日（1-31）
                // 日期格式：2019/07/29 - 2019/07/29
                const d = `${year}-${month}-${day} ${h}:${m}:${s}`;
                return d;
            },
            // 定时器，用setTimeout取代setInterval
            timer (fn, delay) {
                let self = this
                setTimeout(function(){
                    fn();
                    self.timer(fn, delay);
                }, delay)
            },
        }
    };
</script>
<style lang="less" scoped>
</style>
