import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {

  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const { editCourse, course } = useSelector((state) => state.course)






  useEffect(() => {
    if (editCourse) {
      setRequirementList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementList])







  const handleAddRequirement = () => {
    if (requirement) {
      // requirementList is current data, requirement is a data which insert by user- when data nserted then current data become empty
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  }


  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementList]
    updatedRequirements.splice(index, 1)
    setRequirementList(updatedRequirements)
  }

  return (
    <div>
      <label htmlFor={name}>{label}<sup>*</sup></label>
      <div>
        <input
          type='text'
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className='w-full text-richblack-500'
        />
        <button
          type='button'
          onClick={handleAddRequirement}
          className='font-semibold text-yellow-50'
        >
          Add
        </button>
      </div>
      {
        requirementList.map((requirement, index) => {
          return (
            <li key={index} >
              <span>{requirement} </span>
              <button className='text-xs text-pure-grey' onClick={() => handleRemoveRequirement(index)}>
                clear
              </button>
            </li>
          );
        })
      }

    </div>
  )
}

export default RequirementField;
