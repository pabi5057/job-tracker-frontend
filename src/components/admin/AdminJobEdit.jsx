import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

function AdminJobEdit() {
   const { allAdminJobs } = useSelector(store => store.job);
   const { companies } = useSelector(store => store.company);
   const { id } = useParams();

   const [formData, setFormData] = useState({
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experience: "",
      position: "",
      companyId: "",
      companyName: "",
   });
   const [loading, setLoading]= useState(false);
   const navigate = useNavigate();

   const jobToEdit = allAdminJobs.find(job => job._id === id);

   useEffect(() => {
      if (jobToEdit) {
         setFormData({
            title: jobToEdit.title || "",
            description: jobToEdit.description || "",
            requirements: jobToEdit.requirements?.join(", ") || "",
            salary: jobToEdit.salary || "",
            location: jobToEdit.location || "",
            jobType: jobToEdit.jobType || "",
            experience: jobToEdit.experienceLevel || "",
            position: jobToEdit.position || "",
            companyId: jobToEdit.company?._id || "",
             companyName: jobToEdit.company?.name?.toLowerCase() || "",
         });
      }
   }, [jobToEdit]);

   const handleChange = (e) => {
      setFormData(prev => ({
         ...prev,
         [e.target.name]: e.target.value
      }));
   };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setFormData({...formData, companyId:selectedCompany._id,companyName: selectedCompany.name.toLowerCase(),});
    };

    const handleUpdate=async(e)=>{
      e.preventDefault()
      try {
         setLoading(true);
          const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, formData,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
      } catch (error) {
         console.log(error);
         
      }

    }

   return (
      <>
         <div className="md:mx-16">
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
               <form  className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                  <div className='grid grid-cols-2 gap-2'>
                     <div>
                        <Label>Title</Label>
                        <Input
                           type="text"
                           name="title"
                           value={formData.title}
                           onChange={handleChange}
                           className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                     </div>
                     <div>
                        <Label>Description</Label>
                        <Input
                           type="text"
                           name="description"
                           value={formData.description}
                           onChange={handleChange}
                           className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                     </div>
                     <div>
                        <Label>Requirements</Label>
                        <Input
                           type="text"
                           name="requirements"
                           value={formData.requirements}
                           onChange={handleChange}
                           className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                     </div>
                     <div>
                        <Label>Salary</Label>
                        <Input
                           type="text"
                           name="salary"
                           value={formData.salary}
                           onChange={handleChange}
                           className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                     </div>
                     <div>
                        <Label>Location</Label>
                        <Input
                           type="text"
                           name="location"
                           value={formData.location}
                           onChange={handleChange}
                           className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                     </div>
                     <div>
                        <Label>Job Type</Label>
                        <Input
                           type="text"
                           name="jobType"
                           value={formData.jobType}
                           onChange={handleChange}
                           className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                     </div>
                     <div>
                        <Label>Experience Level</Label>
                        <Input
                           type="text"
                           name="experience"
                           value={formData.experience}
                           onChange={handleChange}
                           className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                     </div>
                     <div>
                        <Label>No of Postion</Label>
                        <Input
                           type="number"
                           name="position"
                           value={formData.position}
                           onChange={handleChange}
                           className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                     </div>
                     {
                        companies.length > 0 && (
                           <Select 
                            value={formData.companyName}
                            onValueChange={selectChangeHandler}
                           >
                              <SelectTrigger className="w-[180px]">
                                 <SelectValue placeholder="Select a Company" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    {
                                       companies.map((company, index) => {
                                          return (
                                             <SelectItem value={company?.name?.toLowerCase()} key={index}>{company?.name}</SelectItem>
                                          )
                                       })
                                    }


                                 </SelectGroup>
                              </SelectContent>
                           </Select>
                        )
                     }
                  </div>
                  {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white" onClick={handleUpdate}>Update Job</Button>
                    }
               </form>
            </div>
         </div>
      </>
   );
}

export default AdminJobEdit;