import axios from "axios";
import {API_PORTAL_PATH} from "@/utils/constants";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 1000
})

export function getCategoriesApi() {
    return request.get('/website_info/categories')
}

export function getArticlesApi(page, size, categoryID) {
    return request.get('/article/list', {
        params: {
            page,
            size,
            categoryID
        }
    })
}