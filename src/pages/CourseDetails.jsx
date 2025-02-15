



import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import { useNavigate, useParams } from 'react-router-dom'
import Error from "./Error"
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import GetAvgRating from "../utils/avgRating"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { formatDate } from '../services/formatDate';
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import Footer from "../components/common/Footer"

const CourseDetails = () => {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)


  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [response, setResponse] = useState(null)


  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
        console.log("Printing course data", result)

      }
      catch (error) {
        console.log("Could not fetch courses data", error);
      }
    } 
    getCourseFullDetails()


  }, [courseId]
  );

  const [avgReviewCount, setAvgReviewCount] = useState(0);


  // // Collapse all
  const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  useEffect(() => {
    const count = GetAvgRating(courseData?.data?.CourseDetails?.ratingAndReviews);
    setAvgReviewCount(count)
  }, [courseData])



  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.SubSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [courseData])




  const handleBuyCourse = () => {
    console.log("Hello sir")
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }


  if (loading || !courseData) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    )
  }

  const {
    _id: course_id = "",
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData?.data?.courseDetails


  return (
    <div className='flex flex-col items-center text-white'>



      {/* <button className='bg-yellow-50 p-6 mt-15'
        onClick={() => handleBuyCourse()}
      >
        Buy Now
      </button> */}

      

      <div className='relative flex flex-row justify-start p-8'>

        

        <p>{courseName} </p>
        <p>{courseDescription} </p>
        <div>
          <span>{avgReviewCount} </span>
          <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
          <span>{`(${ratingAndReviews.length} reviews)`} </span>
          <span>{`(${studentsEnrolled.length} students enrolled)`} </span>
        </div>

        <div>
          <p>Created By {`${instructor.firstName}`} </p>
        </div>
        <div className='flex gap-x-3'>
          <p>Created At {formatDate(createdAt)} </p>
          <p>
            {" "} English
          </p>
        </div>
        <CourseDetailsCard
          course={courseData?.data?.courseDetails}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
        />
      </div>

      <div>
        <p>What you will Learn</p>
        <div>
          {whatYouWillLearn}
        </div>
      </div>

      <div className='flex gap-3'>
        <div>
          <p>Course Contents</p>
        </div>

        <span>{courseContent.length} <section>(s)</section> </span>

        <span>
          {totalNoOfLectures} lectures
        </span>
        <span>
          {courseData.data?.totalDuration} total length
        </span>
      </div>
      <div>
        <button
          className="text-yellow-25"
          onClick={() => setIsActive([])}
        >
          Collapse all sections
        </button>
      </div>
      <div>

      </div>
      {/* Course Details Accordion */}
      <div className="py-4">
        {courseContent?.map((course, index) => (
          <CourseAccordionBar
            course={course}
            key={index}
            isActive={isActive}
            handleActive={handleActive}
          />
        ))}
      </div>

      {/* Author Details */}
        <div className="mb-12 py-4">
        <p className="text-[28px] font-semibold">Author</p>
         <div className="flex items-center gap-4 py-4">
        <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
      


            <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}



    </div>
  )
}

export default CourseDetails