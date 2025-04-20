import { useEffect } from "react";
import { getTags } from "../lib/helper";

export function useFilterTags({setTags, setFilteredPosts, searchFilter}) {    
    useEffect(() => {
        async function getData() {
            const tagsData = await getTags();            
            setTags(tagsData);
            setFilteredPosts(searchFilter);
        }
        getData();
        return () => console.log('cleaning up')
    }, []);
    
}