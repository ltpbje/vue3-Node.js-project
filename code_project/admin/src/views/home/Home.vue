<template>
    <div>
        <el-page-header icon="" title="闪讯库数字化管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 首页 </span>
            </template>
        </el-page-header>

        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="100" :src="avatarUrl" />
                </el-col>
                <el-col :span="20" style="line-height: 100px;">欢迎 {{ store.state.userInfo.username
                }}回来, {{ welcomeText }}</el-col>
            </el-row>
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
            </template>

            <el-carousel v-if="loopList.length" :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="item in loopList" :key="item._id">
                    <div :style="{
                        backgroundImage: `url(http://localhost:3000${item.cover})`,
                        backgroundSize: 'cover',
                        height: '100%',
                        width: '100%',
                        position: 'relative'
                        // backgroundRepeat: 'no-repeat'
                    }">
                        <h3 :style="{
                            position: 'absolute',
                            left: '90px',
                            bottom: '-57px'
                        }" text="2xl" justify="center">{{ item.title }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-card>

    </div>

</template>


<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
const store = useStore();
const loopList = ref([]);
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const welcomeText = computed(() => new Date().getHours() < 12 ? '要开心每一天!' : '喝杯咖啡提提神吧!');
// console.log(store.state)
onMounted(() => {
    getData();
});
// 获取表格数据
const getData = async () => {
    const res = await axios.get(`/adminapi/product/list/?username=${store.state.userInfo.username}`);
    // console.log(res.data)
    loopList.value = res.data.data;
    console.log(loopList.value);

}

</script>


<style lang="scss" scoped>
.box-card {
    margin-top: 50px;
}

.el-carousel__item h3 {
    color: white;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>