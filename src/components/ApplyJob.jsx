import { setIsApply } from "@/redux/applicationSlice";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { ArrowLeftIcon, Briefcase, MapPin, User } from "lucide-react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom"
import { toast } from "sonner";

const ApplyJob = () => {

    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied)
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        email: "",
        expYears: "",
        expMonths: "",
        mobile: "",
        availableDays: "",
        currentLocation: "",
        skills: "",
        privacyPolicy: "",
        file: "",
    });
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, file: e.target.files?.[0] });
        }
    };


    //handle change
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formPayload = new FormData();
            formPayload.append('firstName', formData.firstName);
            formPayload.append('middleName', formData.middleName);
            formPayload.append('lastName', formData.lastName);
            formPayload.append('gender', formData.gender);
            formPayload.append('email', formData.email);
            formPayload.append('expYears', formData.expYears);
            formPayload.append('expMonths', formData.expMonths);
            formPayload.append('mobile', formData.mobile);
            formPayload.append('availableDays', formData.availableDays);
            formPayload.append('currentLocation', formData.currentLocation);
            formPayload.append('skills', formData.skills);
            formPayload.append('privacyPolicy', formData.privacyPolicy);
            if (formData.file) formPayload.append('file', formData.file);

            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, formPayload, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                dispatch(setIsApply(isApplied));
                toast.success(res.data.message);
            }

            setFormData({
                firstName: "",
                middleName: "",
                lastName: "",
                gender: "",
                email: "",
                expYears: "",
                expMonths: "",
                mobile: "",
                availableDays: "",
                currentLocation: "",
                skills: "",
                privacyPolicy: "",
                file: "",
            });

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong!');
        }
    };






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
            <div className='ml-8 sm:ml-10 md:mx-24 my-5'>
                <div className="mt-8">
                    <NavLink to="/jobs" className="flex justify-start items-center gap-1">
                        <ArrowLeftIcon size={16} color="#6A38C2" /><p className="text-sm text-[#6A38C2]">Back to all job openings</p>
                    </NavLink>
                    <h1 className="font-bold text-2xl md:text-3xl mt-3 text-gray-600">Apply for this job</h1>
                </div>
                <div className="border-2 border-dotted border-gray-300 w-11/12 p-6 flex flex-col items-center justify-center rounded-md cursor-pointer relative mt-8">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".doc,.pdf,.docx,.rtf,.odt"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required
                    />
                    <p className="text-[#6A38C2] font-medium"> {formData.file ? formData.file.name : "Upload Resume"}</p>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        This will auto-fill the fields below. 10MB max file size (Allowed file types: .doc, .pdf, .docx, .rtf, .odt)
                    </p>
                </div>

                <form className="w-11/12 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border rounded px-3 py-2" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Middle Name</label>
                        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="border rounded px-3 py-2" />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border rounded px-3 py-2" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="border rounded px-3 py-2" required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border rounded px-3 py-2" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Mobile Phone <span className="text-red-500">*</span></label>
                        <input type="number" name="mobile" value={formData.mobile} onChange={handleChange} className="border rounded px-3 py-2" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Experience (Years)</label>
                        <div className="flex gap-2">
                            <input type="number" name="expYears" min="0" value={formData.expYears} onChange={handleChange} className="border rounded px-3 py-2 w-full" required placeholder="/year" />
                            <input type="number" name="expMonths" min="0" value={formData.expMonths} onChange={handleChange} max="11" className="border rounded px-3 py-2 w-full" required placeholder="/month" />
                        </div>

                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Available to join (in days) <span className="text-red-500">*</span></label>
                        <input type="number" name="availableDays" value={formData.availableDays} onChange={handleChange} min="0" className="border rounded px-3 py-2" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Current Location <span className="text-red-500">*</span></label>
                        <input type="text" name="currentLocation" value={formData.currentLocation} onChange={handleChange} className="border rounded px-3 py-2" required />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 font-medium text-gray-700">Skills</label>
                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="border rounded px-3 py-2" placeholder="e.g. React, Node.js, SQL" required />
                    </div>
                    <div className="flex items-center md:col-span-2">
                        <input
                            type="checkbox"
                            name="privacyPolicy"
                            className="mr-2"
                            required
                            onChange={handleChange}
                            checked={!!formData.privacyPolicy}
                        />
                        <label className="text-gray-700 text-sm">
                            I agree to the company&#39;s privacy policy.
                        </label>
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            disabled={!formData.privacyPolicy}
                            className={`bg-[#6A38C2] text-white px-6 py-2 rounded font-semibold ${!formData.privacyPolicy ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6A38d5]'}`}
                        >
                            Apply Now
                        </button>
                    </div>
                </form>

            </div>

        </>
    )
}

export default ApplyJob
