import {  Navigate } from "react-router-dom";

export const PERMISSIONS = {
  CREATE_POST: "post:post",
  UPDATE_POST: "patch:post",
  DELETE_POST: "delete:post",
  CREATE_CATEGORY: "post:category",
  UPDATE_CATEGORY: "patch:category",
  DELETE_CATEGORY: "delete:category",
  MANAGE_CATEGORIES: "manage:categories",
};

let userPermissions = null

export function parseJwt() {
  const token = localStorage.getItem("token") || null;
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    userPermissions = JSON.parse(jsonPayload).permissions

    return JSON.parse(jsonPayload);
  }
}

export function PrivateRoute({ children, redirectTo, permission }) {
  let isAuthenticated = false;
  console.log(userPermissions);
    if (userPermissions) {
      if (userPermissions.includes(permission)) {
        isAuthenticated = true;
      }
    }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
