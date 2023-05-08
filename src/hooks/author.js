import axios from "axios";
import {API_PORTAL_PATH, CODE_SUCCESS} from "@/utils/constants";
import {provideAuthorInfo} from "@/utils/store";

const request = axios.create({
    baseURL: API_PORTAL_PATH + '/user/admin',
    timeout: 5000
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