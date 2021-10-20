<template>
    <div class='home-calendar'>
        <!-- 年份 月份 -->
        <div class='home-month'>
            <ul>
                <li class="month-title">
                    <span class="icon iconfont iconrili1"></span>
                    <span class="title">日历</span>
                </li>
                <li class='year-month'>
                    <Tooltip content="重置">
                        <Icon type="md-refresh" class="arrow-icon" @click="resetDate" style="margin-right: 8px;margin-top: 4px"/>
                    </Tooltip>
                    <Icon type="ios-arrow-dropleft" class="arrow-icon" @click='pickPre(currentYear,currentMonth)'/>
                    <span class='choose-year'>
                        {{ currentYear }}-{{ currentMonth<10 ? '0'+currentMonth : currentMonth }}
                    </span>
                    <Icon type="ios-arrow-dropright" class="arrow-icon" @click='pickNext(currentYear,currentMonth)'/>
                </li>
            </ul>
        </div>
        <!-- 星期 -->
        <ul class='weekdays'>
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
        </ul>
        <!-- 日期 -->
        <ul class='home-days'>
            <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
            <li  v-for='(dayobject,i) in days' :key='i'>
                <!--本月-->
                <!--如果不是本月  改变类名加灰色-->
                <span v-if='dayobject.day.getMonth()+1 != currentMonth' class='other-month' @click="getDayTime(dayobject.day)">
                    {{ dayobject.day.getDate()<10 ? '0'+dayobject.day.getDate() : dayobject.day.getDate() }}
                </span>
                <!--如果是本月  还需要判断是不是这一天-->
                <span v-else>
                    <!--今天  同年同月同日-->
                    <span v-if='+dayobject.day == +selectDate' class='active' @click="getDayTime(dayobject.day)">
                        {{ dayobject.day.getDate()<10 ? '0'+dayobject.day.getDate() : dayobject.day.getDate() }}
                    </span>
                    <span v-else @click="getDayTime(dayobject.day)">
                        {{ dayobject.day.getDate()<10 ? '0'+dayobject.day.getDate() : dayobject.day.getDate() }}
                    </span>
                    <div class="home-circle" :style="daily(dayobject) ? 'background-color:#F7B90A;' : 'background-color:#fff;'">
                    </div>
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                days: [],
                selectDate: new Date(), // 当前日期
            }
        },
        computed: {
            daily () { // 判断是否存在日报
                return function(obj){
                    if (obj.day.getDate() == 15 || obj.day.getDate() == 16) {
                        return true
                    }
                }
            }
        },
        created () {
            // 在vue初始化时调用
            this.initData(null)
        },
        methods: {
            initData (cur) {
                // let leftcount = 0 // 存放剩余数量
                let date
                if (cur) {
                    date = new Date(cur)
                } else {
                    let now = new Date()
                    let d = new Date(this.formatDate(now.getFullYear(), now.getMonth() + 1, 1))
                    d.setDate(35)
                    date = new Date(this.formatDate(d.getFullYear(), d.getMonth(), 1))
                }
                this.currentDay = date.getDate()
                this.currentYear = date.getFullYear()
                this.currentMonth = date.getMonth() + 1
                this.currentWeek = date.getDay() // 1...6,0
                if (this.currentWeek === 0) {
                    this.currentWeek = 7
                }
                let str = this.formatDate(
                    this.currentYear,
                    this.currentMonth,
                    this.currentDay
                )
                this.days.length = 0
                // 今天是周日，放在第一行第7个位置，前面6个
                // 初始化本周
                for (let i = this.currentWeek; i >= 0; i--) {
                    let d2 = new Date(str)
                    d2.setDate(d2.getDate() - i)
                    let dayobjectSelf = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobjectSelf.day = d2
                    this.days.push(dayobjectSelf) // 将日期放入data 中的days数组 供页面渲染使用
                }
                // 其他周
                for (let j = 1; j <= 35 - this.currentWeek; j++) {
                    let d3 = new Date(str)
                    d3.setDate(d3.getDate() + j)
                    let dayobjectOther = {}
                    dayobjectOther.day = d3
                    this.days.push(dayobjectOther)
                }
            },
            getDayTime (el) {
                // 当前选中的日期 其他月份的日期不可以选中
                if (el.getMonth()+1 != this.currentMonth) return
                this.selectDate = el
            },
            pickPre (year, month) {
                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                let d = new Date(this.formatDate(year, month, 1))
                d.setDate(0)
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
            },
            pickNext (year, month) {
                let d = new Date(this.formatDate(year, month, 1))
                d.setDate(35)
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
            },
            // 返回 类似 2016-01-02 格式的字符串
            formatDate (year, month, day) {
                let y = year
                let m = month
                if (m < 10) m = '0' + m
                let d = day
                if (d < 10) d = '0' + d
                return y + '-' + m + '-' + d
            },
            // 重置当前时间
            resetDate () {
                let date = new Date()
                this.currentYear = date.getFullYear()
                this.currentMonth = date.getMonth() + 1
                // 重置年月
                let d = new Date(this.formatDate(this.currentYear, this.currentMonth, 1))
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
                // 重置当前日
                this.selectDate = new Date()
            }
        }
    }
