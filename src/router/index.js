import {createRouter, createWebHashHistory} from 'vue-router'

import MainContainer from "@/components/MainContainer";
import FeedbackPage from "@/components/page/FeedbackPage"
import ThinkingPage from "@/components/page/ThinkingPage"
import CategoryPage from "@/components/page/CategoryPage"
import ArticleDetailPage from "@/components/page/ArticleDetailPage"
import HomePage from '@/components/page/HomePage'
import SearchPage from '@/components/page/SearchPage'

const routes = [
    {
        path: '/', component: MainContainer, children: [
            {path: '', component: HomePage},
            {path: 'feedback', component: FeedbackPage},
            {path: 'thinking', component: ThinkingPage},
            {path: 'category/:id', component: CategoryPage},
            {path: 'article/:id', component: ArticleDetailPage},
            {path: 'search', component: SearchPage}
        ]
    }
]

export default createRouter({
    history: createWebHashHistory('/m/'),
    routes,
})