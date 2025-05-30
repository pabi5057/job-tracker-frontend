
import { useEffect, useState } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { setSearchJobByText } from '@/redux/jobSlice';



const LatestJobs = () => {
    const {allJobs,searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        let result = allJobs;
        if (searchJobByText) {
            result = result.filter((job) => {
                return (
                    job.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchJobByText.toLowerCase())
                );
            });
        }
        setFilterJobs(result);
        setSearchJobByText({ searchJobByText: "" }); 
    }, [allJobs, searchJobByText]);

    
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold ml-[1rem]'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5 mx-[1rem]'>
                {
                    filterJobs.length <= 0 ? <span>No Job Available</span> : filterJobs?.slice(0,6).map((job) => <LatestJobCards key={job?._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs