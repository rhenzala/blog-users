import { useState } from "react"
import Comment from "./Comment";

const Blog = ({post}) => {
    const [showMore, setShowMore] = useState(false);
    const handleMoreClick = () => {
        setShowMore(!showMore);
    }
    return (
        <div className="bg-zinc-300 dark:bg-zinc-800 rounded-lg p-4 my-2">
            <p className="flex gap-4 mb-4">
                <span className="font-medium text-sm">{post.author.username}</span>
                <span className="font-light text-sm">{new Date(post.updatedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}</span>
            </p>
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="mb-4">{post.content}</p>
            <button 
            onClick={handleMoreClick}
            className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in"
            >
                {showMore ? 'Hide' : 'Show'} comments
            </button>
            {showMore && <Comment post={post} />}
        </div>
    )
}

export default Blog