import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from "../components/core/AboutPage/Stats"
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from "../components/common/Footer"
import ReviewSlider from '../components/common/ReviewSlider'


export const About = () => {
  return (
    <div className='mt-[100px] text-white '>
      {/* section 1 */}
      <section>
        <div>
          <header>
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className='flex gap-x-3'>
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section>
        <div>
          <Quote />
        </div>
      </section>

      {/* section 3 */}
      <section>
        <div className='flex flex-col'>
          {/* founding story wala div */}
          <div className='flex'>
            {/* founding story left box */}
            <div>
              <h1>
                Our Founding Story
              </h1>
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p>
              As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            {/* founding story right box */}
            <div>
              <img 
              src={FoundingStory}
              alt=''
              className='shadow-[0_0_20px_0] shadow-[#FC6767] '
              />
            </div>
          </div>
          {/* vision and mission wala div */}
          <div className='flex'>
            {/* vision wala div -left box */}
            <div>
              <h1>
                Our Vision
              </h1>
              <p>
                with this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combined cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
              </p>
            </div>
            {/* mission wala div- right box */}
            <div>
              <h1>
                Our Mission
              </h1>
              <p>
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learning, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <StatsComponent/>

      {/* section 5 */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid/>
        <ContactFormSection/>
      </section>

      <section>
        <div>
          Reviews from other learners
          <ReviewSlider/>

        </div>
      </section>
      <Footer/>
    </div>
  )
}
