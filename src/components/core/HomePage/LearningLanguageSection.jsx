import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../../../components/core/HomePage/Button";
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col gap-5'>
          <div className='text-4xl font-semibold text-center my-10'>
            Your Swiss Knife for
            <HighlightText text={"learning any language"} linkto={"/signup"}/>
            <div className='text-center text-richblack-700 font-medium w-[75%] mx-auto leading-6 text-base mt-3'>
              Using spin making learning multiple languages easy. with 20+ language realistic voice-overm, progress tracking, custom schedule and more..
            </div>
            <div className='flex flex-row items-center justify-center mt-5'>
              <img
              src={know_your_progress}
              alt=''
              className='object-contain lg:-mr-32'
              />
              <img
              src={Compare_with_others}
              alt=''
              className='object-contain lg:-mr-32'
              />
              <img
              src={Plan_your_lessons}
              alt=''
              className='object-contain lg:-mr-32'
              />
            </div>
          </div>
          <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
