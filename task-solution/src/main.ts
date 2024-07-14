import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useContentStore } from './stores/content'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

const store = useContentStore()
store.loadContent()

app.mount('#app')
