import { useEffect, useState } from "react";
import { fetchComments, createComment } from "../utils/api";

const CommentForm = ({post}) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const handleCreateComment = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await createComment(post.id, content);
            setSuccess("Comment sent.");
            setContent("");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div className="border-y border-zinc-700 my-4 py-4">
            <form 
            onSubmit={handleCreateComment}
            className="flex flex-col gap-4 "
            >
                <textarea 
                name="content" 
                id="content" 
                placeholder="Leave a comment..."
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-24 resize-none bg-zinc-300 dark:bg-zinc-700 rounded-md p-2"
                required
                ></textarea>
                <button 
                type="submit"
                className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in w-fit"
                >SEND</button>
            </form>
        </div>
    )
}

const Comment = ({post}) => {
    const [comments, setComments] = useState([]);
        
        useEffect(() => {
            async function loadComments() {
                const data = await fetchComments(post.id);
                setComments(data)
            }
            loadComments();
        }, [])
    return (
        <div>
            <CommentForm post={post} />
            {comments.map((comment) => (
                <div
                key={comment.id} 
                className="bg-zinc-300 dark:bg-zinc-800 rounded-lg mb-4">
                    <p className="flex gap-4">
                        <span className="font-medium text-sm">{comment.author.username}</span>
                        <span className="font-light text-sm">{new Date(comment.updatedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}</span>
                    </p>
                    <p className="">{comment.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Comment;