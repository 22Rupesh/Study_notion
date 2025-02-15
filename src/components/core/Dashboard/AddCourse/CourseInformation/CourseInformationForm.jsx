import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { useForm } from 'react-hook-form';
// import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementField from "./RequirementField"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { setStep, setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import toast from 'react-hot-toast';
import { COURSE_STATUS } from "../../../../../utils/constants"

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      // setLoading(true);
      const categories = await fetchCourseCategories();
      console.log("category details ", categories)

      if (categories?.length > 0) {
        console.log("categories", categories)
        setCourseCategories(categories);
      }
      console.log("length is ", categories.length)
      // setLoading(false);
    }

    if (editCourse) {
      setValue("courseTitle", course?.courseName);
      setValue("courseShortDesc", course?.courseDescription);
      setValue("coursePrice", course?.price);
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course?.whatYouWillLearn);
      setValue("courseRequirements", course?.instruction);
      setValue("courseImage", course?.thumbnail);
      setValue("courseCategory", course?.category);
    }
    getCategories();
  }, [])



  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.courseTitle !== course?.courseName ||
      currentValues.courseShortDesc !== course?.courseDescription ||
      currentValues.coursePrice !== course?.price ||
      JSON.stringify(currentValues.courseTags || []) !== JSON.stringify(course?.tag || []) ||
      currentValues.courseBenefits !== course?.whatYouWillLearn ||
      JSON.stringify(currentValues.courseRequirements || []) !== JSON.stringify(course?.instruction || []) ||
      (currentValues.courseCategory?._id || "") !== (course?.category?._id || "") ||
      currentValues.courseImage !== course?.thumbnail
    ) {
      return true;
    }

    return false;
  };



//   const onSubmit = async (data) => {
//     console.log("data is ", data)

//     if (editCourse) {


//       if (isFormUpdated()) {
//         const currentValues = getValues();
//         const formData = new FormData();

//         formData.append("courseId", course._id);

//         if (currentValues.courseTitle !== course.courseName) {
//           formData.append("courseName", data.courseTitle);
//         }

//         if (currentValues.courseShortDesc !== course.courseDescription) {
//           formData.append("courseDescription", data.courseShortDesc);
//         }

//         if (currentValues.coursePrice !== course.price) {
//           formData.append("price", data.coursePrice);
//         }

//         // if (currentValues.courseTags.toString() !== course?.tag.toString()) {
//         //   formData.append("tag", JSON.stringify(data.courseTag))
//         // }


//         // ✅ Fix: Ensure `currentValues.courseTags` and `course?.tag` are always arrays before `.toString()`
//         const currentTags = Array.isArray(currentValues.courseTags) ? currentValues.courseTags.map(tag => new mongoose.Types.ObjectId(tag)) : [];
// const oldTags = Array.isArray(course?.tag) ? course.tag.map(id => id.toString()) : [];

// if (JSON.stringify(currentTags.map(id => id.toString())) !== JSON.stringify(oldTags)) {
//   formData.append("tag", JSON.stringify(currentTags));  // ✅ Convert to ObjectIds
// }



//         if (currentValues.courseBenefits !== course.whatYouWillLearn) {
//           formData.append("whatYouWillLearn", data.courseBenefits);
//         }

//         // if (currentValues.courseRequirements.toString() !== course.instruction.toString()) {
//         //   formData.append("instruction", JSON.stringify(data.courseRequirements));
//         // }




//                     // ✅ Fix: Ensure `course.instruction` is an array before calling `.toString()`
//                     const currentInstructions = Array.isArray(currentValues.courseRequirements) ? currentValues.courseRequirements : [];
//                     const oldInstructions = Array.isArray(course?.instruction) ? course.instruction : [];
        
//                     if (JSON.stringify(currentInstructions) !== JSON.stringify(oldInstructions)) {
//                         formData.append("instruction", JSON.stringify(currentInstructions));
//                     }



//         if (currentValues.courseCategory !== course.category) {
//           formData.append("category", data.courseCategory);
//         }
//         if (currentValues.courseImage !== course.thumbnail) {
//           formData.append("thumbnailImage", data.courseImage)
//         }
//         // setLoading(true);
//         const result = await editCourseDetails(formData, token);
//         // setLoading(false);
//         if (result) {
//           dispatch(setStep(2));
//           dispatch(setCourse(result));
//         }
//       }
//       else {
//         toast.error("NO changes made to be form")
//       }
//       return;
//     }

//     // create a new course
//     const formData = new FormData();
//     formData.append("courseName", data?.courseTitle)
//     formData.append("courseDescription", data.courseShortDesc)
//     formData.append("price", data.coursePrice)
//     formData.append("tag", JSON.stringify(data.courseTags))
//     formData.append("whatYouWillLearn", data.courseBenefits)
//     formData.append("category", data.courseCategory)
//     formData.append("status", COURSE_STATUS.DRAFT)
//     formData.append("instructions", JSON.stringify(data.courseRequirements))
//     formData.append("thumbnailImage", data.courseImage)

