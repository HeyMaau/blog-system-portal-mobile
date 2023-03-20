import {createRouter, createWebHashHistory} from 'vue-router'

import MainContainer from "@/components/MainContainer";
import FeedbackPage from "@/components/FeedbackPage"
import ThinkingPage from "@/components/ThinkingPage"
import CategoryPage from "@/components/CategoryPage"
import ArticleDetailPage from "@/components/ArticleDetailPage"
import HomePage from '@/components/HomePage'

const routes = [
    {
        path: '/', component: MainContainer, children: [
            {path: '', component: HomePage},
            {path: 'feedback', component: FeedbackPage},
            {path: 'thinking', component: ThinkingPage},
            {path: 'category/:id', component: CategoryPage},
            {path: 'article/:id', component: ArticleDetailPage},
        ]
    }
]

export default createRouter({
    history: createWebHashHistory('/m/'),
    routes,
})