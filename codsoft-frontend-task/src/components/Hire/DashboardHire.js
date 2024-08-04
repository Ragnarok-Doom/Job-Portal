import React, { useEffect, useState } from 'react';
import profile from '../assets/shirt.png';
import { IoMdSettings } from "react-icons/io";
import { MdHelpOutline } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import { LuFileCheck2 } from "react-icons/lu";
import Faqs from '../Faqs';
import { useNavigate } from 'react-router-dom';
import Settings from '../Settings';
import { FaHome } from 'react-icons/fa';
import { FaIdCard, FaTrash } from 'react-icons/fa6';
import { IoBag, IoDocumentAttach, IoLogOut } from 'react-icons/io5';
import HireProfile from './HireProfile';
import JobPost from './JobPost';
import EmployerApply from './EmployerApply';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment/locale/en-gb';

function DashboardHire() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
    const [profileImage, setProfileImage] = useState(null);


    useEffect(() => {
        const fetchJobs = async () => {
            const userId = Cookies.get("registrationId");
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/user/${userId}`)
                setCompanyName(response.data.companyName)
                const imageUrl = response.data.companyLogo ? `http://localhost:5000/${response.data.companyLogo}` : profile;
                setProfileImage(imageUrl);

                const jobresponse = await axios.get(`http://localhost:5000/api/auth/jobposts/${userId}`);
                setJobs(jobresponse.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch jobs');
                setLoading(false);
            }
        };

        fetchJobs();
    }, [step]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getTimeago = (dateString) => {
        return moment(dateString).fromNow();
    }

    const handleDeleteJob = async () => {
        if (!jobToDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/auth/jobposts/${jobToDelete}`);
            setJobs(jobs.filter(job => job._id !== jobToDelete));
            setIsDialogOpen(false);
            setJobToDelete(null);
        } catch (error) {
            console.error('Failed to delete job post:', error);
        }
    }

    return (
        <div className='relative w-full h-screen overflow-hidden'>
            <div className='flex w-full h-full'>
                <div className='w-[25%] bg-gray-100 p-5'>
                    <div className='flex flex-col gap-5 h-full'>
                        <div className=''>
                            <div className='w-36 h-36 rounded-full bg-black overflow-hidden '>
                                <img src={profileImage} className='object-cover w-full h-full' />
                            </div>
                            <h1 className='text-2xl mt-4'>{companyName}</h1>
                        </div>
                        <div>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-200' onClick={() => setStep(1)}>
                                <FaHome /><span>Home</span>
                            </p>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-200' onClick={() => setStep(2)}>
                                <FaIdCard /><span>Profile</span>
                            </p>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-200' onClick={() => setStep(3)}>
                                <IoBag /><span>Post Job</span>
                            </p>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-200' onClick={() => setStep(4)}>
                                <LuFileCheck2 /><span>Replies</span>
                            </p>
                        </div>
                        <div className='mt-auto'>
                            <p className='flex items-center gap-3 cursor-pointer text-gray-700 hover:text-gray-900' onClick={() => setStep(5)}>
                                <MdHelpOutline className='w-5 h-5' /><span>Help Center</span>
                            </p>
                            <p className='flex items-center gap-3 mt-5 cursor-pointer text-gray-700 hover:text-gray-900' onClick={() => setStep(6)}>
                                <IoMdSettings className='w-5 h-5' /><span>Setting</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-3/4 p-5'>
                    {/* JOB LISTINGS */}
                    {step === 1 && (
                        <>
                            <h1 className='text-2xl mb-4'>Posted Jobs</h1>
                            {jobs.length === 0 ? (
                                <p>No Jobs Posted</p>
                            ) : (
                                <div className='space-y-3'>
                                    {jobs.map((job) => (
                                        <div key={job._id} className='relative flex items-center bg-gray-100 p-5 rounded-lg shadow hover:bg-gray-200'>
                                            <div className='w-24 h-24 bg-gray-300'>
                                                <img src={profileImage} className='object-cover w-full h-full' />
                                            </div>
                                            <div className='ml-5'>
                                                <h1 className='text-lg font-semibold'>{job.role}</h1>
                                                <h2 className='text-sm text-gray-500'>{job.companyName}</h2>
                                                <p className='text-gray-500'>{job.jobLocation}</p>
                                                <small className='flex items-center gap-2 mt-1 text-gray-600'>
                                                    {job.jobType == 'Job' ? <PiBagSimpleFill /> : <IoDocumentAttach />} {job.jobType}
                                                </small>
                                            </div>
                                            <FaTrash 
                                                className='absolute top-5 right-5 text-gray-600 cursor-pointer hover:text-gray-800' 
                                                onClick={() => { setJobToDelete(job._id); setIsDialogOpen(true); }}
                                            />
                                            <p className='absolute bottom-2 right-2 text-gray-700'>{getTimeago(job.createdAt)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                    {/* PROFILE */}
                    {step === 2 && <HireProfile setStep={setStep} />}
                    {/* JOB POST */}
                    {step === 3 && <JobPost setStep={setStep} setCompanyName={companyName} />}
                    {/* EMPLOYER LIST */}
                    {step === 4 && <EmployerApply setStep={setStep} />}
                    {/* FAQS */}
                    {step === 5 && <Faqs setStep={setStep} />}
                    {/* SETTINGS */}
                    {step === 6 && <Settings setStep={setStep} />}
                </div>
            </div>

            {/* Confirmation Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this job post?</h2>
                        <div className="flex justify-end gap-4">
                            <button 
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                onClick={handleDeleteJob}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardHire;
