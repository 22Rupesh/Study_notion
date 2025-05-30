import React from 'react'
import * as Icons from "react-icons/vsc"
// import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { matchPath } from "react-router-dom";

 const SidebarLink = ({link, iconName}) => {



  const Icon = Icons[iconName] || Icons["VscQuestion"];
  // use of location - for set the background color of selected sidebar
  const location = useLocation();
  // const dispatch = useDispatch();

  const matchRoute = (route) => {
    if (!route || typeof route !== "string") return false;
    return matchPath({ path: route }, location.pathname)
  }



  return (
    <NavLink 
    to={link.path}
    className={`relative px-8 py-2 text-sm font-medium ${
      matchRoute(link.path)
        ? "bg-yellow-800 text-yellow-50"
        : "bg-opacity-0 text-richblack-300"
    } transition-all duration-200`}
    >
    <span className={`relative left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ?"opacity-100":"opacity-0"} `}>

    </span>

    <div>
      <Icon className="text-lg" />
      <span>{link.name} </span>
    </div>

    </NavLink>
  )
}

export default SidebarLink