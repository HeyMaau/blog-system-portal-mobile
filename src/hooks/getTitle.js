import {provideCategoryList} from "@/utils/store";

export function useGetTitle(path) {
    let title
    if (path.startsWith('/thinking')) {
        title = '想法'
    } else if (path.startsWith('/feedback')) {
        title = '联系我'
    } else if (path.startsWith('/category')) {
        let index = path.lastIndexOf('/');
        let categoryID = path.slice(index + 1);
        const categoryList = provideCategoryList.value;
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].id === categoryID) {
                title = categoryList[i].name
                break
            }
        }
    }
    return title
}