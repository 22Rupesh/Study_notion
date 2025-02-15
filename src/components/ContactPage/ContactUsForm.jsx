import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import { setLoading } from '../../slices/authSlice';
import CountryCode from "../../data/countrycode.json"

 const ContactUsForm = () => {



  // const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful}
  } = useForm()

  const submitContactForm = async(data)=>{
    console.log("Logging Data", data);
    try{
      setLoading(true);
      // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      const response = {status:"OK"}
      console.log("Logging response", response);
      setLoading(false);
    }
    catch(error){
      console.log("Error", error.message);
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstname:"",
        lastname:"",
        message:"",
        phoneNo:"",
      })
    }
  },[reset, isSubmitSuccessful])




  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

      <div>
        {/* first Name \ */}
        <div>
          <label htmlFor='firstname'>First Name</label>
          <input
            type='text'
            name='firstname'
            id='firstname'
            placeholder='Enter first Name'
            className='text-black'
            {...register("firstname", {required:true})}
          />
          {
            errors.firstname && (
              <span>
                Please enter your Name
              </span>
            )
          }
        </div>
        {/* last Name */}
        <div>
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            name='lastname'
            id='lastname'
            placeholder='Enter Last Name'
            className='text-black'
            {...register("lastname")}
          />
        </div>

        {/* email */}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter email Address'
          className='text-black'
          {...register("email", {required:true})}
        />
        {
          errors.email && (
            <span>
              Please Enter Your Email Address
            </span>
          )
        }
        </div>

        {/* Phone no. */}

          <div className='flex flex-col'>
            <label htmlFor="phonenumber">Phone Number</label>
            <div className='flex flex-row gap-5'>
              {/* drop down */}
              <div>
                <select
                  name='dropdown'
                  id='dropdown'
                  {...register("countrycode", {required:true})}
                >
                  {
                    CountryCode.map((element, index)=>{
                      return (
                        <option key={index} value={element.code}>
                          {element.code}-{element.country}
                        </option>
                      )
                    })
                  }
                </select>
              </div>

              <div>
                <input
                  type='number'
                  name='phonenumber'
                  id='phonenumber'
                  placeholder='12345 67890'
                  className='text-black'
                  {...register("phoneNo",
                    {
                      required:{value:true,message:"Please Enter Your Phone Number"},
                      maxLength:{value:10, message:"Invalid Phone Number"},
                      minLength:{value:8,message:"Invalid Phone Number"}
                    }
                  )}
                />
              </div>
            </div>
            {
              errors.phoneNo && (
                <span>
                  {errors.phoneNo.message}
                </span>
              )
            }
          </div>

        {/* message box */}
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name='messsage'
            id='message'
            cols="30"
            rows="7"
            placeholder='Enter Your Message here'
            className='text-black'
            {...register("message",{required:true})}
          />
                  {
          errors.message && (
            <span>
              Please Enter Your Message.
            </span>
          )
        }
        </div>
        {/* button */}
        <button type='submit'>
          Send message
        </button>
      </div>

    </form>
  )
}

export default ContactUsForm
