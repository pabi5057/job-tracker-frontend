import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import { JOBSAVE_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";


const SaveJobCard = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const { user } = useSelector(store => store.auth);
    const [loading,setLoading]=useState(true);

    const navigate = useNavigate();
  
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    const fetchSaveJobs = async () => {
        const res = await axios.get(`${JOBSAVE_API_END_POINT}/get`, {
            withCredentials: true,
        });
        if (res?.data?.success) {
            setLoading(false);
            setSavedJobs(res?.data?.saveJob);

        }
    }

    useEffect(() => {
        fetchSaveJobs();
    }, []);

    const handleDeleteJob = async (jobId) => {
        const res = await axios.delete(`${JOBSAVE_API_END_POINT}/job-save/${jobId}`,{
            withCredentials:true,
        });
        if (res?.data?.success) {
            toast.success(res?.data?.message);
            fetchSaveJobs();
        }
    }


    return (
        <div className="md:mx-16">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5 px-4">
                <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
                {
                    loading?"loading.....":(
                        <>
                {savedJobs?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedJobs?.map((savedJob, index) => (
                            user._id === savedJob.user && (
                                <div key={index} className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-gray-500'>
                                            {daysAgoFunction(savedJob?.createdAt) === 0
                                                ? "Today"
                                                : `${daysAgoFunction(savedJob?.createdAt)} days ago`}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-2 my-2'>
                                        <Button className="p-6" variant="outline" size="icon">
                                            <Avatar>
                                                <AvatarImage src={savedJob?.job?.company?.logo} />
                                            </Avatar>
                                        </Button>
                                        <div>
                                            <h1 className='font-medium text-lg'>{savedJob?.job?.company?.name}</h1>
                                            <p className='text-sm text-gray-500'>India</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className='font-bold text-lg my-2'>{savedJob?.job?.title}</h1>
                                        <p className='text-sm text-gray-600'>{savedJob?.job?.description}</p>
                                    </div>

                                    <div className='flex items-center gap-2 mt-4'>
                                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{savedJob?.job?.position} Positions</Badge>
                                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{savedJob?.job?.jobType}</Badge>
                                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{savedJob?.job?.salary}LPA</Badge>
                                    </div>

                                    <div className='flex items-center gap-4 mt-4'>
                                        <Button onClick={() => navigate(`/description/${savedJob?.job?._id}`)} variant="outline">Details</Button>
                                        <Button className="bg-[#7209b7]" onClick={() => handleDeleteJob(savedJob?._id)}>Delete Job</Button>
                                    </div>
                                </div>
                            )
                        ))}

                    </div>
                ) : (
                    <p>No saved jobs found.</p>
                )}
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default SaveJobCard
