


import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { useParams } from 'react-router-dom';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';

const Catalog = () => {


  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1)


  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id =
        res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCategoryId(category_id);
    }
    getCategories();
  }, [catalogName]);



  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
      }
      catch (error) {
        console.log(error)
      }
    }
    if (categoryId) {
      getCategoryDetails();
    }

  }, [categoryId]);




  return (
    <div className='text-yellow-50'>


      <div>
        <p>
          {`Home / Catalog /`}
          <span className="text-yellow-25">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
        <p>
          {catalogPageData?.data?.selectedCategory?.name}
        </p>
        <p>
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>

      <div>
        {/* section 1 */}
        <div>
          <div>Courses to get you Started</div>
          <div>
            <p
              className={`px-4 py-2 ${
                active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
              } cursor-pointer
              `}
              onClick={()=> setActive(1)}
            >
              Most Popular
            </p>
            <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
              New
            </p>
          </div>
          <div>
            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
          </div>

        </div>
        {/* {section 2} */}
        <div>
          <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name} </p>
          <div className='text-white'>
            <p>sab badiya</p>
            <CourseSlider
              Courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>

        {/* section 3 */}
        <div>
          <div>Frequently Bought Together</div>
          <div className='py-8'>

            <div className='grid grid-cols-1 lg:grid-cols-2'>

              {
                catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                  <Course_Card course={course} key={index} Height={"h-[400px]"} />
                ))
              }

            </div>

          </div>
        </div>
      </div>


      <Footer />


    </div>
  )
}

export default Catalog