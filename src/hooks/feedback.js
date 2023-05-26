import axios from "axios";
import {API_PORTAL_PATH} from "@/utils/constants";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 5000
})

export function useSendFeedback(feedback) {
    return request.post('/feedback', feedback)
}