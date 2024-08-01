import React, { useEffect, useState } from 'react';
import profile from '../assets/flaticon.png';
import { IoMdSettings } from "react-icons/io";
import { MdHelpOutline } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import { LuFileCheck2 } from "react-icons/lu";
import Faqs from '../Faqs';
import { useNavigate } from 'react-router-dom';
import Settings from '../Settings';
import { FaHome } from 'react-icons/fa';
import { FaIdCard } from 'react-icons/fa6';
import { IoBag } from 'react-icons/io5';
import HireProfile from './HireProfile';
import JobPost from './JobPost';
import EmployerApply from './EmployerApply';
import axios from 'axios';
import Cookies from 'js-cookie';

function DashboardHire() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            const userId = Cookies.get('HireJob');
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/jobposts/${userId}`);
                setJobs(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch jobs');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='relative w-[100vw] h-[100vh] overflow-hidden'>
            <div className='relative flex w-full h-full'>
                <div className='relative w-[25%] h-full bg-[#f8f8f8]'>
                    <div className='relative p-5 w-full h-full flex flex-col gap-5'>
                        <div className='w-full'>
                            <div className='overflow-hidden w-[150px] h-[150px] rounded-[30px] bg-black'>
                                <img src={profile} className='w-full h-full object-cover' />
                            </div>
                            <h1 className='text-2xl leading-[0]'>Company Name</h1>
                        </div>
                        <div className='mt-5'>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200' onClick={() => setStep(1)}>
                                <FaHome /><span>Home</span>
                            </p>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200' onClick={() => setStep(2)}><FaIdCard /><span>Profile</span></p>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200' onClick={() => setStep(3)}><IoBag /><span>Post Job</span></p>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200' onClick={() => setStep(4)}><LuFileCheck2 /><span>Replies</span></p>
                        </div>
                        <div className='mt-auto'>
                            <p className='cursor-pointer flex items-center gap-5 text-md hover:text-gray-500 font-mono' onClick={() => setStep(5)}><MdHelpOutline className='w-[20px] h-[20px]' /><span>Help Center</span></p>
                            <p className='cursor-pointer mt-5 flex items-center gap-5 text-md hover:text-gray-500 font-mono' onClick={() => setStep(6)}><IoMdSettings className='w-[20px] h-[20px]' /><span>Setting</span></p>
                        </div>
                    </div>
                </div>
                <div className='relative w-[75%] h-full p-5 z-10'>
                    {/* JOB LISTINGS */}
                    {step === 1 && (
                        <>
                            <div><h1 className='m-0 text-2xl'>Posted Jobs</h1></div>
                            {jobs.length === 0 ? (
                                <p>No Jobs Posted</p>
                            ) : (
                                <div className='w-full h-full py-10 relative'>
                                    <div className='jobs-list w-full h-full flex flex-col gap-3 relative overflow-y-scroll'>
                                        {jobs.map((job) => (
                                            <div key={job._id} className='w-full hover:bg-slate-200 cursor-pointer h-[120px] bg-slate-100 flex p-5 gap-5 relative'>
                                                <div className='w-[90px] h-full bg-slate-300'>
                                                    <img src={profile} className='object-cover w-full h-full' />
                                                </div>
                                                <div>
                                                    <h1 className='m-0 text-[20px] leading-[1]'>{job.role}</h1>
                                                    <h2 className='text-[15px] text-zinc-500'>{job.companyName}</h2>
                                                    <p className='text-gray-500'>{job.jobLocation}</p>
                                                    <small className='flex items-center gap-2'><PiBagSimpleFill /> Job</small>
                                                </div>
                                                <MdHelpOutline className='mr-0 w-5 h-5 text-gray-600' />
                                                <p className='relative mt-auto text-zinc-700 ml-auto'>3 weeks ago</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* PROFILE */}
                    {step === 2 && <HireProfile setStep={setStep} />}

                    {/* JOB POST */}
                    {step === 3 && <JobPost setStep={setStep} />}

                    {/* EMPLOYER LIST */}
                    {step === 4 && <EmployerApply setStep={setStep} />}

                    {/* FAQS */}
                    {step === 5 && <Faqs setStep={setStep} />}

                    {/* SETTINGS */}
                    {step === 6 && <Settings setStep={setStep} />}
                </div>
            </div>
        </div>
    );
}

export default DashboardHire;
