<template>
    <div>
        <el-card>
            <el-page-header icon="" title="用户管理">
                <template #content>
                    <span class="text-large font-600 mr-3">用户列表</span>
                </template>
            </el-page-header>

            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="username" label="用户名" />
                <el-table-column label="头像">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50"
                                src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'></el-avatar>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role === 1" type="danger">管理员</el-tag>
                        <el-tag v-else type="success">编辑</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>

                        <el-popconfirm title="你确定要删除吗?" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                </el-button>
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
        </el-card>

        <!-- 编辑对话框 -->
        <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
            <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules"
                label-width="auto" class="demo-ruleForm" status-icon>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="密码（不修改请留空）" prop="password">
                    <el-input v-model="userForm.password" type="password" placeholder="不修改密码请留空" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="userForm.role" placeholder="Select" style="width: 100%">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介" prop="introduction">
                    <el-input v-model="userForm.introduction" type="textarea" />
                </el-form-item>

            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue'
import CryptoJS from 'crypto-js';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// MD5 加密函数
const md5Encrypt = (password) => {
    return CryptoJS.MD5(password).toString();
};

const tableData = ref([])
const dialogVisible = ref(false)
const userFormRef = ref()

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const userForm = reactive({
    _id: '',
    username: '',
    password: '',
    role: 2,//1.管理员 2.编辑
    introduction: '',
})

// 编辑时的验证规则（密码不是必填）
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
})

// 角色选项
const options = [
    {
        label: '管理员',
        value: 1
    },
    {
        label: '编辑',
        value: 2
    }
]

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get('/adminapi/user/list', {
        params: {
            currentPage: currentPage.value,
            pageSize: pageSize.value
        }
    })
    // console.log(res.data)
    tableData.value = res.data.data
    total.value = res.data.total || res.data.data.length
}

// 编辑回调
const handleEdit = async (data) => {
    // console.log(data)
    // 获取包含密码的用户信息
    const res = await axios.get(`/adminapi/user/list/${data._id}`)
    // console.log(res.data.data)
    Object.assign(userForm, res.data.data[0])
    // 清空密码字段，避免显示哈希值
    userForm.password = ''
    // console.log(userForm)
    dialogVisible.value = true
}

// 编辑确认回调
const handleEditConfirm = () => {
    userFormRef.value.validate(async (vaild) => {
        if (vaild) {
            // 准备提交的数据
            const submitData = {
                _id: userForm._id,
                username: userForm.username,
                role: userForm.role,
                introduction: userForm.introduction
            }

            // 如果填写了新密码，则进行 MD5 加密并更新
            if (userForm.password) {
                submitData.password = md5Encrypt(userForm.password)
            }

            //1-更新后端
            await axios.put(`/adminapi/user/list/${userForm._id}`, submitData)
            //2-dialog隐藏
            dialogVisible.value = false
            //3-获取table数据
            getTableData()
        }
    })
}

const handleDelete = async (data) => {
    // console.log(data)
    await axios.delete(`/adminapi/user/list/${data._id}`)
    // 删除后如果当前页没有数据且不是第一页，则返回上一页
    if (tableData.value.length === 1 && currentPage.value > 1) {
        currentPage.value--
    }
    getTableData()
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


<style scoped lang="scss">
.el-table {
    margin-top: 50px;
}
</style>