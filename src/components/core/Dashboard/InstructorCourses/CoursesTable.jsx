import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Tbody, Td, Th, Thead, Tr} from 'react-super-responsive-table';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../../common/ConfirmationModal';
// import { deleteCourse } from '../../../../../server/controllers/Course';
// import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"

import { setCourse } from '../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';


// ../../../../../server/controllers/Course


const CoursesTable = ({courses, setCourses}) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);



  const handleCourseDelete = async(courseId)=>{
      setLoading(true);
      console.log("courseid",courseId);
      await deleteCourse({courseId:courseId},token);
      const result = await fetchInstructorCourses(token);
      if(result){
        setCourses(result);
      }
      setConfirmationModal(null);
      setLoading(false);
  }


  return (
    <div className='text-white'>

      <Table>
        <Thead>
          <Tr>
            <Th>
              Courses
            </Th>
            <Th>
              Duration
            </Th>
            <Th>
              Price
            </Th>
            <Th>
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            courses.length === 0 ? (
              <Tr>
                <Td>
                  No Courses Found
                </Td>
              </Tr>
            )
            :(
              courses?.map((course)=>(
                <Tr key={course.id} className="flex gap-x-10 border-richblack-800 p-8">
                  <Td className="flex gap-x-4">
                    <img
                      src={course?.thumbnail}
                      className='h-[150px] w-[220px] rounded-lg object-cover '
                    />

                    <div className='flex flex-col '>
                      <p>{course.courseName}</p>
                      <p>{course.courseDescription}</p>
                      <p>Created:</p>
                      {
                        course.status === COURSE_STATUS.DRAFT ? (
                          <p className="text-red-50 ">DRAFTED</p>
                        )
                        :(
                          <p className="text-yellow-50">PUBLISHED</p>
                        )
                      }
                    </div>
                  </Td>

                  <Td>
                    2hr 30min
                  </Td>
                  <Td>
                    ${course.price}
                  </Td>
                  <Td>
                    <button
                    disabled={loading}
                    onClick={()=>{
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    >
                      EDIT
                    </button>
                    <button
                    disabled={loading}
                    onClick={()=>{
                      setConfirmationModal({
                        text1:"Do you eant to delete this course br deleted",
                        text2:"All the date related to this course will be deleted",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler: !loading ? ()=>handleCourseDelete(course._id):()=>{},
                        btn2Handler: !loading ? ()=>setConfirmationModal(null):()=>{},
                      })
                    }}
                    >
                      Delete
                    </button>
                  </Td>
                </Tr>
              ))
            )
          } 
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </div>
  )
}

export default CoursesTable