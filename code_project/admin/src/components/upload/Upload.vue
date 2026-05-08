<template>
    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :auto-upload="false" :on-change="handleChange">
        <img style="width: 100%; height: 100%;" v-if="props.avatar" :src="uploadAvatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>

</template>


<script setup>
import { defineEmits, defineProps, computed } from 'vue';
import { Plus } from '@element-plus/icons-vue';
const props = defineProps({
    avatar: String
});

const emit = defineEmits(['kerwinchange']);
// 每次选择完图片后的回调
const handleChange = (file) => {
    // console.log(file)
    emit('kerwinchange', file.raw);
};


const uploadAvatar = computed(() => props.avatar.includes('blob') ? props.avatar : 'http://localhost:3000' + props.avatar);
</script>


<style lang="scss" scoped>
::v-deep .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 200px;
    height: 200px;
    transition: var(--el-transition-duration-fast);
}

::v-deep.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

::v-deep.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>