import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Pin from "./Pin";
import { getPosts } from "../service/posts";

const activeBtnStyles =
  "bg-red-500 text-white font-bold py-3 px-5 rounded-md  outline-none";

const BASE_DOMAIN = process.env.REACT_APP_BASE_DOMAIN;

const UserProfile = ({ user }) => {
  const [posts, setPosts] = useState();
  const { logout } = useAuth0();
  const { userId } = useParams();

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const fetchPosts = async () => {
    try {
      const query = `?user_id=${userId}`;
      const data = await  getPosts(query)
     
      setPosts(data);
    } catch (error) {
      alert("Some thing went wrong");
    }
  };

  const onLogOut = () => {
    localStorage.clear();
    logout({ returnTo: BASE_DOMAIN })
  }


  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.picture}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            Welcome, {user.nickname}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            <button
              type="button"
              className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => onLogOut({ returnTo: 'http://localhost:3000' })}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        </div>
        <div className="text-center mb-7">
          <button type="button" className={activeBtnStyles}>
            Post Created
          </button>
        </div>

        <div className="px-2">
          {posts &&
            posts.map((post) => (
              <Pin key={post.id} post={post} className="w-max" />
            ))}
        </div>

        {posts?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
