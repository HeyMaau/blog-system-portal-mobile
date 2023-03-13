import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router/index'

import {NavBar, Button, Image as VanImage, Search, Icon} from 'vant';
import 'vant/lib/index.css';

import '@/assets/css/global.css'

const app = createApp(App)
app.use(router).mount('#app')

app.use(NavBar)
app.use(Button)
app.use(VanImage)
app.use(Search)
app.use(Icon)

