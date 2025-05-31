import { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowDownWideNarrow, X } from 'lucide-react'; 

const Jobs = () => {
  const { allJobs, query, salaryRange } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false); 

  useEffect(() => {
    let result = allJobs;
    if (query) {
      result = result.filter((job) => {
        return (
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase()) ||
          job.location.toLowerCase().includes(query.toLowerCase())
        );
      });
    }
    if (salaryRange && Array.isArray(salaryRange)) {
      const [minSalary, maxSalary] = salaryRange;
      result = result.filter((job) => {
        return job.salary >= minSalary && job.salary <= maxSalary;
      });
    }
    setFilterJobs(result);
  }, [allJobs, query, salaryRange]);

  return (
    <div className='md:mx-16'>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        {/* Filter Toggle Button for Mobile */}
        <button
          className="lg:hidden flex items-center gap-2 p-2 mb-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <ArrowDownWideNarrow /> Filter Jobs
        </button>

        <div className="flex gap-5">
          {/* Sidebar for Large Screens */}
          <div className={`hidden lg:block w-58`}>
            <FilterCard />
          </div>

          {/* FilterCard Drawer for Mobile */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
              <div className="w-72 bg-white p-4 h-full overflow-y-auto shadow-lg">
                <button
                  className="text-red-500 mb-4"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X />
                </button>
                <FilterCard />
              </div>
            </div>
          )}

          {/* Jobs List */}
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5 ">
            {filterJobs.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mx-2">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
