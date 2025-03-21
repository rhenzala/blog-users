import { useState, useEffect } from "react";
import { fetchPosts } from "../utils/api";
import AllBlogs from "./AllBlogs";


const Feed = ({ user }) => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        async function loadPosts() {
            const data = await fetchPosts();
            setPosts(data);
        }
        loadPosts();
    }, []);
    return (
        <div className="container mx-auto">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl">Posts</h2>
            </div>
            {posts.map((post) => (
                <AllBlogs key={post.id} post={post} user={user} />
            ))}
        </div>
    );
};

export default Feed;