</script>
<style lang="less" scoped>
    // 日历
    .home-calendar {
        font-size: 12px;
        width: 100%;
        margin: 0 auto;
        /*box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),*/
        /*0 1px 5px 0 rgba(0, 0, 0, 0.12);*/
    }
    .home-month {
        width: 100%;
        color: #333333;
        background: url('./rl.jpg');
        background-size:cover;
    }
    .month-title {
        margin-left: 18px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .month-title .title {
        font-size: 16px;
        font-weight: bold;
        margin-left: 8px
    }
    .home-month ul {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
        height: 60px;
    }
    .year-month {
        margin-right: 18px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .arrow-icon {
        cursor:pointer;
        font-size: 18px;
    }
    .arrow-icon:hover {
        color: #e1e1e1;
    }
    
    .home-month ul li {
        font-size: 16px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 3px;
    }
    .weekdays {
        margin: 0;
        font-size: 16px;
        padding: 18px 18px 0 10px;
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        color: #000;
        justify-content: space-around;
    }
    .weekdays li {
        display: inline-block;
        width: 13.6%;
        text-align: center;
    }
    .home-days {
        padding: 15px;
        background: #ffffff;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }
    .home-days li {
        list-style-type: none;
        display: inline-block;
        width: 14.2%;
        text-align: center;
        padding-bottom: 0;
        padding-top: 10px;
        font-size: 14px;
        color: #000;
    }
    .home-days li .active {
        padding: 8px;
        cursor:pointer;
        border-radius: 50%;
        background: #2E76EE;
        color: #fff;
    }
    .home-days li .other-month {
        padding: 5px;
        color: #cdcdcd;
    }
    .home-days li:hover>span>span:not(.active) {
        padding: 8px;
        cursor:pointer;
        border-radius: 50%;
        background: #e1e1e1;
        color: #fff;
    }
    /*实心圆*/
    .home-circle {
        width:4px;
        height:4px;
        margin: 0 auto;
        margin-top: 8px;
        background-color:#F7B90A;
        border-radius:50px; /* 图形的半径 */
    }
    // 生产日报
    .home-daily {
        width: 100%;
        height: 432px;
    }
    .home-daily-title {
        padding: 18px 0 36px 18px;
        color: #fff;
        .iconshengchanribao {
            font-size: 18px;
            color: #2E76EE;
        }
        .title {
            font-weight: bold;
            margin-left: 8px;
            font-size: 16px;
            color: #000;
        }
    }
    .home-daily-row {
        width: calc(~'100% - 26px');
        margin: 0 auto;
        /*border: 1px solid red;*/
    }
    .home-daily-col {
        height: 140px;
        .daily-div {
            height: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-around;
            /deep/ .ivu-card-body {
                text-align: center;
            }
            .iconfont { // 图标
                font-size: 20px;
                color: #F7B90A;
            }
            .text { // 文字
                height: 32px;
                font-size: 16px;
                margin-top: 6px;
                font-weight: bold;
            }
            .count { // 数字
                font-size: 30px;
                color: #000;
                font-weight: bold;
            }
        }
    }
    .home-daily-bottom {
        margin-top: 20px;
    }
</style>
