<template>
    <div>
        <el-page-header icon="" title="品讯数字化管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 个人中心 </span>
            </template>
        </el-page-header>
        <el-row :gutter="20" class="el-row">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h5>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</h5>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>


                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>

                    <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules"
                        label-width="auto" class="demo-ruleForm" status-icon>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" placeholder="Select" style="width: 100%">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="introduction">
                            <el-input v-model="userForm.introduction" type="textarea" />
                        </el-form-item>
                        <el-form-item label="头像" prop="introduction">
                            <Upload :avatar="userForm.avatar" @kerwinchange="handleChange"></Upload>
                        </el-form-item>

                        <el-form-item>
                            <el-button class="submit_btn" type="primary" @click="submitForm()">
                                更新
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>

        </el-row>
    </div>

</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref, reactive } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue';
const store = useStore();

const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');


const { username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file: null
});
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请输入性别', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
});

// 性别选项
const options = [
    {
        label: '保密',
        value: 0
    },
    {
        label: '男',
        value: 1
    },
    {
        label: '女',
        value: 2
    },
];

const handleChange = (file) => {
    // console.log(file)
    userForm.avatar = URL.createObjectURL(file);
    userForm.file = file;
};
// 更新提交用户信息
const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log('submit', userForm)
            const res = await upload('/adminapi/user/upload', userForm);
            if (res.ActionType === 'OK') {
                store.commit('changeUserInfo', res.data);
                ElMessage.success('更新成功');
            }
        }
    });
}

</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center
    }
}


.submit_btn {
    margin-left: 77px;
}
</style>
