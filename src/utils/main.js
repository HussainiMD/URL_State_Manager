import {ensureString} from "./global";

export function getHandleSearchInput({urlParams, setURLParams, getNewURLParams, getSearchFilterTxt, setFilteredPosts}) {
    return function (event) {                                
        const newURLParams = getNewURLParams(urlParams, 'search', getSearchFilterTxt());
        setURLParams(newURLParams);        
        setFilteredPosts();
    }
}

export function getHandleTagInput({urlParams, setURLParams, getNewURLParams, tagFilterTxt, setFilteredPosts}) {
    return function (event) {        
        tagFilterTxt.current = event.target.value;             
        const newURLParams = getNewURLParams(urlParams, 'tagFilter', tagFilterTxt.current);
        setURLParams(newURLParams);           
        setFilteredPosts();
    }
}

export function filterPosts(searchTxt="", filterByTag="", posts) {
    if(!Array.isArray(posts)) return [];

    searchTxt = ensureString(searchTxt);
    filterByTag = ensureString(filterByTag);

    const searchTxtRegEx = new RegExp(searchTxt.trim(), "i");        
    const selectedPosts = posts.filter(post => {
        const isFoundTxt = searchTxtRegEx.test(post.title);   

        const isTagMatching = post?.tags.length > 0 && filterByTag.length > 0 ? post.tags.includes(filterByTag) : true;        
        return isFoundTxt && isTagMatching;
    })
    
    return selectedPosts;
}


export function getPostsFilterFn(posts, setPosts, getSearchFilterTxt, tagFilterTxtRef) {
    return function() {
        const filteredPosts = filterPosts(getSearchFilterTxt(), tagFilterTxtRef.current, posts);
        setPosts(filteredPosts);
    }
}

