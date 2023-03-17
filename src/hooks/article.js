import axios from "axios";
import {API_PORTAL_PATH, ARTICLE_SUMMARY_LENGTH, CODE_SUCCESS} from "@/utils/constants";

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

export function useGetArticles(page, size, categoryID, list) {
    getArticlesApi(page, size, categoryID).then(({data: response}) => {
        if (response.code === CODE_SUCCESS) {
            response.data.data.forEach(item => {
                list.push(item)
            })
            trimArticleSummary(list)
        }
    })
}

function trimArticleSummary(list) {
    if (list !== undefined) {
        list.forEach(item => {
            if (item.content.length > ARTICLE_SUMMARY_LENGTH) {
                item.content = item.content.slice(0, ARTICLE_SUMMARY_LENGTH) + '...'
            }
        })
    }
}