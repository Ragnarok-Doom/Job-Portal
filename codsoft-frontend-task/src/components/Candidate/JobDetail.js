import React, { useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { IoBag } from 'react-icons/io5'
import profile from '../assets/a.jpg'
import { RxCross2 } from 'react-icons/rx'
import { FaArrowLeftLong } from "react-icons/fa6";

function JobDetail({setStep}) {

    const [close, setClose] = useState(1)
    const clickCrossJob = () => {
        setStep(1)
    }

  return (
    <>
    { close === 1 &&
    <>
        <div className='job-profile w-full h-full overflow-y-scroll'>
            <div className=' flex items-center justify-between'>
                <h1 className=' m-0 text-4xl font-black'><u>Frontend Developer</u></h1>
                <FaArrowLeftLong className=' font-bold text-xl cursor-pointer' onClick={clickCrossJob} />
            </div>
            <div className=' w-full h-[200px] mt-5 flex gap-6'>
                <div className=' bg-slate-500 w-[150px] h-[150px] mt-auto'>
                    <img src={profile} className=' w-full h-full object-cover' />
                </div>
                <div className=' mt-auto'>
                    <h2 className=' text-xl'>MyOnsite Healthcare</h2>
                    <h3 className=' text-gray-600'>Vadodara, Gujarat, India</h3>
                    <p className=' my-6 flex items-center gap-2 text-sm font-semibold'><IoBag />
                        <font className=' bg-green-200 px-2'>Hybrid</font><span className=' leading-[1]'>.</span>
                        <font className=' bg-green-200 px-2'>Full Time</font><span className=' leading-[1]'>.</span>
                        <font>Entry level</font>
                    </p>
                    <h4 className=' text-gray-500'>3 weeks ago</h4>
                    <button 
                    className=' mt-3 hover:bg-green-200 flex items-center gap-1 border-[2px] border-black py-1 px-6 rounded-3xl' onClick={() => setClose(2)}>
                    <span>Apply</span><IoIosSend />
                    </button>
                </div>
            </div>
            <div>
                <h1>About the job</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, nobis vero architecto rerum autem exercitationem nisi maiores distinctio deserunt voluptatem id odio assumenda consequatur corrupti, mini Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, nobis vero architecto rerum autem exercitationem nisi maiores distinctio deserunt voluptatem id odio assumenda consequatur corrupti, mini Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, nobis vero architecto rerum autem exercitationem nisi maiores distinctio deserunt voluptatem id odio assumenda consequatur corrupti, mini</p>
                
                <h1>Skills Required</h1>
                <p>React - Node - Express - MongoDB - Javascript - Tailwind</p>
                
                <h1>Qualification</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, nobis vero architecto rerum autem exercitationem nisi maiores distinctio deserunt voluptatem id odio assumenda consequatur corrupti, mini</p>

                <h1>Requirements</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, nobis vero architecto rerum autem exercitationem nisi maiores distinctio deserunt voluptatem id odio assumenda consequatur corrupti, mini</p>
                
                <h1 className=' my-3'>Base Salary</h1>
                <p>$1000 / yr - $2000 / yr</p>
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
                    <img src={profile} className=' w-full h-full object-cover' />
                </div>
                <div>
                    <h1 className=' m-0 text-xl'>Job for : Frontend Developer</h1>
                    <h2>Company : Cynthia</h2>
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
