import {provideHeaderTitle} from "@/utils/store";
import {KEY_CATEGORY_LIST} from "@/utils/constants";

export function setCategoryName(categoryID) {
    let list = JSON.parse(sessionStorage.getItem(KEY_CATEGORY_LIST));
    list.forEach(item => {
        if (item.id === categoryID) {
            provideHeaderTitle.value = item.name
        }
    })
}