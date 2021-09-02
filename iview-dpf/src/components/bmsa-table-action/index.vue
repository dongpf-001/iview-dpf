<template>
    <div class="bmsa-table-action">
        <Button type="primary" size="small" @click="handleEditMenu">
            <i class="icon iconfont iconbianji" />
            <span>{{$t('page.common.edit')}}</span>
        </Button>
        <Button type="error" size="small" @click="handleDeleteBtn">
            <i class="icon iconfont iconshanchu" />
            <span>{{$t('page.common.delete')}}</span>
        </Button>
        <Dropdown transfer-class-name="bmsa-table-dropdown" trigger="click" transfer>
            <Button size="small" class="bmsa-table-dropdown-btn" type="default">{{ $t('page.common.more') }}<Icon type="md-arrow-dropdown" /></Button>
            <Dropdown-menu slot="list">
                <Button size="small">
                    <Icon type="ios-lock-outline" />
                    <span class="font">{{$t('system.page.common.PasswordReset')}}</span>
                </Button>
            </Dropdown-menu>
            <Dropdown-menu slot="list">
                <Button size="small">
                    <i class="icon iconfont iconqunzuguanli" />
                    <span class="font">{{$t('system.page.common.AssignmentGroup')}}</span>
                </Button>
            </Dropdown-menu>
            <Dropdown-menu slot="list">
                <Button size="small">
                    <i class="icon iconfont iconjiaoseguanli" />
                    <span class="font">{{$t('system.page.common.AssignRoles')}}</span>
                </Button>
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
