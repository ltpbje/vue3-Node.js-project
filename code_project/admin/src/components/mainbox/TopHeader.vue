<template>
    <el-header>
        <!-- <button @click="handleCollapsed">click</button> -->
        <div class="left">
            <el-icon @click="handleCollapsed">
                <Menu />
            </el-icon>
            <span style="margin-left: 10px;">品讯数字化管理系统</span>
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 2px 12px rgba(102, 126, 234, 0.4);
}

.right,
.left {
    display: flex;
    align-items: center;
}

.left {
    i {
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
    }

    span {
        font-weight: 600;
        font-size: 16px;
        letter-spacing: 1px;
    }
}

.right {
    span {
        margin-right: 15px;
        font-size: 14px;
        opacity: 0.95;
    }

    .el-dropdown {
        .el-dropdown-link {
            outline: none;
            cursor: pointer;
            padding: 6px;
            border-radius: 50%;
            transition: all 0.3s ease;

            &:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        }
    }
}

.el-dropdown-menu__item {
    &:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
}
</style>