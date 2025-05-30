import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Link, NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, Facebook, Instagram, MapPin, Twitter, User } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
            <div className='ml-8 sm:ml-10 md:mx-24 my-5'>
                <NavLink to="/">
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold '>
                    Job<span className='text-[#6A38C2]'>Tracker</span>
                </h1>
                </NavLink>
            </div>

            <div className='w-full bg-[#6A38C2] border-2 p-4 space-y-4'>
                <h1 className='text-lg sm:text-xl md:text-2xl font-medium ml-4 sm:ml-10 md:mx-20 mt-4 text-white'>
                    {singleJob?.experienceLevel}+ Years Exp. {singleJob?.title}
                </h1>

                <div className='flex flex-row sm:flex-row sm:flex-wrap justify-start items-start sm:items-center gap-2 p-2 ml-4 sm:ml-10 md:mx-16'>
                    <div className='flex items-center gap-2 sm:my-1 m-1'>
                        <User size={16} className='text-white' />
                        <p className='text-white text-sm'>{singleJob?.position}</p>
                    </div>
                    <div className='flex items-center gap-2 m-1'>
                        <MapPin size={16} className='text-white' />
                        <p className='text-white text-sm'>{singleJob?.location}</p>
                    </div>
                    <div className='flex items-center gap-2 m-1'>
                        <Briefcase size={16} className='text-white' />
                        <p className='text-white text-sm'>{singleJob?.jobType}</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-start items-start gap-6 p-4 md:p-8 ml-4 sm:ml-10 md:mx-16'>

                {/* Description Section */}
                <div className='w-full md:w-2/3'>
                    <h1 className='font-bold my-2 text-base md:text-lg'>
                        Role: <span className='pl-2 font-normal text-gray-800'>{singleJob?.title}</span>
                    </h1>
                    <h1 className='font-bold my-2 text-base md:text-lg'>
                        Description: <span className='pl-2 font-normal text-gray-800'>{singleJob?.description}</span>
                    </h1>
                    <h1 className='font-bold my-2 text-base md:text-lg'>
                        Salary: <span className='pl-2 font-normal text-gray-800'>{singleJob?.salary} LPA</span>
                    </h1>
                    <h1 className='font-bold my-2 text-base md:text-lg'>
                        Total Applicants: <span className='pl-2 font-normal text-gray-800'>{singleJob?.applications?.length}</span>
                    </h1>
                    <h1 className='font-bold my-2 text-base md:text-lg'>
                        Posted Date: <span className='pl-2 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span>
                    </h1>
                    <h1 className='font-bold my-2 text-base md:text-lg'>
                        Requirements: <span className='pl-2 font-normal text-gray-800'>
                            {singleJob?.requirements?.join(", ")}
                        </span>
                    </h1>
                </div>

                {/* Button + Social Section */}
                <div className='w-full md:w-2/3 flex flex-col items-start gap-4'>
                <Link to={`/applyjob/${jobId}`}>
                    <Button
                        disabled={isApplied}
                        className={`rounded-lg w-44 px-6 py-2 text-white text-sm md:text-base ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#6A38C2] hover:bg-[#6A38d5]'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button></Link>
                    <p className='text-[1rem] text-black '>Share with someone awesome</p>
                    <div className='flex items-center gap-4'>
                        
                        <Facebook size={36} className='text-gray-400 hover:text-blue-600' />
                        <Instagram size={36} className='text-gray-400 hover:text-pink-500' />
                        <Twitter size={36} className='text-gray-400 hover:text-blue-400' />
                    </div>
                    <Link className='text-[#6A38C2]' to="/jobs">View all job openings</Link>
                </div>
            </div>



        </>

    )
}

export default JobDescription