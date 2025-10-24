import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userLogin, setUserLogin } = useContext(userContext);

  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    select: (res) => res?.data?.user,
  });


  return (
    <nav className="border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Social App
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center md:border-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userLogin !== null ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={data?.photo || "/default-avatar.png"}
                  alt="user avatar"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="z-50 absolute right-0 mt-2 w-56 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {data?.name || "User"}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {data?.email || "No email"}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/Profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/Login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={() => {
                          setUserLogin(null);
                          localStorage.removeItem("userToken");
                          setIsDropdownOpen(false);
                        }}
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <ul className="flex gap-4 text-white">
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
