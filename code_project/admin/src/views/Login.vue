<template>
    <div class="login-container">
        <div class="formContainer">
            <h3>品讯数字化管理系统</h3>
            <el-tabs v-model="activeTab" class="demo-tabs">
                <el-tab-pane label="登录" name="login">
                    <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="loginRules"
                        label-width="80px" class="loginForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="loginForm.username" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="loginForm.password" show-password autocomplete="off" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit-btn" @click="submitForm()">
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    <el-form ref="registerFormRef" style="max-width: 600px" :model="registerForm" status-icon :rules="registerRules"
                        label-width="80px" class="registerForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="registerForm.username" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="registerForm.password" show-password autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirmPassword">
                            <el-input v-model="registerForm.confirmPassword" show-password autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="角色" prop="role">
                            <el-select v-model="registerForm.role" placeholder="请选择角色" style="width: 100%">
                                <el-option label="编辑" :value="2" />
                                <el-option label="管理员" :value="1" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit-btn" @click="submitRegister()">
                                注册
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import store from '@/store';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import CryptoJS from 'crypto-js';

// MD5 加密函数
const md5Encrypt = (password) => {
    return CryptoJS.MD5(password).toString();
};

const activeTab = ref('login');
const loginForm = reactive({
    username: '',
    password: ''
});
const registerForm = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    role: 2
});
const loginFormRef = ref();
const registerFormRef = ref();
const router = useRouter();

const validateConfirmPassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致'));
    } else {
        callback();
    }
};

const loginRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
});

const registerRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, validator: validateConfirmPassword, trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'change' },
    ],
});
// 提交表单函数
const submitForm = () => {
    loginFormRef.value.validate((valid) => {
        if (valid) {
            // 对密码进行 MD5 加密后传输
            const encryptedData = {
                username: loginForm.username,
                password: md5Encrypt(loginForm.password)
            };
            axios.post('/adminapi/user/login', encryptedData).then((res) => {
                if (res.data.ActionType === 'OK') {
                    store.commit('changeUserInfo', res.data.data);
                    router.push('/index');
                } else {
                    console.log(res.data);
                    ElMessage({
                        message: '用户名和密码不匹配',
                        type: 'error',
                        plain: false,
                    });
                }
            });
        }
    });
};

const submitRegister = () => {
    registerFormRef.value.validate((valid) => {
        if (valid) {
            // 对密码进行 MD5 加密后传输
            const encryptedData = {
                username: registerForm.username,
                password: md5Encrypt(registerForm.password),
                role: registerForm.role
            };
            axios.post('/adminapi/user/register', encryptedData).then((res) => {
                if (res.data.ActionType === 'OK') {
                    ElMessage({
                        message: '注册成功，请登录',
                        type: 'success',
                        plain: false,
                    });
                    loginForm.username = registerForm.username;
                    activeTab.value = 'login';
                    registerForm.username = '';
                    registerForm.password = '';
                    registerForm.confirmPassword = '';
                    registerForm.role = 2;
                } else {
                    ElMessage({
                        message: res.data.error || '注册失败',
                        type: 'error',
                        plain: false,
                    });
                }
            });
        }
    });
};

// const handleLogin = ()=>{
//     localStorage.setItem('token','kerwin')
// }
onMounted(() => {
    window.addEventListener('keydown', keyDown);
});
const keyDown = (e) => {
    if (e.keyCode == 13) {
        if (activeTab.value === 'login') {
            submitForm();
        } else {
            submitRegister();
        }
    }
};
onUnmounted(() => {
    window.removeEventListener('keydown', keyDown, false);
});
const options = {
    background: {
        color: {
            value: '#6266D1'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: 'bounce',
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 }
        }
    },
    detectRetina: true
};
const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};
</script>

<style lang="scss" scoped>
.login-container {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
    overflow: hidden;
    position: relative;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.formContainer {
    box-sizing: border-box;
    border-radius: 20px;
    width: 600px;
    min-height: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: #fff, $alpha: 0.92);
    text-align: center;
    padding: 35px 40px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);

    h3 {
        font-size: 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 25px;
    }

    .loginForm,
    .registerForm {
        margin-top: 20px;
    }

    .submit-btn {
        width: 100%;
    }
}

::v-deep .el-form-item__label {
    color: #333;
}

::v-deep .el-button--primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    transition: all 0.3s ease;
}

::v-deep .el-button--primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

::v-deep .el-tabs__item {
    color: #666;
    font-size: 16px;
}

::v-deep .el-tabs__item.is-active {
    color: #667eea;
    font-weight: 600;
}

::v-deep .el-tabs__active-bar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

</style>