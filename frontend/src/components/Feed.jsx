import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import Pin from './Pin';
import { getPosts } from "../service/posts";


const Feed = ({categories}) => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const item = categories.find(c => c.name === categoryId)
      const id = item?.id || 99999
      const query = `?category=${id}`
      fetchData(query)
    } else {
      setLoading(true);
      fetchData()
    }
  }, [categoryId]);
  const ideaName = categoryId || 'new';

  const fetchData = async (query = '') => {
    try {
      const data = await getPosts(query)
      setPosts(data)
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
    }
   
  }

  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} posts to your feed!`} />
    );
  }
  return (
  
    <div>
      {posts && (
        posts.map((post) => <Pin key={post.id} post={post} className="w-max" />)
      )}
    </div>
  );
};

export default Feed;
