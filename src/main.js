import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'


import './style.css'
import App from './App.vue'
import router from './router' 

const pinia = createPinia()
const app = createApp(App)

app.component('Toaster', Toaster)
app.use(router)
app.use(pinia)
app.mount('#app')
