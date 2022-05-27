import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PERMISSIONS } from "../auth/auth";

import {
  Navbar,
  Feed,
  PinDetail,
  CreatePin,
  Search,
  ManageCategory,
} from "../components";

const Pins = ({ user, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed categories={categories} />} />
          <Route
            path="/category/:categoryId"
            element={<Feed categories={categories} />}
          />
          <Route
            path="/posts/:postId"
            element={<PinDetail user={user && user} />}
          />

          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />

          <Route
            path="/create-post"
            element={
              <PrivateRoute redirectTo="/" permission={PERMISSIONS.CREATE_POST}>
                <CreatePin user={user && user} categories={categories} />
              </PrivateRoute>
            }
          />

          <Route
            path="/update-post/:postId"
            element={
              <PrivateRoute redirectTo="/" permission={PERMISSIONS.UPDATE_POST}>
                <CreatePin user={user && user} categories={categories} />
              </PrivateRoute>
            }
          />

          <Route
            path="/manage-category"
            element={
              <PrivateRoute
                redirectTo="/"
                permission={PERMISSIONS.MANAGE_CATEGORIES}
              >
                <ManageCategory user={user && user} categories={categories}/>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
