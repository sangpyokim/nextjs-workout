export const isPlatformPC = () => {
    let res = true
    let filter = "win16|win32|win64|mac|macintel";
    if(0 > filter.indexOf(navigator.platform.toLowerCase())){
        res = false
    }
    return res
}