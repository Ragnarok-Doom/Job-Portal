import React, { useState } from 'react'
import profile from '../assets/a.jpg'
import { FaArrowLeftLong } from "react-icons/fa6";

function CandidateProfile({setStep}) {

    const clickCrossJob = () => {
        setStep(1)
    }

  return (
    <div className='job-profile w-full h-full overflow-y-scroll'>
        <div className=' flex justify-end'>
            <FaArrowLeftLong className=' font-bold text-xl cursor-pointer' onClick={clickCrossJob} />
        </div>
        <form>
            <div className=' w-full  mt-5 flex gap-3'>
                <div className=' bg-slate-500 w-[180px] h-[180px]'>
                    <img src={profile} className=' w-full h-full object-cover' />
                </div>
                <div className='  flex flex-col justify-between'>
                    <p>
                        <h2 className=' text-3xl font-bold'>Cynthia Christie</h2>
                        <h3 className=' mt-3'>Experienced in React | Node | Tailwind</h3>
                    </p>
                    <h4 className=' text-gray-500 mb-0'>Joined 3 weeks ago</h4>
                </div>
            </div>
                <input 
                    type='file'
                    className=' mt-2'
                />
            <div>
                <h1>Description</h1>
                <p><textarea className=' w-full border-black p-3 border-[1px] rounded-md' placeholder='Write about yourself ... like what is your work'></textarea></p>
                
                <h1>Qualification</h1>
                <p>Highest Qualification is Bachelor's in BCA <br /> CGPA - 9.05</p>

                <h1>Contact info</h1>
                <p>patelmanan1612@gmail.com - 8511781612</p>
                
                <h1 className=' my-3'>Location</h1>
                <p>Vadodara - Gujarat - India</p>
            </div>
            <div className=' mt-5 w-full flex justify-center'>
                <button className=' border-[2px] border-black py-2 px-5 hover:text-white hover:border-green-600' type='submit'>SAVE CHANGES</button>
            </div>
        </form>
    </div>
  )
}

export default CandidateProfile
