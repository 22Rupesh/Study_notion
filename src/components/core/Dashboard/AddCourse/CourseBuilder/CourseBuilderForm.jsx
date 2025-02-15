import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5";
// import NestedView from "./NestedView"
import { MdNavigateNext } from "react-icons/md"
import {useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from "./NestedView"



const CourseBuilderForm = () => {


  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { course } = useSelector((state) => state.course) 
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch();
  // const [loading,setLoading] = useState(false);
  const {token} = useSelector((state)=> state.auth);




  useEffect( ()=>{
    console.log("UPDATEdf");
  },[course])





  const onSubmit=async (data) =>{
    // setLoading(true);
    let result;
    // let results;
    console.log("Updating section with result:", data);
    // const courseId= course._id;
    if(editSectionName){

      // we are editing the section name
      result = await updateSection(
        {
          sectionName:data?.sectionName,
          sectionId:editSectionName,
          courseId:course._id,
        }, token
      )
      console.log("Updated result Data:", result); 
    }

    else{
      
      result = await createSection({
        sectionName: data?.sectionName,
        courseId: course._id,
      },token)
    }  
    console.log("Creating newwww section with data:", result);

  

    // update values

    // if(result){
    //   dispatch(setCourse(result));
    //   setEditSectionName(null);
    //   setValue("sectionName","");
    // }
    if(result){
      dispatch(setCourse(result.data
      ));
      setEditSectionName(null);
      setValue("sectionName","");
    }



    // laosding false

    // setLoading(false);

       
  }






  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goToNext=() =>{
    if(!course?.courseContent?.length===0){
      toast.error("Please add atleast one section")
      return 
    }
    if(course.courseContent.some((section)=> section.subSection?.length === 0)){
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }


  const handleChangedEditSectionName = (sectionId, sectionName)=>{

    if(editSectionName===sectionId){
      cancelEdit();
      return;
    }


    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section name <sup>*</sup></label>
          <input
            id='sectionName'
            placeholder='Add Section Name'
            {...register("sectionName", { required: true })}
            className='w-full text-richblack-800'
          />
          {
            errors.sectionName && (
              <span>Section Name is required</span>
            )
          }
        </div>
        <div className='mt-10 flex w-full'>
          <IconBtn
            type="submit"
            // disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white"}
          >
            <IoAddCircleOutline className='text-yellow-50' size={20} />

          </IconBtn>
          {editSectionName && (
            <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangedEditSectionName} />
      )}

      <div className='flex justify-end gap-5'>
        <button
          onClick={goBack}
          className='rounded-md cursor-pointer flex items-center'>
          Back
        </button>
        <IconBtn  text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>


    </div>
  )
}

export default CourseBuilderForm 