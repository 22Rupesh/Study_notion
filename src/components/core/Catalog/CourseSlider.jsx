// import React from 'react'

// import {Swiper, SwiperSlide} from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'

// import Course_Card from './Course_Card'

// const CourseSlider = ({Courses}) => {
//   return (
//     <>
//       {Courses?.length ? (
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={25}
//           loop={true}
//           modules={[FreeMode, Pagination]}
//           breakpoints={{
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//           className="max-h-[30rem]"
//         >
//           {Courses?.map((course, i) => (
//             <SwiperSlide key={i}>
//               <Course_Card course={course} Height={"h-[250px]"} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p className="text-xl text-richblack-5">No Course Founds</p>
//       )}
//     </>
//   )
// }

// export default CourseSlider




import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'
import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {
        Courses?.length ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
            Pagination={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
            }}
            className="max-h-[30rem]"
          >
            {
              Courses?.map((course, i) => (
                <SwiperSlide key={i}>
                  <Course_Card course={course} Height={"h-[250px] "} />
                </SwiperSlide>

              ))
            }
          </Swiper>
        ) : (
          <p>No coure Founds</p>
        )
      }
    </>
  )
}

export default CourseSlider