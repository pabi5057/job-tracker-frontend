
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function DeleteJobModal({ open, handleClose, jobId, setJobId, setFilterJobs }) {
    const navigate = useNavigate();

    const fetchAllAdminJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                withCredentials: true,
            });
            if (res?.data?.success) {
                setFilterJobs(res?.data?.jobs);
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchAllAdminJobs();
    })

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                withCredentials: true,
            });
            if (res?.data?.success) {
                setJobId(null);
                fetchAllAdminJobs();
                toast.success(res?.data?.message);
                handleClose();
                navigate("/admin/jobs");
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            {open && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"></div>

                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Are you sure you want to delete this Job post?
                            </h2>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={handleClose}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

DeleteJobModal.propTypes = {
    jobId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    setJobId: PropTypes.func,
    setFilterJobs: PropTypes.func,
};

