import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../utils/api";
import AllBlogs from "./AllBlogs";

const Feed = ({ user, isAuthenticated }) => {
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
      {!isAuthenticated && (
        <div className="bg-rose-500/10 p-2 text-center rounded-md">
          You are browsing as a guest.{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-rose-500 outline-none focus:text-rose-500"
          >
            Log in
          </Link>{" "}
          to comment and interact with posts.
        </div>
      )}
      <div className="flex justify-between my-6">
        <h2 className="text-2xl">Posts</h2>
      </div>
      {posts.map((post) => (
        <AllBlogs key={post.id} post={post} user={user} />
      ))}
    </div>
  );
};

export default Feed;
