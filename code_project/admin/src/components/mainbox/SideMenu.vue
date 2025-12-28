<template>
     <el-aside :width="$store.state.isCollapsed ? '64px' : '220px'">
          <el-menu :collapse="$store.state.isCollapsed" :router="true" :default-active="route.fullPath">
               <el-menu-item index="/index">
                    <el-icon>
                         <HomeFilled />
                    </el-icon>
                    <span>首页</span>
               </el-menu-item>
               <el-menu-item index="/center">
                    <el-icon>
                         <Avatar />
                    </el-icon>
                    <span>个人中心</span>
               </el-menu-item>

               <el-sub-menu index="/user-manage" v-admin>
                    <template #title>
                         <el-icon>
                              <UserFilled />
                         </el-icon>
                         <span>用户管理</span>
                    </template>

                    <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
                    <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>

               </el-sub-menu>
               <el-sub-menu index="/news-manage">
                    <template #title>
                         <el-icon>
                              <MessageBox />
                         </el-icon>
                         <span>新闻管理</span>
                    </template>

                    <el-menu-item index="/news-manage/newsadd">创建新闻</el-menu-item>
                    <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>

               </el-sub-menu>
               <el-sub-menu index="/product-manage">
                    <template #title>
                         <el-icon>
                              <Reading />
                         </el-icon>
                         <span>产品管理</span>
                    </template>

                    <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
                    <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>

               </el-sub-menu>

          </el-menu>
     </el-aside>
</template>

<script setup>
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
// 当前路由信息
const route = useRoute();
const store = useStore();
const vAdmin = {
     mounted(el) {
          // console.log(el)
          if (store.state.userInfo.role !== 1) {
               el.remove();
          }
     },
};
</script>
<style lang="scss" scoped>
.el-aside {
     height: 100vh;
     transition: width 700ms;
     background: #fafafa;
     border-right: 1px solid #ebeef5;

     .el-menu {
          height: 100%;
          border-right: none;
          background: transparent;
     }
}

::v-deep .el-menu-item {
     height: 64px;
     line-height: 64px;
     margin: 2px 12px;
     border-radius: 6px;
     color: #606266;
     display: flex;
     align-items: center;

     .el-icon {
          margin-right: 8px;
          font-size: 20px;
     }

     &:hover {
          background-color: #ecf5ff;
          color: #409eff;
     }

     &.is-active {
          background-color: #ecf5ff;
          color: #409eff;
          font-weight: 500;
     }
}

::v-deep .el-sub-menu {
     .el-sub-menu__title {
          height: 64px;
          line-height: 64px;
          margin: 2px 12px;
          border-radius: 6px;
          color: #606266;
          display: flex;
          align-items: center;

          .el-icon {
               margin-right: 8px;
               font-size: 20px;
          }

          .el-sub-menu__icon-arrow {
               font-size: 14px;
               color: #909399;
          }

          &:hover {
               background-color: #ecf5ff;
               color: #409eff;
          }
     }

     &.is-active>.el-sub-menu__title {
          color: #409eff;
          font-weight: 500;
     }
}

::v-deep .el-sub-menu .el-menu-item {
     height: 58px;
     line-height: 58px;
     margin-left: 24px;
     margin-right: 12px;
     margin-top: 2px;
     margin-bottom: 2px;
     border-radius: 6px;
     font-size: 14px;

     &:hover {
          background-color: #ecf5ff;
          color: #409eff;
     }

     &.is-active {
          background-color: #ecf5ff;
          color: #409eff;
     }
}

::v-deep .el-menu--collapse {
     .el-menu-item {
          margin: 2px 0;
          padding: 0 !important;
          justify-content: center;

          .el-icon {
               margin-right: 0;
          }

          span {
               display: none;
          }
     }

     .el-sub-menu__title {
          margin: 2px 0;
          padding: 0 !important;
          justify-content: center;

          .el-icon {
               margin-right: 0;
          }

          .el-sub-menu__icon-arrow {
               display: none;
          }

          span {
               display: none;
          }
     }
}
</style>