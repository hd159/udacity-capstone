import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/posts`;

export const getPosts = async (query) => {
    try {
        let queryString = BASE_URL
        if(query) {
            queryString += query
        }
      const data = await axios.get(queryString)
      return data.data.posts
    } catch (error) {
      alert('Some thing went wrong')
    }
   
  }

export const fetchPostDetails = async (postId) => {
    const post = await axios.get(`${BASE_URL}/${postId}`);
    return post.data.post
};

export const deletePost = async (postId) => {
    return axios.delete(`${BASE_URL}/${postId}`);
};

export const createPost = async (post) => {
    return await axios.post(`${BASE_URL}`, post);
};

export const updatePost = async (post, postId) => {
    return await axios.patch(`${BASE_URL}/${postId}`, post);
};