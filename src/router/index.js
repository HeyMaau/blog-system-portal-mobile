import {createRouter, createWebHashHistory} from 'vue-router'

import HomePage from "@/components/HomePage";

const routes = [
    {path: '/', component: HomePage}
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})