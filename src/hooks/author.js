import axios from "axios";
import {API_PORTAL_PATH, CODE_IP_BLOCKED, CODE_SUCCESS} from "@/utils/constants";
import {provideAuthorInfo} from "@/utils/store";
import router from "@/router";

const request = axios.create({
    baseURL: API_PORTAL_PATH + '/user/admin',
    timeout: 5000
})

request.interceptors.response.use(res => {
    if (res.data.code === CODE_IP_BLOCKED) {
        router.push('/error')
    }
    return res
})

function getAuthorInfoApi() {
    request.get('').then(({data: response}) => {
        if (response.code === CODE_SUCCESS) {
            provideAuthorInfo.value = response.data
        }
    })
}

export function useGetAuthorInfo() {
    getAuthorInfoApi()
}