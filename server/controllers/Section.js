
const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");


exports.createSection = async (req,res)=>{
    try{
        //data fetch
        const {sectionName, courseId} = req.body;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
                // message:"fdfgdfghgvv "
            })
        }
        // create Section
        const newSection = await Section.create({sectionName});
        // Update Course with Section Object ID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                        courseId,
                                        { 
                                            $push:{
                                                courseContent:newSection._id,
                                            }

                                        },
                                        {new:true},
         //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails
        ).populate({
            path:"courseContent",
            populate:{ path: "SubSection" }
        })
        // return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            data: updatedCourseDetails,
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            // message:"Unable to create Section, please try again",
            message:error.message
        })
    }
}




// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;

		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"SubSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};



//delete section


exports.deleteSection = async(req,res) =>{
    try{

        const {sectionId, courseId}=req.body
        await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId,
            }
        })
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section not found"
            })
        }
         await SubSection.deleteMany({_id:{$in: section.SubSection}});
        // await SubSection.deleteMany()


         await Section.findByIdAndDelete(sectionId);



        //  find the updated course and return 
        const course=await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"SubSection"
            }
        })
        .exec();

        res.status(200).json({
            success:true,
            message:"Section deleted",
            data:course
        })
        console.log("section data is ",course)

    }
    catch(error){
        console.error("Error deleting section", error);
        res.status(500).json({
            success:false,
            message:"Internal serverB error",
            error: error.message
        })
    }




    //     // get Id
    //     const {sectionId}  = req.body 
    //     // use findByIdAndDelete
    //     await Section.findByIdAndDelete(sectionId);
    //     //TODO: do we delete the enrty from the course schema ??
    //     // return res
    //     return res.status(200).json({
    //         success:true,
    //         message:'Section Deleted successfully',
    //     })
    // }
    // catch(error){
    //     return res.status(500).json({
    //         success:false,
    //         message:"Unable to delete Section, please try again",
    //     })
    // }
}