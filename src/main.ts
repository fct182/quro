import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

// 引入ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 导入所有图标并进行全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 为默认的HTML元素样式上提供了跨浏览器的高度一致性
import "normalize.css";

// 样式
import "@/styles/index.scss";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);

// 全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
