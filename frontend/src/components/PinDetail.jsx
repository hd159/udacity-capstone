import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';

import { fetchPostDetails, deletePost } from "../service/posts";
import Spinner from "./Spinner";
import Modal from "./Modal";

const messageHeader = "Delete Post";
const messageBody =
  "Are you sure you want to delete this post? All of data will be permanently removed. This action cannot be undone.";
const PinDetail = ({ user }) => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();
  // const [comment, setComment] = useState('');
  // const [addingComment, setAddingComment] = useState(false);

  const getPost = async () => {
    try {
      const post = await fetchPostDetails(postId)
      setPost(post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost()
  }, [postId]);

  // const addComment = () => {
  //   if (comment) {
  //     setAddingComment(true);

  //     client
  //       .patch(pinId)
  //       .setIfMissing({ comments: [] })
  //       .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
  //       .commit()
  //       .then(() => {
  //         fetchPinDetails();
  //         setComment('');
  //         setAddingComment(false);
  //       });
  //   }
  // };

  const onDeletePost = async () => {
    try {
      await deletePost(postId)
      setShowDeletePopup(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return <Spinner message="Showing pin" />;
  }

  return (
    <div className="flex-grow mb-8 pb-20">
      <article>
        <header className="pt-6 lg:pb-10">
          <div className="space-y-1 text-center">
            <dl className="space-y-10">
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base leading-6 font-medium text-gray-500">
                  <time dateTime="Friday, May 15, 2020">
                    Friday, May 15, 2020
                  </time>
                </dd>
              </div>
            </dl>
            <div>
              <h1 className="text-1xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
                {post.title}
              </h1>
            </div>
          </div>
        </header>
        <div
          className="divide-y lg:divide-y-0 divide-gray-200 pb-8 "
          style={{ gridTemplateRows: "auto 1fr" }}
        >
          <div className="pt-6 pb-10 lg:pt-11 lg:border-b lg:border-gray-200 flex items-center justify-between ">
            <span className="text-gray-900">Author: {post.posted_by}</span>
            {user && user.sub === post.user_id && (
              <div className="action">
                <Link to={`/update-post/${post.id}`}>
                <button
                  type="button"
                  className="bg-white px-4 py-2 rounded-lg  outline-none shadow-md text-purple-500 hover:text-purple-600 mr-4"
                >
                  Update
                </button>
                </Link>
                <button
                  type="button"
                  className="bg-[#243c5a] px-4 py-2 rounded-lg  outline-none shadow-md text-white "
                  onClick={() => setShowDeletePopup(true)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="divide-y divide-gray-200 lg:pb-0 lg:col-span-3 lg:row-span-2">
            <div className="mb-8 rounded relative overflow-hidden h-[400px]">
              <img
                className="absolute top-0 left-0 w-full h-full object-contain object-center"
                src={post.image_link}
                alt=""
              />
            </div>
            <div
              className="prose max-w-none pt-10 pb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
        </div>
        <Link to={"/"}>
          <span className="text-purple-500 hover:text-purple-600">
            ← Back to the blog
          </span>
        </Link>
      </article>
      {showDeletePopup && (
        <Modal
          onRejectBtn={setShowDeletePopup}
          onAcceptBtn={onDeletePost}
          messageHeader={messageHeader}
          messageBody={messageBody}
        />
      )}
    </div>
  );
};

export default PinDetail;
