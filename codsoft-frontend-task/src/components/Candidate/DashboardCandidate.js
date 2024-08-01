import React, { useState } from 'react'
import profile from '../assets/a.jpg'
import { IoMdSettings } from "react-icons/io";
import { MdHelpOutline } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { LuFileCheck2 } from "react-icons/lu";
import Faqs from '../Faqs';
import { useNavigate } from 'react-router-dom'
import JobDetail from './JobDetail';
import Settings from '../Settings';
import CandidateProfile from './CandidateProfile';
import Applied from './Applied';
import { FaHome } from 'react-icons/fa';

function DashboardCandidate() {

    const navigate = useNavigate()
    const [step, setStep] = useState(1)

    const handleJobProfile = () => {
        setStep(4)
    }

  return (
    <div className=' relative w-[100vw] h-[100vh] overflow-hidden'>
        <div className=' relative flex w-full h-full'>
            <div className=' relative w-[25%] h-full bg-[#f8f8f8]'>
                <div className=' relative p-5 w-full h-full flex flex-col gap-5'>
                    <div className=' w-full'>
                        <div className=' overflow-hidden w-[150px] h-[150px] rounded-[100%] bg-black'>
                            <img src={profile} className=' w-full h-full object-cover' />
                        </div>
                        <h1 className=' text-2xl leading-[0]'>Cynthia Christie</h1>
                        <span className=' text-gray-600 leading-[0] cursor-pointer' onClick={() => setStep(5)}>View Profile</span>
                    </div>
                    <div className=' mt-5'>
                        <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200' onClick={() => setStep(1)}>
                            <FaHome /><span>Home</span>
                        </p>
                        <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200'><PiBagSimpleFill /><span>Jobs</span></p>
                        <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200'><GrUserWorker /><span>Internship</span></p>
                        <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200' onClick={() => setStep(6)}><LuFileCheck2 /><span>Applied</span></p>
                    </div>
                    <div className='mt-auto'>
                        <p className=' cursor-pointer  flex items-center gap-5 text-md hover:text-gray-500 font-mono' onClick={() => setStep(2)}><MdHelpOutline className=' w-[20px] h-[20px]' /><span>Help Center</span></p>
                        <p className=' cursor-pointer  mt-5 flex items-center gap-5 text-md hover:text-gray-500 font-mono' onClick={() => setStep(3)}><IoMdSettings className=' w-[20px] h-[20px]' /><span>Setting</span></p>
                    </div>
                </div>                
            </div>
            <div className=' relative w-[75%] h-full p-5 z-10'>

                {/* JOB LISTINGS */}
                { step === 1 &&
                <>
                    <div className=' w-full'>
                        <input 
                        type='search' 
                        className=' border-[1px] border-black w-full px-5 py-2 rounded-3xl outline-0' 
                        placeholder='Search Job'
                        />
                    </div>
                    <div className=' w-full h-full py-10 relative'>
                        <div className=' jobs-list w-full h-full flex flex-col gap-3 relative overflow-y-scroll'>
                            {/* Main Job Container */}
                            <div className=' w-full hover:bg-slate-200 cursor-pointer h-[120px] bg-slate-100 flex p-5 gap-5 relative' onClick={handleJobProfile}>
                                <div className=' w-[90px] h-full bg-slate-300'>
                                    <img src={profile} className=' object-cover w-full h-full' />
                                </div>
                                <div>
                                    <h1 className=' m-0 text-[20px] leading-[1]'>Frontend Developer</h1>
                                    <h2 className=' text-[15px] text-zinc-500'>Company Name</h2>
                                    <p className=' text-gray-500'>Vadodara, Gujarat, India</p>
                                    <small className=' flex items-center gap-2'><PiBagSimpleFill /> Job</small>
                                </div>
                                <MdHelpOutline className=' mr-0 w-5 h-5 text-gray-600' />
                                <p className=' relative mt-auto text-zinc-700 ml-auto'>3 week ago</p>
                            </div>
                            {/* Main Job Container End */}
                        </div>
                    </div>
                </>
                }
        
                {/* FAQS */}
                { step === 2 &&
                <>
                    <Faqs setStep={setStep} />
                </>
                }

                {/* SETTINGS */}
                { step === 3 &&
                <>
                    <Settings setStep={setStep} />
                </>
                }

                {/* JOB DETAILS */}
                { step === 4 &&
                <>
                    <JobDetail setStep={setStep} />
                </>
                }

                {/* CANDIDATE PROFILE */}
                { step === 5 &&
                <>
                    <CandidateProfile setStep={setStep} />
                </>
                }

                {/* JOB APPLIED */}
                { step === 6 &&
                <>
                    <Applied />
                </>
                }
            </div>
        </div>
    </div>
  )
}

export default DashboardCandidate
