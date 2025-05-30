import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeleteJobModal from './DeleteJobModal'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [open, setOpen] = useState(false);
    const [jobId,setJobId]=useState(null);
    const [currentPopover, setCurrentPopover] = useState(null);


    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const handleClick = (id) => {
        setJobId(id);
        setOpen(true); 
        setCurrentPopover(null); 
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div className=''>
            <Table>
                <TableCaption>A list of your recent  posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job, index) => (
                            <tr key={index}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover open={currentPopover === job._id} onOpenChange={(open) => setCurrentPopover(open ? job._id : null)}>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div
                                                onClick={() => {
                                                    navigate(`/admin/jobs/${job._id}/edit`);
                                                    setCurrentPopover(null); 
                                                }}
                                                className="flex items-center gap-2 w-fit cursor-pointer"
                                            >
                                                <Edit2 className="w-4 text-[#6A38C2]" />
                                                <span className="text-[#6A38C2]">Edit</span>
                                            </div>
                                            <div
                                                onClick={()=>handleClick(job._id)}
                                                className="flex items-center gap-2 w-fit cursor-pointer mt-2"
                                            >
                                                <Trash2 className="w-4 text-red-500" />
                                                <span className="text-red-500">Delete</span>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    navigate(`/admin/jobs/${job._id}/applicants`);
                                                    setCurrentPopover(null); 
                                                }}
                                                className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                                            >
                                                <Eye className="w-4" />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
            {
                <DeleteJobModal open={open} handleClose={handleClose} jobId={jobId} setJobId={setJobId} setFilterJobs={setFilterJobs}/>
            }
        </div>
    )
}

export default AdminJobsTable