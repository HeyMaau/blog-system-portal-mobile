import {createRouter, createWebHashHistory} from 'vue-router'

import HomePage from "@/components/HomePage";
import FeedbackPage from "@/components/FeedbackPage"
import ThinkingPage from "@/components/ThinkingPage"
import CategoryPage from "@/components/CategoryPage"
import ArticleDetailPage from "@/components/ArticleDetailPage"

const routes = [
    {
        path: '/', component: HomePage, children: [
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