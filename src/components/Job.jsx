import PropTypes from 'prop-types';
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { JOBSAVE_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setSaveJob } from '@/redux/jobSaveSlice';

const Job = ({ job }) => {
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
    const navigate = useNavigate();
    const dispatch=useDispatch();


    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
        setBookmarkedJobs(stored);
    }, []);

    const toggleBookmark = (jobId) => {
        let updatedBookmarks;
        if (bookmarkedJobs.includes(jobId)) {
            updatedBookmarks = bookmarkedJobs.filter(id => id !== jobId);
        } else {
            updatedBookmarks = [...bookmarkedJobs, jobId];
        }
        setBookmarkedJobs(updatedBookmarks);
        localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
    };

    const handleSaveJob = async() => {
          const res = await axios.get(`${JOBSAVE_API_END_POINT}/job-save/${job._id}`,{
            withCredentials: true,
          });
          if(res.data.success){
           dispatch(setSaveJob(res?.data));
           toast.success(res?.data?.message);
          }
        
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon" onClick={() => {
                    toggleBookmark(job?._id);

                    toast.success(bookmarkedJobs.includes(job?._id) ? "Remove Bookmarked successfully" : "Add Bookmarked successfully ", {
                        toastId: "job-delete-success"
                    });
                }}
                    title={bookmarkedJobs.includes(job?._id) ? "Remove Bookmark" : "Add to Bookmark"}><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description.slice(0,25)}...</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7]" onClick={handleSaveJob}>Save For Later</Button>
            </div>
        </div>
    )
}
Job.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string,
        createdAt: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        jobType: PropTypes.string,
        salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        company: PropTypes.shape({
            name: PropTypes.string,
            logo: PropTypes.string,
        }),
    }).isRequired,
};

export default Job;