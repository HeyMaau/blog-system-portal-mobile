import {provideCategoryList, provideHeaderTitle} from "@/utils/store";

export function setCategoryName(categoryID) {
    let list = provideCategoryList.value;
    list.forEach(item => {
        if (item.id === categoryID) {
            provideHeaderTitle.value = item.name
        }
    })
}