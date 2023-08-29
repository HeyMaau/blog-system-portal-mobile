import axios from "axios";
import {API_PORTAL_PATH} from "@/utils/constants";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 5000
})

export function publishCommentApi(comment) {
    return request.post('/comment', comment)
}

export function getArticleCommentsApi(articleID, type, page, size) {
    return request.get(`/comment/list/${type}/${articleID}`, {
        params: {
            page,
            size
        }
    })
}