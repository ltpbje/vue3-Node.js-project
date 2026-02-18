<template>
    <div class="product-container">
        <el-carousel direction="vertical" height="calc(100vh - 60px)" :autoplay="false" v-if="loopList.length"
            class="product-carousel" arrow="always">
            <el-carousel-item v-for="item in loopList" :key="item._id" class="carousel-item">
                <div class="item" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <h2>{{ item.title }}</h2>
                            </div>
                        </template>
                        <div class="introduction">{{ item.introduction }}</div>
                        <div class="detail">{{ item.detail }}</div>
                    </el-card>
                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty description="暂无产品" v-else class="empty-state"></el-empty>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const loopList = ref([]);

onMounted(async () => {
    const res = await axios.get('/webapi/product/list');
    console.log(res);
    loopList.value = res.data.data;

});
</script>

<style lang="scss" scoped>
.product-container {
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
}

.product-carousel {
    width: 100%;
    height: 100%;
}

.carousel-item {
    width: 100%;
    height: 100%;
}

.item {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    padding: 0 5%;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
        z-index: 1;
    }
}

.box-card {
    width: 45%;
    max-width: 600px;
    height: 80%;
    max-height: 600px;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 2;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    }

    :deep(.el-card__header) {
        padding: 18px 20px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
        flex-shrink: 0;
    }

    :deep(.el-card__body) {
        padding: 20px;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        min-height: 0;
    }

    .card-header {
        h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #333;
            margin: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
    }

    .introduction {
        font-size: 1rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 20px;
        flex-shrink: 0;
    }

    .detail {
        font-size: 0.95rem;
        line-height: 1.5;
        color: #666;
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 10px;
        min-height: 0;

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
            transition: background 0.3s ease;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
        }
    }
}

.empty-state {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
}

// 响应式设计
@media (max-width: 1200px) {
    .box-card {
        width: 55%;
    }
}

@media (max-width: 768px) {
    .box-card {
        width: 85%;
        height: 85%;
    }

    .item {
        padding: 0 3%;
    }

    .box-card .card-header h2 {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .box-card {
        width: 95%;
        height: 90%;
    }

    .box-card .card-header h2 {
        font-size: 1.3rem;
    }

    .box-card .introduction {
        font-size: 0.9rem;
    }

    .box-card .detail {
        font-size: 0.85rem;
    }
}

// 动画效果
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.box-card {
    animation: fadeInUp 0.6s ease-out forwards;
}
</style>