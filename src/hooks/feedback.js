import axios from "axios";

const request = axios.create({
    baseURL: 'http://192.168.137.48:8080/portal',
    timeout: 1000
})

export function useSendFeedback(feedback) {
    return request.post('/feedback', feedback)
}