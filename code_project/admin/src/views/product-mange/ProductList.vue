<template>
    <div>
        <el-page-header icon="" title="产品管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 产品列表 </span>
            </template>
        </el-page-header>


        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="title" label="产品名称" />
            <el-table-column prop="introduction" label="简要描述" />
            <el-table-column prop="editTime" label="更新时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.editTime) }}
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template #default="scope">
                    <el-button :icon="Edit" circle size="small" @click="handleEdit(scope.row)"></el-button>

                    <el-popconfirm title="你确定要删除吗?" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button :icon="Delete" circle type="danger" size="small"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-config-provider :locale="zhCn">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 50]"
                :background="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                style="margin-top: 20px; justify-content: center"
            />
        </el-config-provider>


    </div>
</template>

<script setup>

import axios from 'axios'
import { ref, onMounted } from 'vue'
import formatTime from '@/util/formatTime'
import { View, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import router from '@/router';
import store from '@/store';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 格式化时间方法
const tableData = ref([])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 预览数据
const previewData = ref({})
// 预览弹窗的显示与隐藏
const dialogVisible = ref(false)
onMounted(() => {
    getTableData()
})
// 获取表格数据
const getTableData = async () => {
    const res = await axios.get(`/adminapi/product/list/?username=${store.state.userInfo.username}`, {
        params: {
            currentPage: currentPage.value,
            pageSize: pageSize.value
        }
    })
    // console.log(res.data)
    tableData.value = res.data.data
    total.value = res.data.total || res.data.data.length
}


// 删除回调
const handleDelete = async (item) => {
    // console.log(item)
    await axios.delete(`/adminapi/product/list/${item._id}`)
    // 删除后如果当前页没有数据且不是第一页，则返回上一页
    if (tableData.value.length === 1 && currentPage.value > 1) {
        currentPage.value--
    }
    await getTableData()
}


// 编辑新闻回调

const handleEdit = async (item) => {
    router.push(`/product-manage/editproduct/${item._id}`)
}

// 每页显示数量变化
const handleSizeChange = (val) => {
    pageSize.value = val
    currentPage.value = 1
    getTableData()
}

// 当前页码变化
const handleCurrentChange = (val) => {
    currentPage.value = val
    getTableData()
}

</script>



<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}

::v-deep .htmlcontent img {
    max-width: 100%;
}
</style>