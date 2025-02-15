import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
// import SubSection from '../../../../../../server/models/SubSection';
import SubSectionModal from './SubSectionModal'
// import { deleteSection, } from '../../../../../../server/controllers/Section';
import { setCourse } from '../../../../../slices/courseSlice';
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import ConfirmationModal from "../../../../common/ConfirmationModal"

const NestedView = ({ handleChangeEditSectionName }) => {


  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);
  
  useEffect(()=>{
    console.log("Rendering it again")
  },[])

  const handleDeleteSection = async  (sectionId) => {

    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    console.log("PRINTING AFTER DELETION section", result)
    if(result){
      dispatch(setCourse(result))
    }
    setConfirmationModal(null);
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({subSectionId, sectionId, token});
    if(result){
      const updatedCourseContent = course.courseContent.map((section)=>
      section._id === sectionId ? result : section);
      const updatedCourse = {...course, courseContent: updatedCourseContent};
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  }

  useEffect(() => {

    console.log("Course Data in NestedView:", course);
  }, [course])
  // console.log("Section Data in NestedView:", section);
  return (
    <div>
      <p>aur bhai kyaa haal chall</p>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          <details key={section._id} open onClick={()=> console.log(section)}>

            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2" >
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
                <div className='flex items-center gap-x-3'>
                  <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                    edit
                  </button>

                  {/* delete */}

                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete this Section",
                        text2: "All the lecture in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null)
                      })
                    }}
                  >
                    delete
                  </button>
                  <span>|</span>
                  <IoIosArrowDropdownCircle />
                </div>


              </div>
            </summary>

            <div>
              {
                section?.SubSection?.map((data) => (
                  <div key={data?._id}
                    onClick={() => setViewSubSection(data)}
                    className='flex items-center justify-between gap-x-3 border-b-2'
                  >

                    <div className="flex items-center gap-x-3">
                      <RxDropdownMenu className="text-2xl text-richblack-50" />
                      <p className="font-semibold text-richblack-50">
                        {data.title}
                      </p>
                    </div>
                    <div

                    onClick={(e)=>e.stopPropagation()}
                      className='flex items-center gap-x-3'>

                      <button
                        onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Delete this Sub Section",
                            text2: "Selected lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          });
                        }}
                      >
                        Delete
                      </button>


                    </div>

                  </div>

                ))
              }
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus />
                <p>Add Lecture</p>

              </button>
            </div>

          </details>
        ))}
      </div>

      {/* Modal Rendering */}
      {addSubSection && <SubSectionModal modalData={addSubSection} setModalData={setAddSubsection} add={true} />}
      {viewSubSection && <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />}
      {editSubSection && <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default NestedView