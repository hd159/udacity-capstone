import React from "react";
import { Link} from "react-router-dom";


const Pin = ({ post }) => {
  const {  description, id, title, created_at } = post;
  return (
    <div className="flex py-12">
      <div className=" w-[25%] h-14 flex-auto">
        <dd className="text-base leading-6 font-medium text-gray-500">
          <time dateTime={created_at}>{created_at}</time>
        </dd>
      </div>
      <div className=" w-[75%] flex-auto ">
        <div className="space-y-6">
          <h2 className="text-2xl leading-8 font-bold tracking-tight">
            <Link to={`/posts/${id}`}>
              <span className="text-grey-900">
                {title}
              </span>
            </Link>
          </h2>
          <div className="prose max-w-none text-gray-500">
            {description}
          </div>
        </div>
        <div className="text-base leading-6 font-medium pt-5">
          <Link to={`/posts/${id}`}>
            <span className="text-purple-500 hover:text-purple-600">
              Read more →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pin;
