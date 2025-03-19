import { useEffect, useState } from "react";
import { fetchPosts } from "../utils/api";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        async function loadPosts() {
            const data = await fetchPosts();
            setPosts(data)
        }
        loadPosts();
    }, [])

    return (
        <div className="container mx-auto">
        <h2 className="text-2xl">Posts</h2>
        {posts.map((post) => (
            <div key={post.id} className="border p-4 my-2">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p>{post.content}</p>
            </div>
        ))}
        </div>
    )
}

export default Feed