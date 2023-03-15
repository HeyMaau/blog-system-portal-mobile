import axios from "axios";
import {API_PORTAL_PATH} from "@/utils/constants";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 1000
})

export function getCategories() {
    return request.get('/website_info/categories')
}