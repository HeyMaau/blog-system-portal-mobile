export function useGetTitle(path) {
    let title
    switch (path) {
        case '/thinking':
            title = '想法'
            break
        case '/feedback':
            title = '联系我'
            break
        default:
            title = '首页'
    }
    return title
}