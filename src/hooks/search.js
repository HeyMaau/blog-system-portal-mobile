import axios from "axios";
import {API_PORTAL_PATH, CODE_IP_BLOCKED} from "@/utils/constants";
import router from "@/router";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 5000
})

request.interceptors.response.use(res => {
    if (res.data.code === CODE_IP_BLOCKED) {
        router.push('/error')
    }
    return res
})

export function doSearchApi(keyword, page, size) {
    return request.get('/search', {
        params: {
            keyword,
            page,
            size
        }
    })
}