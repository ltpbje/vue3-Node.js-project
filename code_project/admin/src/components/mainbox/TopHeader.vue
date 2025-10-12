<template>
    <el-header>
        <!-- <button @click="handleCollapsed">click</button> -->
        <div class="left">
            <el-icon @click="handleCollapsed">
                <Menu />
            </el-icon>
            <span style="margin-left: 10px;">闪讯库数字化管理系统</span>
        </div>
        <div class="right">
            <span>欢迎 {{ store.state.userInfo.username }} 回来</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size="30" :color="'white'">
                        <User />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </el-header>
</template>

<script setup>
import router from '@/router';
import { Menu, User } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
const store = useStore();

const handleCollapsed = () => {
    store.commit('changeCollapsed');
};
// 跳转到个人中心
const handleCenter = () => {
    router.push('/center');
};

// 退出登录
const handleLogout = () => {
    localStorage.removeItem('token');
    store.commit('clearUserInfo');
    router.push('/login');
};
</script>



<style lang="scss" scoped>
.el-header {
    background-color: #409EFF;
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
}

.right,
.left {
    display: flex;
}

.left {
    i {
        margin: auto;
        cursor: pointer;
    }
}

.right {
    .el-dropdown {
        margin: auto;

        .el-dropdown-link {
            outline: none;
        }
    }
}
</style>