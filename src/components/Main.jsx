import  {useState, useRef, useCallback} from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { UserPosts } from "./UserPosts";

import { getNewURLParams } from "../utils/global";
import {getHandleSearchInput, getHandleTagInput, filterPosts, getPostsFilterFn} from "../utils/main";
import { useDebounce } from "../hooks/custom";
import { useFilterTags } from "../hooks/useFilterTags";
import { URL_PARAM_NAMES } from "../common/constants";



export function Main() {
    const allPosts = useLoaderData() || [];    

    const [urlParams, setURLParams] = useSearchParams();
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([...allPosts]);
    const [searchFilter, setSearchFilter] = useState(urlParams.get(URL_PARAM_NAMES['search']) || "");
    const tagFilterTxt = useRef(urlParams.get(URL_PARAM_NAMES['tagFilter']));
    
    const getSearchFilterTxt = useCallback(() => searchFilter);

    const setFilteredPosts = useCallback(getPostsFilterFn(allPosts, setPosts, getSearchFilterTxt, tagFilterTxt));    
    useFilterTags({setTags, setFilteredPosts, searchFilter});

    
    const handleSearchInput = useCallback(getHandleSearchInput({urlParams, setURLParams, getNewURLParams, getSearchFilterTxt, setFilteredPosts}));
    
    const handleDebouncedSearchInput = useDebounce(handleSearchInput, 1000);
    const handleSearchInputChange = (event) => {
        setSearchFilter(event.target.value);
        handleDebouncedSearchInput(event);
    }

    const handleTagInput = useCallback(getHandleTagInput({urlParams, setURLParams, getNewURLParams, tagFilterTxt, setFilteredPosts}));
    
    return (
        <main className="main__content">
            <h3>Here are the posts</h3>
            <div>
                <input type="text" name="search" placeholder="Search..."  onChange={handleSearchInputChange} value={searchFilter}/>
                <select name="tagsFilter" title="tags filter" onChange={handleTagInput} value={tagFilterTxt.current ?? ""}>
                    <option value="">None</option>
                    {
                        tags.map(tag => <option key={tag} value={tag} >{tag}</option>)
                    }
                </select>
            </div>
            <UserPosts posts={posts} />
        </main>
    );
}

  
 

