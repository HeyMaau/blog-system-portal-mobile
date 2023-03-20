import axios from "axios";
import {API_PORTAL_PATH, ARTICLE_SUMMARY_LENGTH, CODE_SUCCESS} from "@/utils/constants";
import {useEventListener} from '@vant/use'
import {ref} from "vue";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 1000
})

export function getCategoriesApi() {
    return request.get('/website_info/categories')
}

function getArticlesApi(page, size, categoryID) {
    return request.get('/article/list', {
        params: {
            page,
            size,
            categoryID
        }
    })
}

export function getFullArticleApi(articleID) {
    return request.get('/article/' + articleID)
}

export function useGetArticles(page, size, categoryID, list) {
    const noMore = ref(true)
    getArticlesApi(page, size, categoryID).then(({data: response}) => {
        if (response.code === CODE_SUCCESS) {
            response.data.data.forEach(item => {
                list.push(item)
            })
            trimArticleSummary(list)
            noMore.value = response.data.noMore
        }
    })
    return noMore
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

export function initCollapseState(list, state) {
    list.forEach(item => {
        if (state[item.id] === undefined) {
            state[item.id] = true
        }
    })
}

/*****************无限滚动功能******************/

//获取当前可视范围的高度
function getClientHeight() {
    let clientHeight;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    }
    return clientHeight
}

//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

//获取当前滚动条的位置
function getScrollTop() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
        scrollTop = document.body.scrollTop
    }
    return scrollTop
}

export function useInfiniteScroll(threshold, callback) {
    useEventListener('scroll', () => {
        if (getScrollTop() + getClientHeight() + threshold >= getScrollHeight()) {
            callback()
        }
    })
}