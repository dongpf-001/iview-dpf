<template>
    <div class="content-inner">
        <Card>
            <Button @click="onClick">添加播报</Button>
            <aplayer ref="player" :audio="songList" autoplay fixed @ended="handleEvent"/>
            <br>{{this.songList.length}}<br>{{this.songList}}
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'demo-audio',
        components: {
        },
        data () {
            return {
                aplayer: {}, // 播放器实体
                songList: [], // 播放列表
                audioObj: {},
                flag: false, // 是否加载播放组件
            }
        },
        watch: {
            songList:{
                handler(now, old){
                    if (now && now.length) {
                        setTimeout(() => {
                            this.aplayer.play();
                        }, 200);
                    } else {
                        this.aplayer.pause();
                    }
                },
                deep:true
            },
        },
        computed: {
        },
        created () {},
        mounted () {
            this.aplayer = this.$refs.player;
        },
        methods: {
            handleEvent () {
                this.aplayer.pause();
                this.songList.splice(0, 1)
                this.$BMessage.success('播放结束' + this.songList.length)
            },
            onClick () {
                this.songList.push({
                    url: 'http://10.131.248.30:9000/bmsa-file/094a75e578fa49038a03bcf1ce1e9cfa.mp3',
                    name: '接口',
                    artist: 'Silent Siren',
                    cover: '', // prettier-ignore
                    lrc: '',
                })
            }
        }
    };
</script>
<style lang="less" scoped>
    .left {
        width: 48%;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px;
        float: left;
    }
    .right {
        width: 48%;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px;
        float: right;
    }
    .drop-box1 {
        height: calc(~"100% - 38px");
    }
    .item-row {
        border-top: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        text-align: center;
        .ivu-col {
            padding: 8px 4px;
            border-left: 1px solid #ccc;
        }
    }
    .dragClass {
        border: 1px solid #ebf7ff;
    }
</style>
