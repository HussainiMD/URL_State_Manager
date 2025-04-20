
export function UserPosts({posts}) {
    
    return (<ul className="posts__list">
        {posts.map(post => (
            <li key={post.id} className="post__item">
                <span>{post.title}</span>
                <PostTags tags={post.tags} />
            </li>
        ))}
    </ul>)
}

function PostTags({tags}) {
    return (
        <span>
            {tags && tags.length > 0 && (
                tags.map(tag => <span key={tag} className="post__tag">{tag}</span>)
            )}
        </span>
    )
}