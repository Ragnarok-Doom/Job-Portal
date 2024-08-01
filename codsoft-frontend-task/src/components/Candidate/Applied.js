import React from 'react'
import { PiBagSimpleFill } from 'react-icons/pi'
import profile from '../assets/a.jpg'

function Applied() {
  return (
    <div>
        <div className=' w-full h-full py5 relative'>
        <h1 className=' m-0 mb-5 text-xl'>Job Applied</h1>
            <div className=' jobs-list w-full h-full flex flex-col gap-3 relative overflow-y-scroll'>
                {/* Main Job Container */}
                <div className=' w-full cursor-default h-[120px] flex p-5 gap-5 relative'>
                    <div className=' w-[90px] h-full bg-slate-300'>
                        <img src={profile} className=' object-cover w-full h-full' />
                    </div>
                    <div>
                        <h1 className=' m-0 text-[20px] leading-[1]'>Frontend Developer</h1>
                        <h2 className=' text-[15px] text-zinc-500'>Company Name</h2>
                        <p className=' text-gray-500'>Vadodara, Gujarat, India</p>
                        <small className=' flex items-center gap-2'><PiBagSimpleFill /> Job</small>
                    </div>
                    <p className=' relative mt-auto text-zinc-700 ml-auto'>Applied 3 week ago</p>
                </div>
                {/* Main Job Container End */}
                {/* Main Job Container */}
                <div className=' w-full cursor-default h-[120px] flex p-5 gap-5 relative'>
                    <div className=' w-[90px] h-full bg-slate-300'>
                        <img src={profile} className=' object-cover w-full h-full' />
                    </div>
                    <div>
                        <h1 className=' m-0 text-[20px] leading-[1]'>Frontend Developer</h1>
                        <h2 className=' text-[15px] text-zinc-500'>Company Name</h2>
                        <p className=' text-gray-500'>Vadodara, Gujarat, India</p>
                        <small className=' flex items-center gap-2'><PiBagSimpleFill /> Job</small>
                    </div>
                    <p className=' relative mt-auto text-zinc-700 ml-auto'>Applied 3 week ago</p>
                </div>
                {/* Main Job Container End */}
            </div>
        </div>
    </div>
  )
}

export default Applied
