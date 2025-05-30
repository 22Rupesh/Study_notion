import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation, matchPath } from 'react-router-dom'
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux'
import ProfileDropdown from '../core/Auth/ProfileDropDown'
import { FaCaretDown } from "react-icons/fa6";
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
// import { ACCOUNT_TYPE } from '../../utils/constants'
// import axios from "axios";


// const subLinks = [
//   {
//     title: "python",
//     link: "catalog/python"
//   },
//   {
//     title: "web dev",
//     link: "catalog/web-development"
//   },
// ]

function Navbar() {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation()


  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false)



  const fetchSublinks = async () => {

    try {
      // CALL THE API-find all category list like python and development
      const result = await apiConnector("GET", categories.CATEGORIES_API)
      console.log("Printing Sublinks result: ", result);
      setSubLinks(result.data.data);
    }
    catch (error) {
      console.log("Could not fetch the category list", error);
    }

  }

  useEffect(() => {
    fetchSublinks();
  }, [])



  // useEffect(() => {
  //   ;(async () => {
  //     setLoading(true)
  //     try {
  //       const res = await apiConnector("GET", categories.CATEGORIES_API)
  //       setSubLinks(res.data.data)
  //     } catch (error) {
  //       console.log("Could not fetch Categories.", error)
  //     }
  //     setLoading(false)
  //   })()
  // }, [])



//  console.log("sub links", subLinks)



  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        <Link to="/">
          <img src={logo} width={160} height={42} loading='lazy'
            alt='' />
        </Link>

        {/* Nav Link */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              NavbarLinks.map((link, index) => (
                <li key={index}>


                  {
                    link.title === "Catalog" ? (


                      <>

                        <div className={`group relative flex cursor-pointer items-center gap-1 ${
                          matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          :"text-richblack-25"
                        }`}
                        >
                          <p>{link.title}</p>
                          <FaCaretDown />

                          <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] ' >

                            <div className='absolute left-[50%] top-0 translate-y-[-45%] translate-x-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5'>

                            </div>
                            {/* {
                          subLinks.length ? (
                            subLinks.map((subLinks, index)=>{
                              <Link to={`${subLinks.link}`} key={index}>
                                <p  className="text-black">{subLinks.title} </p>
                              </Link>
                            })
                          ) : (<div></div>)
                        } */}

                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : (subLinks && subLinks.length) ? (
                              <>
                                {subLinks
                                  // ?.filter(
                                  //   (subLink) => subLink?.courses?.length > 0
                                  // )
                                  ?.map((subLink, i) => (
                                    <Link
                                      to={`/catalog/${subLink.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()
                                        }`}
                                      className='rounde-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                                      key={i}
                                    >
                                      <p>{subLink.name}</p>
                                    </Link>
                                  ))
                                }
                              </>
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )
                            }

                          </div>


                        </div>

                      </>



                    ) : (
                      <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                          }`}>
                          {link.title}
                        </p>
                      </Link>
                    )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard */}
        <div className="flex items-center gap-x-4">
          {
            user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className='relative'>
                <FaCartArrowDown />
                {
                  totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign Up
                </button>
              </Link>
            )
          }
          <div className='text-white'>
            {
              token !== null && <ProfileDropdown />
            }
          </div>

        </div>

      </div>
    </div>
  )
}

export default Navbar
