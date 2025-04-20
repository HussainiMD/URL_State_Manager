import { URL_PARAM_NAMES } from "../common/constants";

export function ensureString(str) {
    if(typeof str !== 'string') return "";
    return str;
}



export function getNewURLParams(currentParams, key="", value="") {
    if(!currentParams || !key || key?.length == 0) return;
    const newURLParams = new URLSearchParams(currentParams);//URLSearchParams is built in JS interface

    if(!value || value?.length==0) 
        newURLParams.delete(URL_PARAM_NAMES[key]);
    else
        newURLParams.set(URL_PARAM_NAMES[key], value);

    return newURLParams;
}