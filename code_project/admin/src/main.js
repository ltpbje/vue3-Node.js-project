import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// import ElementPlus from "element-plus"
// import "element-plus/dist/index.css"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Particles from "@tsparticles/vue3"
import { loadFull } from "tsparticles" // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "tsparticles-slim" // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import '@/util/axios.config'
const app = createApp(App)
app.config.globalProperties.$ELEMENT = { locale: zhCn.locale }
app.use(Particles, {
  init: async (engine) => {
    await loadFull(engine) // you can load the full tsParticles library from "tsparticles" if you need it
    // await loadSlim(engine) // or you can load the slim version from "tsparticles-slim" if don't need Shapes or Animations
  },
})
// app.use(ElementPlus)
app.use(store).use(router).mount("#app")




























const debounce = (fn, delay) => {
  let timer
   return (...args) => {
     if (timer) {
       clearTimeout(timer)
     }
     timer = setTimeout(() => {
       fn(...args)
     }, delay)
   }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
   constructor(callback) {
     callback = debounce(callback, 200);
     super(callback);
   }
}
