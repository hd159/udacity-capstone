import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import logo from "../assets/logo.png";
import {getCategories} from "../service/categories";

export const CategoriesContext = React.createContext();

const Home = ({permissions, user}) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  const fetchCategories = async () => {
    try {
        const categories = await getCategories()
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial fixed">
        <Sidebar user={user && user} categories={categories} permissions={permissions} />
      </div>
      <div className="w-[250px] hidden md:flex h-screen flex-initial"></div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?.sub}`}>
            <img
              src={user?.picture}
              alt="user-pic"
              className="w-9 h-9 rounded-full "
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar
              closeToggle={setToggleSidebar}
              user={user && user}
              categories={categories}
              permissions={permissions}
            />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen " ref={scrollRef}>
        <CategoriesContext.Provider value={{categories, fetchCategories}}>
          <Routes>
            <Route
              path="/user-profile/:userId"
              element={
                user ? <UserProfile user={user && user} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/*"
              element={<Pins user={user && user} categories={categories} permissions={permissions} />}
            />
          </Routes>
        </CategoriesContext.Provider>
        
      </div>
    </div>
  );
};

export default Home;
