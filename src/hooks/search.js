import axios from "axios";
import {API_PORTAL_PATH} from "@/utils/constants";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 1000
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