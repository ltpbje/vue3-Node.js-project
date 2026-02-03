<template>
    <div id="myeditor">

    </div>
</template>

<script setup>
import { onMounted, defineProps } from 'vue'
import E from "wangeditor"
const emit = defineEmits()
const props = defineProps({
    content: String
})
onMounted(() => {
    const editor = new E("#myeditor")
    editor.create()
    props.content && editor.txt.html(props.content)
    // 配置 onchange 回调函数
    editor.config.onchange = function (newHtml) {
        // console.log("change 之后最新的 html", newHtml);
        // 子传父
        emit('event', newHtml)
    };
    // 配置 z-index，确保工具栏不被遮挡
    editor.config.zIndex = 100
})
</script>

<style scoped>
#myeditor {
    position: relative;
    z-index: 100;
}
</style>
