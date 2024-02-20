import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { AlertConfirm } from "./AlertConfirm";
import { auth } from "@/firebase/config";
import { useToast } from "./ui/use-toast";
import { LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const user = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const confirmLogout = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          toast({
            title: "User successfully logged out",
            className: "text-white bg-slate-900",
            description: "Log in again to access our blog",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <nav className="bg-white border-gray-200 border-b shadow dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ImageMemoir
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
            <li>
              <NavLink
                to="home"
                className="block py-2 px-3 text-gray-900  rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                About
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink
                    to="new-post"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  >
                    New Post
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="dashboard"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <AlertConfirm
                    buttonContent={<LogOut />}
                    title="Are you sure about that?"
                    description="If you log out, you will need to log in with your credentials again"
                    onContinue={confirmLogout}
                  />
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
