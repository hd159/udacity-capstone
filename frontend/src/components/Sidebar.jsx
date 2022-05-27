import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
import { PERMISSIONS } from "../auth/auth";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle, user, categories, permissions }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll w-[250px] hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover cateogries
          </h3>
          {categories &&
            categories.map((category) => (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
                key={category.name}
              >
                <img
                  src={category.image_link}
                  className="w-8 h-8 rounded-full shadow-sm"
                  alt={category.name}
                />
                {category.name}
              </NavLink>
            ))}
          <div className="mt-2 px-5 py-3 text-base 2xl:text-xl border-t-2">
            {permissions && permissions.includes(PERMISSIONS.MANAGE_CATEGORIES) &&
              <Link
                to={`manage-category`}
                className="flex items-center justify-center rounded-md border border-transparent bg-mainColor py-3 font-medium shadow-sm hover:bg-secondaryColor"
              >
                Manage Categories
              </Link>
            }
          </div>
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user.sub}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.picture}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.nickname}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;