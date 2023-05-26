import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import {updateHeaderState} from "@/hooks/header";

import MainContainer from "@/components/MainContainer";
import FeedbackPage from "@/components/page/FeedbackPage"
import ThinkingPage from "@/components/page/ThinkingPage"
import CategoryPage from "@/components/page/CategoryPage"
import ArticleDetailPage from "@/components/page/ArticleDetailPage"
import HomePage from '@/components/page/HomePage'
import SearchPage from '@/components/page/SearchPage'
import AboutMePage from '@/components/page/AboutMePage'
import ErrorPage from '@/components/page/ErrorPage'
import {provideRouterPath} from "@/utils/store";

const routes = [
    {
        path: '/', component: MainContainer, children: [
            {path: '', component: HomePage},
            {path: 'feedback', component: FeedbackPage},
            {path: 'thinking', component: ThinkingPage},
            {path: 'category/:id', component: CategoryPage},
            {path: 'article/:id', component: ArticleDetailPage},
            {path: 'search', component: SearchPage},
            {path: 'about', component: AboutMePage},
            {path: 'error', component: ErrorPage}
        ]
    }
]

const router = createRouter({
    history: process.env.NODE_ENV === 'production' ? createWebHistory() : createWebHashHistory('/m/'),
    routes,
})

router.beforeEach(to => {
    updateHeaderState(to.path)
    provideRouterPath.value = to.path
})

export default router