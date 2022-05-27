import React, { useEffect, useState } from "react";

import Pin from "./Pin";
import Spinner from "./Spinner";
import { getPosts } from "../service/posts";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      fetchData();
    }
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const query = `?searchTerm=${searchTerm}`;
      const data = await getPosts(query);
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Some thing went wrong");
    }
  };

  const renderPosts = () => {
    return (
    <div className="">
      <p>Results for: {searchTerm}</p>
     { posts.map((post) => (
      <Pin key={post.id} post={post} className="w-max" />
      ))}
    </div>
  )}

  return (
    <div>
      {loading && <Spinner message="Searching posts..." />}
      <div className="">{posts.length ? renderPosts() : ""}</div>

      {posts.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Posts Found!</div>
      )}
    </div>
  );
};

export default Search;
