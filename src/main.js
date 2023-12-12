import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router/index'
import VConsole from 'vconsole'
import 'viewerjs/dist/viewer.min.css'
import 'highlight.js/styles/default.css'

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const vConsole = new VConsole()

import {
    NavBar,
    Button,
    Image as VanImage,
    Search,
    Icon,
    Popup,
    Collapse,
    CollapseItem,
    Cell,
    Form,
    Field,
    CellGroup,
    Toast,
    BackTop,
    Sticky,
    Skeleton,
    SkeletonImage,
    SkeletonParagraph,
    SkeletonAvatar,
    SkeletonTitle,
    Pagination,
    Tag
} from 'vant';
import 'vant/lib/index.css';

import '@/assets/css/global.css'

const app = createApp(App)
app.use(router).mount('#app')

app.use(NavBar)
app.use(Button)
app.use(VanImage)
app.use(Search)
app.use(Icon)
app.use(Popup)
app.use(Collapse)
app.use(CollapseItem)
app.use(Cell)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(Toast)
app.use(BackTop)
app.use(Sticky)
app.use(Skeleton)
app.use(SkeletonImage)
app.use(SkeletonParagraph)
app.use(SkeletonAvatar)
app.use(SkeletonTitle)
app.use(Pagination)
app.use(Tag)