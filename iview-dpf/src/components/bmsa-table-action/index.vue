<template>
    <div class="bmsa-table-action">
        <slot name="list-button"></slot>
        <Button type="primary" size="small" @click="handleEditMenu" v-if="showEdit && !row.hideEdit">
            <i class="icon iconfont iconbianji" />
            <span>{{$t('page.common.edit')}}</span>
        </Button>
        <Button type="error" size="small" @click="handleDeleteBtn" v-if="showDelete && !row.hideDelete">
            <i class="icon iconfont iconshanchu" />
            <span>{{$t('page.common.delete')}}</span>
        </Button>
        <Dropdown transfer-class-name="bmsa-table-dropdown" trigger="click" transfer  v-if="showMore && !row.hideMore">
            <Button size="small" class="bmsa-table-dropdown-btn" type="default">{{ $t('page.common.more') }}<Icon type="md-arrow-dropdown" /></Button>
            <Dropdown-menu slot="list">
                <slot name="drop-button"></slot>
            </Dropdown-menu>
        </Dropdown>
    </div>
</template>
<script>
    export default {
        name: 'bmsa-table-action',
        components: {},
        data () {
            return {
            }
        },
        props: {
            showEdit: { // 是否隐藏编辑
                type: Boolean,
                default: true
            },
            showDelete: { // 是否隐藏新建
                type: Boolean,
                default: true
            },
            showMore: { // 是否隐藏更多操作
                type: Boolean,
                default: false
            },
            row: { // 某条数据
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        computed: {
        },
        methods: {
            // 编辑按钮
            handleEditMenu () {
                this.$emit('on-edit', this.row)
            },
            // 删除按钮
            handleDeleteBtn () {
                this.$emit('on-delete', this.row)
            }
        },
        created () {},
        mounted () {},
    };
</script>
<style lang="less" scoped>
</style>
