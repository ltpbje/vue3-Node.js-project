<template>
    <div>
        <!-- <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" url="http://foo.bar/particles.json" /> -->

        <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="options" />

        <div class="formContainer">
            <h3>闪讯库数字化管理系统</h3>
            <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="loginRules"
                label-width="80px" class="loginForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import store from '@/store';
import axios from 'axios';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const loginForm = reactive({
    username: '',
    password: ''
})//表单绑定的响应式对象
const loginFormRef = ref() //表单的引用对象
const loginRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})
const router = useRouter()
// 提交表单函数
const submitForm = () => {
    //1. 校验表单
    loginFormRef.value.validate((valid) => {
        if (valid) {
            // console.log(loginForm)
            // localStorage.setItem('token', 'kerwin')
            axios.post('/adminapi/user/login', loginForm).then((res) => {
                // console.log(res.data)
                if (res.data.ActionType === 'OK') {
                    // console.log(res.data.data)
                    store.commit('changeUserInfo', res.data.data)
                    router.push('/index')

                    // localStorage.setItem('token', 'kerwin')
                } else {
                    // ElMessage.error('用户名和密码不匹配')
                    console.log(res.data)
                    ElMessage({
                        message: '用户名和密码不匹配',
                        type: 'error',
                        plain: false,
                    })
                }
            })
            // router.push('/index')
        }
    })


    // 2。拿到表单内容，提交后台
    // 3.设置token
    // localstorage.setItem("token", "kerwin")
}

// const handleLogin = ()=>{
//     localStorage.setItem('token','kerwin')
// }
onMounted(() => {
    window.addEventListener('keydown', keyDown)
})
const keyDown = (e) => {
    //如果是回车则执行登录方法
    if (e.keyCode == 13) {
        submitForm()
    }
}
onUnmounted(() => {
    window.removeEventListener('keydown', keyDown, false)
})
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
}
const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};
</script>

<style lang="scss" scoped>
.formContainer {
    box-sizing: border-box;
    border-radius: 20px;
    width: 500px;
    height: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: #fff, $alpha: 0.89);
    text-align: center;
    padding: 35px 20px;

    h3 {
        font-size: 30px;
    }

    .loginForm {
        margin-top: 20px;
    }
}

::v-deep .el-form-item__label {
    color: black;
}
</style>