import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerElement } from './plugins/component'

const app = createApp(App)
;(async function () {
  // 注册组件
  registerElement(app)

  app.use(store).use(router).mount('#app')
  console.log('version: 1.0.0')
})()
