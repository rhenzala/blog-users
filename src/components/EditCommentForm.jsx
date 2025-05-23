import { editComment } from "../utils/api";
import { useState } from "react";

const EditCommentForm = ({ comment, onClose }) => {
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
    <div className="my-2 py-2">
      <form onSubmit={handleEditComment} className="flex gap-2">
        <textarea
          name="content"
          id="content"
          placeholder="Edit your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full resize-none bg-zinc-300 dark:bg-zinc-700 rounded-md p-2 focus:outline-1 focus:outline-blue-500"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md focus:outline-1 dark:focus:outline-zinc-100 focus:outline-zinc-700 hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in w-fit h-fit self-end"
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default EditCommentForm;
