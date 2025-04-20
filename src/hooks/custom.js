import { useRef } from "react";

export function useDebounce(fn, timeOutInMillis) {
    let timerId = useRef();
    function debouncedFn(...args) {
        clearTimeout(timerId.current);           
        timerId.current = setTimeout(fn, timeOutInMillis, ...args);                    
    }

    return debouncedFn;
}