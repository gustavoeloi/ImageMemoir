import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// import pages
import App from "./App.tsx";
import Home from "./pages/Home";
import About from "./pages/About";
import NewPost from "./pages/NewPost.tsx";
import Dashboard from "./pages/Dashboard.tsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import PostPage from "./pages/PostPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
      {
        path: "/post/:postId",
        element: <PostPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
