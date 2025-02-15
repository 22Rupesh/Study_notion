import React from 'react'
import { Link } from 'react-router-dom';
import Footer from "../components/common/Footer"
import { FaArrowRight } from "react-icons/fa"
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import TimelineSection from "../components/core/HomePage/TimelineSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ReviewSlider from '../components/common/ReviewSlider'
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"

export const Home = () => {
  return (
    <div >
      {/*Section1  */}
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
        <Link to={"/signup"}>
          <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-7'>
          Empower Your Future Goal With
          <HighlightText text={" Coding Skills"} />
        </div>

        <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 '>
          With our online coding courses, you can learn at your own peace, from anywhere in the world, and get access ti a wealth of resourse, including hands-on project, quizzes and personalized feedback from Instructors.
        </div>

        <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className='mx-3 my-12 shadow-blue-200'>
          <video
            muted
            loop
            autoPlay
          >
            <source src={Banner} type='video/mp4' />

          </video>
        </div>

        {/* Code Section 1 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>


        {/* Code Section 2 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
          
          <ExploreMore/>

      </div>


      {/*Section2  */}
      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[333px]'>

          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-1 mx-auto'>
            <div className='h-[130px] '></div>

            <div className='flex flex-row gap-2 text-white'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex flex-row gap-2 items-center'>
                  Explore All Catalog
                  <FaArrowRight />
                </div>

              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>
                  Learn more
                </div>
              </CTAButton>

            </div>

          </div>
        </div>

        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
          <div className='flex flex-row gap-3 mb-10 mt-[-100px] justify-between gap-7 lg:mt-20 flex-row lg:gap-0 '>
            <div className='text-4xl font-semibold w-[45%]'>
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>
          {/* Timeline Section - Section 2 */}
          <TimelineSection />
          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>

      </div>

      {/*Section3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

            <InstructorSection/>

            <h2 className='text-center text-4xl font-semibold mt-10'>review from Other Learners</h2>
            {/* Review Slider here */}
            <ReviewSlider/>

      </div>

      {/*Footer  */}
      <Footer/>
    </div>
  )
}
// export default Home; 
