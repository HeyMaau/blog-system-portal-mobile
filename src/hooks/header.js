import {provideHeaderTitle} from "@/utils/store";
import {KEY_CATEGORY_LIST} from "@/utils/constants";
import {shallowRef} from "vue";

export function setCategoryName(categoryID) {
    let list = JSON.parse(sessionStorage.getItem(KEY_CATEGORY_LIST));
    list.forEach(item => {
        if (item.id === categoryID) {
            provideHeaderTitle.value = item.name
        }
    })
}

export const showAvatar = shallowRef(true)
export const showMenu = shallowRef(true)

export function updateHeaderState(path) {
    if (path === '/') {
        showAvatar.value = true
        showMenu.value = true
    } else if (path.startsWith('/search')) {
        showAvatar.value = false
        showMenu.value = false
    } else {
        showAvatar.value = false
        showMenu.value = true
    }
}