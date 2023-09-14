import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.bundle.min'
import element from "element-plus"

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import axios from "./assets/js/axiosInstance.js";
axios.defaults.withCredentials = true;

const app = createApp(App)
app.use(store).use(router).use(element, {
    locale: zhCn,
}).mount('#app')
app.config.globalProperties.$axios = axios;
