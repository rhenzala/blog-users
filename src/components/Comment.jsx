import { useEffect, useState } from "react";
import { fetchComments, createComment, editComment } from "../utils/api";
import { Pencil } from 'lucide-react';

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

const EditForm = ({ comment, onClose }) => {
    const [content, setContent] = useState(comment.content);
    const [error, setError] = useState(null);

    const handleEditComment = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await editComment(comment.id, content);
            onClose(); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="border-y border-zinc-700 my-4 py-4">
            <form onSubmit={handleEditComment} className="flex flex-col gap-4">
                <textarea
                    name="content"
                    id="content"
                    placeholder="Edit your comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-24 resize-none bg-zinc-300 dark:bg-zinc-700 rounded-md p-2"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in w-fit"
                >
                    SEND
                </button>
            </form>
        </div>
    );
};

const Comment = ({ post, user }) => {
    const [comments, setComments] = useState([]);
    const [activeCommentId, setActiveCommentId] = useState(null); 

    useEffect(() => {
        async function loadComments() {
            const data = await fetchComments(post.id);
            setComments(data);
        }
        loadComments();
    }, []);

    const toggleActive = (commentId) => {
        setActiveCommentId(activeCommentId === commentId ? null : commentId);
    };

    return (
        <div>
            <CommentForm post={post} />
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className="bg-zinc-300 dark:bg-zinc-800 mb-4 border-b border-b-zinc-700"
                >
                    <div className="flex justify-between">
                        <p className="flex gap-4">
                            <span className="font-medium text-sm">{comment.author.username}</span>
                            <span className="font-light text-sm">
                                {new Date(comment.updatedAt).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </p>
                        {user.username === comment.author.username && (
                            <button
                                onClick={() => toggleActive(comment.id)}
                                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-sm px-2 py-1 rounded-md hover:bg-blue-500/20 hover:text-blue-500 hover:cursor-pointer focus:bg-blue-500/20 focus:text-blue-500 transition delay-200 ease-in"
                            >
                                <Pencil size={14} />
                            </button>
                        )}
                    </div>
                    <p className="mb-4">{comment.content}</p>
                    {activeCommentId === comment.id && (
                        <EditForm
                            comment={comment}
                            onClose={() => setActiveCommentId(null)} 
                        />
                    )}
                </div>
            ))}
        </div>
    );
};




export default Comment;