<template>
    <div ref="partsImg" class="all-layout" :style="backStyle">
        <canvas ref="myCanvas"
                v-if="backUrl && backUrl != ''"
                class="part-canvas">
        </canvas>
        <Upload v-else
                ref="upload"
                v-on="$listeners"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :headers="{
                    'access-token': token,
                    'model': 'module258',
                    'prod': 'prod_002'
                }"
                :max-size="2048"
                :multiple="false"
                type="drag"
                :action="actionUrl"
                class="upload-canvas">
            <div class="upload-canvas-img">
                <span class="icon iconfont iconfabu"></span>
            </div>
        </Upload>
    </div>
</template>

<script>
    import util from '@/libs/util';
    export default {
        name: 'shift-type',
        components: {
        },
        data () {
            return {
                cellHeight: 0, // canvas网格高度
                cellWidth: 0, // 网格宽度
                token: ''
            };
        },
        props: {
            isPoint: { // 是否显示网格
                type: Boolean,
                default: true
            },
            isClick: { // 是否有点击事件
                type: Boolean,
                default: true
            },
            backUrl: { // 背景图片，没有的话默认显示上传
                type: String,
                default: ''
            },
            actionUrl: { // 上传API
                type: String,
                default: ''
            },
            model: { // 当前零件数据
                type: Object,
                default: () => {
                    return {}
                }
            },
            gridX: { // 网格横向个数
                type: Number,
                default: 5
            },
            gridY: { // 网格纵向个数
                type: [Number, String],
                default: 4
            },
            checkIndex: { // 是否选择中某个网格
                type: Object,
                default: () => {
                    return {}
                }
            },
            defects: { // 对应缺陷的位置， 用于涂色
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        computed: {
            backStyle () { // 背景图片
                // let style = 'background:url(' + this.backUrl + ')no-repeat'
                let style = {
                    background: 'url(' + this.backUrl + ')0% 0% / 100% 100% no-repeat',
                    // 'background-size': '100% 100%'
                }
                return style
            }
        },
        watch: {
            backUrl (value) {
                this.$nextTick(() => {
                    if (value && value != '') {
                        this.init()
                    }
                })
            },
            gridX: { // 横向网格发生变化
                handler (val) {
                    if (this.$refs.myCanvas) {
                        let myCanvas = this.$refs.myCanvas
                        let ctx = myCanvas.getContext('2d')
                        // 清空
                        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
                        this.init()
                    }
                },
                immediate: true
            },
            gridY: { // 纵向网格发生变化
                handler (val) {
                    if (this.$refs.myCanvas) {
                        let myCanvas = this.$refs.myCanvas
                        let ctx = myCanvas.getContext('2d')
                        // 清空
                        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
                        this.init()
                    }
                },
                immediate: true
            },
            checkIndex: { // 网格选中的位置发生变化
                handler (val) {
                    if ((val.x || val.x == 0) && (val.y || val.y == 0)) {
                        let myCanvas = this.$refs.myCanvas
                        let ctx = myCanvas.getContext('2d')
                        this.pointRender(myCanvas, ctx, val) // 绘画选中
                    } else {
                        if (this.$refs.myCanvas) {
                            let myCanvas = this.$refs.myCanvas
                            let ctx = myCanvas.getContext('2d')
                            // 清空
                            const clearHeight = myCanvas.height
                            myCanvas.height = clearHeight
                            this.pointWang(myCanvas, ctx)
                        }
                    }
                },
                immediate: true
            }
        },
        created () {
            this.token = util.cookies.get('token');
            this.$nextTick(() => {
                this.$refs.partsImg.style.height = this.$refs.partsImg.offsetWidth*0.8 + 'px'
                window.addEventListener(
                    'resize',
                    () => {
                        this.$refs.partsImg.style.height = this.$refs.partsImg.offsetWidth*0.8 + 'px'
                    }
                );
            })
        },
        mounted () {
            if (this.backUrl && this.backUrl != '') {
                // 初始化
                this.$nextTick(() => {
                    this.init()
                })
            }
        },
        methods: {
            // 初始化网格
            init () {
                // 获取Canvas 画图
                let myCanvas = this.$refs.myCanvas
                let ctx = myCanvas.getContext('2d')
                if (this.isPoint) { // 判断是否需要边框
                    this.pointWang(myCanvas, ctx)
                }
                // 初始化事件
                this.initClick(myCanvas, ctx)
            },
            // 初始化事件
            initClick (myCanvas, ctx) {
                let self = this
                if (this.isPoint) { // 判断是否需要边框
                    let height = myCanvas.scrollHeight / this.gridY // 实际网格高度
                    let width = myCanvas.scrollWidth / this.gridX
                    myCanvas.addEventListener('click', function(e){
                        let p = self.getEventPosition(e);
                        let index = { // 坐标整数
                            x: Math.floor(p.x/width),
                            y: Math.floor(p.y/height)
                        }
                        // self.pointRect(ctx, index) // 绘制矩形
                        if (self.isClick) {
                            self.$emit('on-part-click', index, self.model) // 图片点击事件，参数坐标
                            // self.pointRender(this, ctx, index) // 绘制矩形边框
                        }
                    }, false);
                }
            },
            // 绘画网格
            pointWang (myCanvas, ctx) {
                // 描绘边框
                let gridX = this.gridX;
                let gridY = this.gridY;
                this.cellHeight = myCanvas.height/gridY; // canvas网格高度
                this.cellWidth = myCanvas.width/gridX; // 网格宽度
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#ccc';
                // 准备画横线
                for (var col=0;col<=gridX;col++) {
                    var x = col * this.cellWidth;
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, myCanvas.height);
                }
                //准备画竖线
                for (var row=0;row<=gridY;row++) {
                    var y = row * this.cellHeight;
                    ctx.moveTo(0, y);
                    ctx.lineTo(myCanvas.width, y);
                }
                // 完成描绘
                ctx.stroke();

                // 绘画完网格涂颜色
                // 对缺陷进行排序，后渲染未维修的缺陷
                this.defects = this.defects ? this.sortKey(this.defects, 'isRepair') : []
                this.defects.forEach(item => {
                    let index = {
                        x: parseInt(item.imgPositionX),
                        y: parseInt(item.imgPositionY)
                    }
                    this.pointRect(ctx, index, item) // 绘画选中
                })
            },
            // 绘制矩形虚线边框
            pointRender (myCanvas, ctx, index) {
                // 清空
                const clearHeight = myCanvas.height
                myCanvas.height = clearHeight
                // 重新绘制网格
                this.pointWang(myCanvas, ctx)
                // 绘制许县举行
                let height = this.cellHeight
                let width = this.cellWidth
                // 开始绘制
                ctx.beginPath();
                // 填充矩形颜色
                // ctx.setLineDash([2, 2]);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#2e76ee';
                ctx.beginPath();
                ctx.moveTo(index.x*width, index.y*height); // 起点
                ctx.lineTo((index.x+1)*width, index.y*height); // 第一条线
                ctx.lineTo((index.x+1)*width, (index.y+1)*height); // 第二条线
                ctx.lineTo(index.x*width, (index.y+1)*height); // 第三条线
                ctx.closePath(); // 结束路径，自动闭合
                // 结束绘制
                ctx.stroke();
            },
            // 绘制矩形颜色
            pointRect (ctx, index, item) {
                // 清空矩形对应位置的颜色
                ctx.clearRect(index.x*this.cellWidth, index.y*this.cellHeight, this.cellWidth, this.cellHeight)
                // 开始绘制
                ctx.beginPath();
                // 填充矩形颜色
                ctx.rect(index.x*this.cellWidth, index.y*this.cellHeight, this.cellWidth, this.cellHeight);
                if (item.isRepair) {
                    ctx.fillStyle = 'green'; // 颜色
                } else {
                    ctx.fillStyle = 'rgb(254, 84, 97)'; // 颜色
                }
                ctx.globalAlpha = 0.6; // 透明度
                ctx.fill(); // 绘制
                // 文字 通过坐标计算序号
                ctx.font = '20px "微软雅黑"';
                if (this.gridX > 7 || this.gridY > 7) {
                    ctx.font = '16px "微软雅黑"';
                } else if (this.gridX > 8 || this.gridY > 8) {
                    ctx.font = '14px "微软雅黑"';
                } else if (this.gridX > 9 || this.gridY > 9) {
                    ctx.font = '12px "微软雅黑"';
                } else if (this.gridX > 10 || this.gridY > 10) {
                    ctx.font = '6px "微软雅黑"';
                }
                ctx.fillStyle = '#cfd0d8';
                ctx.textBaseline = 'top';
                ctx.fillText(item.numberPosition, index.x*this.cellWidth + 5, index.y*this.cellHeight + 5);
                // 结束绘制
                ctx.stroke();
            },
            // 获取坐标
            getEventPosition (ev) {
                var x, y;
                if (ev.layerX || ev.layerX == 0) {
                    x = ev.layerX;
                    y = ev.layerY;
                } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                    x = ev.offsetX;
                    y = ev.offsetY;
                }
                return {x: x, y: y};
            },
            // 上传成功
            handleSuccess (response, file) {
                this.$emit('on-success', response.data, file)
            },
            // 对缺陷进行排序，后渲染未维修的缺陷
            sortKey(array, key){
                return array.sort(function(a, b){
                    var x = a[key];
                    var y = b[key];
                    return ((x>y)?-1:(x<y)?1:0)
                })
            },
        }
    };
</script>

<style lang="less" scoped>
    .all-layout {
        width: 100%;
        cursor:pointer
    }
    .part-canvas { // canvas显示图片区域
        border:1px solid #c3c3c3;
        width: 100%;
        height: 100%
    }
    .upload-canvas { // 上传图片区域
        display: inline-block;
        width:100%;
        height: 100%;
        .upload-canvas-img {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height:100%;
            p {
                margin-top: 10px;
                font-size: 14px;
            }
        }
    }
    /deep/ .ivu-upload {
        height: 100%;
        width: 100%;
    }
    .iconfabu {
        font-size: 30px;
        color: #2e76ee;
    }
</style>