//     // setLoading(true);
//     const result = await addCourseDetails(formData, token);
//     if (result) {
//       console.log("yaha aa gye");
//       dispatch(setStep(2))
//       console.log("result", result);
//       dispatch(setCourse(result.data))
//     }
//     // setLoading(false)

//   }

const onSubmit = async (data) => {
  console.log("data is ", data);

  if (editCourse) {
      if (isFormUpdated()) {
          const currentValues = getValues();
          const formData = new FormData();

          formData.append("courseId", course._id);

          if (currentValues.courseTitle !== course.courseName) {
              formData.append("courseName", data.courseTitle);
          }

          if (currentValues.courseShortDesc !== course.courseDescription) {
              formData.append("courseDescription", data.courseShortDesc);
          }

          if (currentValues.coursePrice !== course.price) {
              formData.append("price", data.coursePrice);
          }

          // ❌ Remove `tag` since it's no longer in the schema
          // if (currentValues.courseTags.toString() !== course?.tag.toString()) {
          //     formData.append("tag", JSON.stringify(data.courseTag));
          // }

          if (currentValues.courseBenefits !== course.whatYouWillLearn) {
              formData.append("whatYouWillLearn", data.courseBenefits);
          }

          const currentInstructions = Array.isArray(currentValues.courseRequirements)
              ? currentValues.courseRequirements
              : [];
          const oldInstructions = Array.isArray(course?.instruction) ? course.instruction : [];

          if (JSON.stringify(currentInstructions) !== JSON.stringify(oldInstructions)) {
              formData.append("instruction", JSON.stringify(currentInstructions));
          }

          if (currentValues.courseCategory !== course.category) {
              formData.append("category", data.courseCategory);
          }

          if (currentValues.courseImage !== course.thumbnail) {
              formData.append("thumbnailImage", data.courseImage);
          }

          const result = await editCourseDetails(formData, token);
          if (result) {
              dispatch(setStep(2));
              dispatch(setCourse(result));
          }
      } else {
          toast.error("No changes made to the form");
      }
      return;
  }

  // ✅ Remove `tag` while creating a new course
  const formData = new FormData();
  formData.append("courseName", data?.courseTitle);
  formData.append("courseDescription", data.courseShortDesc);
  formData.append("price", data.coursePrice);
  formData.append("whatYouWillLearn", data.courseBenefits);
  formData.append("category", data.courseCategory);
  formData.append("status", COURSE_STATUS.DRAFT);
  formData.append("instructions", JSON.stringify(data.courseRequirements));
  formData.append("thumbnailImage", data.courseImage);

  const result = await addCourseDetails(formData, token);
  if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result.data));
  }
};



  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
      >
        <div>
          <label className="text-sm text-richblack-5" htmlFor="courseTitle">Course Title <sup>*</sup></label>
          <input
            id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle", { required: true })}
            className='w-full text-richblack-900'
          />
          {
            errors.courseTitle && (
              <span>Course Title is Required</span>
            )
          }
        </div>

        <div>
          <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">Course Short Description<sup>*</sup></label>
          <textarea
            id='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseShortDesc", { required: true })}
            className='min-h[140px] w-full text-richblack-900 '
          />
          {
            errors.courseShortDesc && (<span>
              Course Description is required**
            </span>)
          }
        </div>

        <div className='relative'>
          <label className="text-sm text-richblack-5" htmlFor="coursePrice">Course Price <sup>*</sup></label>
          <input
            id='coursePrice'
            placeholder='Enter Course Price'
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className='w-full text-richblack-900'
          />
          <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400' />
          {
            errors.coursePrice && (
              <span>Course Price is Required</span>
            )
          }
        </div>

        <div className='text-richblack-5'>
          <label className="text-sm text-richblack-5" htmlFor="courseCategory">Course Category<sup>*</sup></label>
          <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled>Choose a Category</option>
            {
              courseCategories?.map((category, indx) => (
                <option key={indx} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is required
            </span>
          )}
        </div>

        {/* create a custom component for handling tags input */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
        {/* Course Thumbnail Image */}
        <Upload
          name="courseImage"
          label="courseImage"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        <div>
          <label>Benefits of the course<sup>*</sup></label>
          <textarea
            id='coursebenefits'
            placeholder='Enter Benefits of the course'
            {...register("courseBenefits", { required: true })}
            className='min-h-[130px] w-full text-richblack-900'
          />
          {errors.courseBenefits && (
            <span>
              Benefits of the course is required**
            </span>
          )}
        </div>
        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              // disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Wihout Saving
            </button>
          )}
          {/* <IconBtn
            // disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}
            
          >
            
            <MdNavigateNext />
          </IconBtn> */}

          <IconBtn text={!editCourse ? "Next" : "Save Changes"} type="submit">
            <MdNavigateNext />
          </IconBtn>

        </div>

      </form>
    </div>
  )
}


export default CourseInformationForm


