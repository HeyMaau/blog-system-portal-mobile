import {createRouter, createWebHashHistory} from 'vue-router'

import HomePage from "@/components/HomePage";
import FeedbackPage from "@/components/FeedbackPage"
import ThinkingPage from "@/components/ThinkingPage"

const routes = [
    {
        path: '/', component: HomePage, children: [
            {path: 'feedback', component: FeedbackPage},
            {path: 'thinking', component: ThinkingPage}
        ]
    }
]

export default createRouter({
    history: createWebHashHistory('/m/'),
    routes,
})