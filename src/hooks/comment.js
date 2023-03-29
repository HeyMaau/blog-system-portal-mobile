import axios from "axios";
import {API_PORTAL_PATH} from "@/utils/constants";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 1000
})

export function publishCommentApi(comment) {
    return request.post('/comment', comment)
}

export function getArticleCommentsApi(articleID, page, size) {
    return request.get('/comment/list/' + articleID, {
        params: {
            page,
            size
        }
    })
}