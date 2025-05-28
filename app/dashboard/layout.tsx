"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addValue } from "@/redux/features/incrementSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import {
  Home,
  User,
  FileIcon,
  Settings,
  Moon,
  Sun,
  LogOut,
  Bell,
  Globe,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ReduxProvider } from "../ReduxProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const { Value } = useSelector((state: RootState) => state.incrementSlice);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // User information - you might want to get this from your auth system
  const userName = "SP"; // Default value
  const userImageSrc = "/path/to/profile.jpg"; // Default value

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setAuthenticated(true);
      
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    
  };

  const handleSubmit = () => {
    dispatch(addValue(!Value));
  };

  if (!authenticated) return null;

  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <div className="w-2/12 h-screen flex flex-col border-r border-gray-300">
        <div className="px-4 py-6">
          <h1 className="text-lg font-semibold">Welcome</h1>
        </div>
        <ul className="space-y-4 px-4">
          {[
            { href: "/dashboard/home", icon: <Home />, text: "Home" },
            { href: "/dashboard/user-management", icon: <User />, text: "Management" },
            { href: "/dashboard/file", icon: <FileIcon />, text: "file" },
            { href: "/dashboard/seting/", icon: <Settings />, text: "Setting" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-300 transition-colors"
              >
                {React.cloneElement(item.icon, {
                  className: "h-5 w-5 text-gray-600 group-hover:text-purple-400",
                })}
                <span className="text-gray-700 group-hover:text-purple-400">
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
           <button onClick={handleLogout} className=" flex  items-center gap-3 rounded-md ml-3 hover:bg-red-400 w-full h-10"> < LogOut />logout</button>
        </ul>
      </div>

      {/* Main Content */} 
      <div className={`w-10/12 h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
        <header className="flex justify-between items-center w-full p-3 md:p-4 border-b border-blue-300">
          {/* Add a site name/logo on the left side */}
          <div className="flex items-center">
            <span className="font-bold text-gray-800 dark:text-gray-200 hidden sm:block">ACL teacnologi</span>
          </div>
          
          {/* Right side header elements */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              aria-label="Visit website" 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-purple-400" />
            </button>
            
            <button
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? (
                <Sun size={24} className="text-gray-300 w-5 h-5" />
              ) : (
                <Moon size={24} className="text-gray-800 w-5 h-5" />
              )}
            </button>
            
            <button 
              aria-label="Notifications" 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Bell size={24} className="text-gray-600 dark:text-gray-300 w-5 h-5" />
            </button>
            
            <Avatar className="inline-flex items-center justify-center rounded-full overflow-hidden select-none bg-gray-100 w-8 h-8 md:w-10 md:h-10">
              <AvatarImage
                className="w-full h-full object-cover"
                src={userImageSrc}
                alt={`${userName}'s profile`}
              />
              <AvatarFallback className="bg-red-500 text-white flex items-center justify-center w-full h-full font-bold">
                {userName}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        <main className="flex-1 p-4 md:p-6 bg-white dark:bg-gray-900 dark:text-gray-100 overflow-y-auto">

          <ReduxProvider>
            {children}
          </ReduxProvider>
          

        </main>
      </div>
    </div>
  );
}