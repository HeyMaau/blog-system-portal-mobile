import {VIEWPORT_WIDTH} from "@/utils/constants";

export function convertPX2VW(px) {
    let pxSizeInt = parseInt(px);
    let vwSizeInt = pxSizeInt * 2 / (VIEWPORT_WIDTH / 100)
    let vwSizeStr = vwSizeInt.toFixed(5)
    return vwSizeStr + 'vw'
}