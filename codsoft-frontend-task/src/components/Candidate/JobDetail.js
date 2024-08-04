import React, { useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { IoBag } from 'react-icons/io5'
import profile from '../assets/img.png'
import { RxCross2 } from 'react-icons/rx'
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/en-gb';
import Cookies from 'js-cookie'

function JobDetail({setStep, jobId}) {

    const [job, setJob] = useState(null)
    const [rolejob, setRolejob] = useState([])
    const [close, setClose] = useState(1)

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/fetchjobpost/${jobId}`);
                const resp = response.data
                setJob(resp);

                const getimg = await axios.get(`http://localhost:5000/api/auth/getcompimg/${resp.userId}`)
                setRolejob(getimg.data)

            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetail();
    }, [jobId]);

    const getTimeago = (dateString) => {
        return moment(dateString).fromNow();
    };

    if (!job) {
        return <div>Loading...</div>;
    }

  return (
    <>
    { close === 1 &&
    <>
        <div className='job-profile w-full h-full overflow-y-scroll'>
            <div className=' flex items-center justify-between'>
                <h1 className=' m-0 text-4xl font-black'><u>{job.role}</u></h1>
                <FaArrowLeftLong className=' font-bold text-xl cursor-pointer' onClick={() => setStep(1)} />
            </div>
            <div className=' w-full h-[200px] mt-5 flex gap-6'>
                <div className=' bg-slate-500 w-[150px] h-[150px] mt-auto'>
                    <img 
                        src={rolejob?.companyLogo && rolejob.companyLogo.trim() !== '' 
                            ? `http://localhost:5000/${rolejob.companyLogo}` 
                            : profile} 
                        className='w-full h-full object-cover' 
                        alt='' 
                    />
                </div>
                <div className=' mt-auto'>
                    <h2 className=' text-xl'>{job.companyname}</h2>
                    <h3 className=' text-gray-600'>{rolejob.city}, {rolejob.state}, {rolejob.country}</h3>
                    <p className=' my-6 flex items-center gap-2 text-sm font-semibold'><IoBag />
                        <font className=' bg-green-200 px-2'>{job.jobLocation}</font><span className=' leading-[1]'>.</span>
                        <font className=' bg-green-200 px-2'>{job.timing}</font><span className=' leading-[1]'>.</span>
                        <font>Entry level</font>
                    </p>
                    <h4 className=' text-gray-500'>{getTimeago(job.createdAt)}</h4>
                    <button 
                    className=' mt-3 hover:bg-green-200 flex items-center gap-1 border-[2px] border-black py-1 px-6 rounded-3xl' onClick={() => setClose(2)}>
                    <span>Apply</span><IoIosSend />
                    </button>
                </div>
            </div>
            <div>
                <h1>About the job</h1>
                <p>{job.jobDescription}</p>
                
                <h1>Skills Required</h1>
                <p>{job.skills}</p>
                
                <h1>Qualification</h1>
                <p>{job.qualification}</p>

                <h1>Requirements</h1>
                <p>{job.requirements}</p>
                
                <h1 className=' my-3'>Base Salary</h1>
                <p>{job.salary}</p>
            </div>
        </div>
    </>
    }

    { close === 2 &&
    <>
        <div className=' w-full h-full relative overflow-y-scroll'>
            <RxCross2 className=' ml-auto relative cursor-pointer' onClick={() => setClose(1)} />
            <div className=' flex gap-5'>
                <div className=' w-[80px] h-[80px] rounded-full bg-slate-200 overflow-hidden'>
                <img 
                    src={rolejob?.companyLogo && rolejob.companyLogo.trim() !== '' 
                        ? `http://localhost:5000/${rolejob.companyLogo}` 
                        : profile} 
                    className='w-full h-full object-cover' 
                    alt='' 
                />
                </div>
                <div>
                    <h1 className=' m-0 text-xl'>Job for : {job.role}</h1>
                    <h2>Company : {job.companyname}</h2>
                </div>
            </div>
            <div className=' w-full h-fit mt-[30px]'>
                <form className=' w-full'>
                    <div className='flex w-full justify-evenly gap-5'>
                        <div className=' w-[50%] flex flex-col gap-3'>
                            <label>First name*</label>
                            <input type='text' name='first-name' required
                            className=' w-[100%] border-[1px] border-black rounded-md p-3' />
                        </div>
                        <div className=' w-[50%] flex flex-col gap-3'>
                            <label>Last name*</label>
                            <input type='text' name='last-name' required
                            className=' w-[100%] border-[1px] border-black rounded-md p-3' />
                        </div>
                    </div>
                    <div className='flex w-full justify-evenly gap-5 mt-10'>
                        <div className=' w-[50%] flex flex-col gap-3'>
                            <label>Email*</label>
                            <input type='email' name='email' required
                            className=' w-[100%] border-[1px] border-black rounded-md p-3' />
                        </div>
                        <div className=' w-[50%] flex flex-col gap-3'>
                            <label>How much experience do you have ? (numbers only) *</label>
                            <input type='text' name='question' className=' w-[100%] border-[1px] border-black rounded-md p-3' />
                        </div>
                    </div>
                    <div className='flex w-full justify-evenly gap-5 mt-10'>
                        <div className=' w-[100%] flex flex-col gap-3'>
                            <label>How do you think you are fit for this role .*</label>
                            <textarea className='border-[1px] border-black rounded-md p-3' rows={5} required></textarea>
                        </div>
                    </div>
                    <div className='flex w-full justify-evenly gap-5 mt-5'>
                        <div className=' w-[100%] flex flex-col gap-3'>
                            <label>Attach resume .*</label>
                            <input type='file' name='resume' required />
                        </div>
                    </div>
                    <div className=' w-full flex justify-center'>
                        <input type='submit' name='submit' value='Apply'
                        className=' border-[2px] border-black py-2 px-10 cursor-pointer mt-5 hover:bg-green-500 hover:border-green-700 hover:text-white' 
                        />
                    </div>
                </form>
            </div>
        </div>
    </>
    }

    </>
  )
}

export default JobDetail
