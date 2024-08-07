import { createApp } from "vue";
import Map from "./Map.vue";
import "element-plus/dist/index.css";
import "@/styles/index.css";
import "@/styles/tailwind.css";

window._AMapSecurityConfig = {
  // 密钥【Web端应用】
  securityJsCode: "d7ededf3da7166944aeefb14c2b384eb",
};

const app = createApp(Map);

app.mount("#root");
