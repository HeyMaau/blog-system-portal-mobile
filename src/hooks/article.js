import axios from "axios";
import {API_PORTAL_PATH, ARTICLE_SUMMARY_LENGTH, CODE_SUCCESS} from "@/utils/constants";
import {useEventListener} from '@vant/use'
import {onMounted, ref, shallowRef, watch} from "vue";
import {onBeforeRouteUpdate} from "vue-router";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 5000
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

export function useInfiniteScroll(threshold, callback) {
    useEventListener('scroll', () => {
        if (getScrollTop() + getClientHeight() + threshold >= getScrollHeight()) {
            callback()
        }
    })

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
}

/*****************骨架屏功能******************/

export function useSkeletonAndEmpty(articleList, noMore) {

    const hasResponse = shallowRef(false)
    const loading = shallowRef(true)
    const isLoadingTimeout = shallowRef(false)
    const empty = shallowRef(false)

    watch(articleList, () => {
        if (articleList.length === 0 && noMore.value === false) {
            return
        }
        if (articleList.length === 0 && noMore.value === true) {
            empty.value = true
        }
        hasResponse.value = true
        if (isLoadingTimeout.value === true) {
            loading.value = false
        }
    })

    function showSkeleton() {
        loading.value = true
        isLoadingTimeout.value = false
        setTimeout(() => {
            isLoadingTimeout.value = true
            if (hasResponse.value === true) {
                loading.value = false
            }
        }, 500)
    }

    onMounted(() => {
        showSkeleton()
    })

    onBeforeRouteUpdate(() => {
        showSkeleton()
    })

    return {
        loading,
        empty
    }
}