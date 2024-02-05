import {onMounted} from 'vue'
import axios from "axios";
import {API_PORTAL_PATH} from "../utils/constants.js";
import {RecordClient} from "../utils/StatisticsConstants";
import {onBeforeRouteUpdate, RouteLocationNormalized} from "vue-router";

const request = axios.create({
    baseURL: API_PORTAL_PATH,
    timeout: 5000
})

export function useCommitVisitRecord(pageName: string, componentName: string | null, eventName: string): void {
    onMounted(() => {
        commitRecord()
    })

    function commitRecord(): void {
        request.post('/statistics/record', new Record(pageName, componentName, eventName, RecordClient.CLIENT_NAME_MOBILE))
    }
}

export function useCommitVisitRecordOnBeforeRouteUpdate(pageName: string, componentName: string | null, eventName: string): void {
    onBeforeRouteUpdate((to) => {
        commitRecord(to)
    })

    function commitRecord(to: RouteLocationNormalized): void {
        request.post('/statistics/record', new Record(pageName + to.params.id, componentName, eventName, RecordClient.CLIENT_NAME_MOBILE))
    }
}

class Record {

    constructor(private page: string, private component: string | null, private event: string, private client: string) {

    }
}



