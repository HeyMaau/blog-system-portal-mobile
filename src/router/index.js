import {createRouter, createWebHashHistory} from 'vue-router'

import HomePage from "@/components/HomePage";
import FeedbackPage from "@/components/FeedbackPage"

const routes = [
    {
        path: '/', component: HomePage, children: [
            {path: 'feedback', component: FeedbackPage}
        ]
    }
]

export default createRouter({
    history: createWebHashHistory('/m/'),
    routes,
})