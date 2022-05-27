import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import { fetchPostDetails, createPost, updatePost } from "../service/posts";

const CreatePin = ({ user, categories }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [content, setContent] = useState("");
  const [valueTextEditor, setValueTextEditor] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams();
  useEffect(() => {
    if (postId) {
      getPost();
    }
  }, [postId]);

  const getPost = async () => {
    try {
      const post = await fetchPostDetails(postId);
      const { category_id, content, description, image_link, title } = post;
      setCategory(category_id);
      setContent(content);
      setDescription(description);
      setImageLink(image_link);
      setTitle(title);
      setValueTextEditor(content);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  const savePost = async () => {
    if (title && valueTextEditor && category) {
      try {
        if (!postId) {
          const post = {
            title,
            content: valueTextEditor,
            description: description,
            image_link: imageLink,
            posted_by: user.nickname,
            category_id: +category,
            created_at: new Date(),
            user_id: user.sub,
          };

          await createPost(post);
          navigate("/");
        } else {
          const post = {
            title,
            content: valueTextEditor,
            description: description,
            image_link: imageLink,
            category_id: +category,
          };
          await updatePost(post, postId);
          navigate("/");
        }
      } catch (error) {
        alert("Some thing went wrong");
      }
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please add all fields.
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <div className="col-span-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add your title"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows="3"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Tell everyone what your Post is about"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="col-span-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image Link
            </label>
            <input
              id="image"
              type="text"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="Add a image link"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Choose Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="others" className="sm:text-bg bg-white">
                Select Category
              </option>
              {categories.map((item) => (
                <option
                  className="text-base border-0 outline-none capitalize bg-white text-black "
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>

            <div className="content py-5 col-span-6">
              {/* <p className="mb-2 font-semibold text:lg sm:text-xl">Content</p> */}
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content
              </label>
              <Editor
                id="content"
                initialValue={content}
                onEditorChange={(newText) => setValueTextEditor(newText)}
                init={{
                  plugins: "lists link image paste help wordcount",
                  toolbar:
                    "undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
                }}
              />
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePost}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
