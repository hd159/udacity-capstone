import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";

const BASE_DOMAIN = process.env.REACT_APP_BASE_DOMAIN;

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const onLogOut = () => {
    localStorage.clear();
    logout({ returnTo: BASE_DOMAIN })
  }
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 justify-between">
      <div className="flex justify-start items-center w-[60%] px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none border-none focus:border-none focus:outline-none focus:shadow-none focus:border-0 focus:ring-0"
        />
      </div>

      {!user && (
        <div className="flex items-center w-[40%] justify-end">
          <Link to="/login">
            <button className="px-5 py-2 mr-5 bg-[#3B82F6] text-white rounded-md">
              Login
            </button>
          </Link>
        </div>
      )}
      {user && (
        <div className="flex gap-3 ">
          <Link to={`user-profile/${user.sub}`} className="hidden md:block">
            <img
              src={user.picture}
              alt="user-pic"
              className="w-14 h-12 rounded-lg "
            />
          </Link>
          <Link
            to="/create-post"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
          <button className="px-5 py-2 bg-secondaryColor  rounded-md" type="button" onClick={onLogOut}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
