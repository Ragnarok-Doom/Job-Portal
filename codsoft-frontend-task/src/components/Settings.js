import React, { useState } from 'react'
import { FaArrowLeft, FaCity, FaPlus, FaRegBuilding, FaTrash } from 'react-icons/fa'
import { FaDisplay, FaLocationDot } from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io'
import { IoEarth, IoLogOut, IoPersonSharp } from 'react-icons/io5'
import { MdOutlinePassword } from 'react-icons/md'
import { TiInfoLarge } from 'react-icons/ti'
import profile from './assets/a.jpg'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'


function Settings() {

    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const handleLogout = () => {
        navigate('/login')
        Cookies.remove('authToken')
    }

  return (
    <div className=' relative w-full h-full flex flex-col gap-5'>
        <div className=' flex w-full justify-between'>
            <div className=' flex items-center gap-3'>
                <span><IoMdSettings className='text-2xl' /></span>
                <h1 className=' text-3xl'>Settings</h1>
            </div>
            { step !== 1 && <FaArrowLeft className=' cursor-pointer' onClick={() => setStep(1)} /> }
        </div>
        <div className=' mt-[20px]'>
            {/* MENU */}
            { step === 1 &&
            <>
            <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100' onClick={() => setStep(2)}>
                <IoPersonSharp /><span>Personal Information</span>
            </p>
            <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100' onClick={() => setStep(3)}>
                <FaLocationDot /><span>Location</span>
            </p>
            <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100' onClick={() => setStep(4)}>
                <MdOutlinePassword /><span>Change Password</span>
            </p>
            <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100' onClick={() => setStep(5)}>
                <FaDisplay /><span>Display</span>
            </p>
            <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100' onClick={() => setStep(6)}>
                <TiInfoLarge /><span>Account Info</span>
            </p>
            <p className=' p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100' onClick={() => setStep(7)}>
                <IoLogOut /><span>Logout</span>
            </p>
            </>
            }

            {/* PERSONAL INFORMATION */}
            { step === 2 && 
            <>
                <p className=' p-4 flex items-center gap-3' onClick={() => setStep(2)}>
                <IoPersonSharp /><span>Personal Information</span>
                </p>
                <hr className='' />
                <div className=' p-4'>
                    <div className=' w-full flex gap-3 flex-wrap mt-5'>
                        <div className=' w-[60px] h-[60px] overflow-hidden rounded-md'>
                            <img src={profile} alt='' className=' w-full h-full object-cover' />
                        </div>
                        <p><span className=' text-sm'>Name</span><h1 className=' m-0'>Cynthia Christie</h1></p>
                    </div>
                    <div className=' mt-[3vh]'>
                        <p>Description <br />Horcrux was established with a vision to revolutionize the job market by providing a seamless and efficient platform for employment opportunities. Recognizing the challenges faced by both job seekers and employers, we set out to create a comprehensive solution that addresses the unique needs of both parties.</p>
                    </div>
                    <div className=' mt-[4vh]'>
                        <p><span className=' font-medium'>Headline</span> : Experienced in React | Node | Express | Mongo</p>
                    </div>
                    <div className=' mt-[4vh]'>
                        <p><span className=' font-medium'>Email</span> : patelmanan074@gmail.com</p>
                    </div>
                    <div className=' mt-[4vh]'>
                        <p><span className=' font-medium'>Contact</span> : +91 8511781612</p>
                    </div>
                </div>
            </>
            }

            {/* LOCATION */}
            { step === 3 &&
            <>
            <p className=' p-4 flex items-center gap-3'>
                <FaLocationDot /><span>Location</span>
            </p>
            <hr className='' />
            <div className=' px-4'>
                <div className=' mt-[5vh] flex flex-col gap-4 '>
                    <p className=' flex items-center gap-3'><FaRegBuilding /> Vadodara</p>
                    <p className=' flex items-center gap-3'><FaCity /> Gujarat</p>
                    <p className=' flex items-center gap-3'><IoEarth /> India</p>
                </div>
            </div>
            </>
            }

            {/* CHANGE PASSWORD */}
            { step === 4 &&
            <>
            <p className=' p-4 flex items-center gap-3'>
                <MdOutlinePassword /><span>Change Password</span>
            </p>
            <hr className='' />
            <div className=' p-4'>
                <div className=' mt-[5vh] flex flex-col gap-4 '>
                    <form>
                        <div className=' flex flex-col gap-2'>
                            <label>New Password</label>
                            <input type='text' name='new-pass' className=' w-[50%] bg-blue-100 p-3' required />
                        </div><br />
                        <div className=' flex flex-col gap-2'>
                            <label>Confirm Password</label>
                            <input type='text' name='confirm-pass' className=' w-[50%] bg-blue-100 p-3' required />
                        </div>
                        <div className=' mt-[4vh]'>
                            <input type='submit' value='Change' name='submit'
                            className=' bg-green-300 w-[50%] py-3 rounded-md hover:text-white hover:bg-green-400 cursor-pointer'
                            />
                        </div>
                    </form>
                </div>
            </div>
            </>
            }

            {/* LOCATION */}
            { step === 5 &&
            <>
            <p className=' p-4 flex items-center gap-3'>
                <FaDisplay /><span>Display</span>
            </p>
            <hr className='' />
            <div className=' p-4'>
                <div className=' mt-[5vh] flex flex-col gap-4 '>
                    <form>
                        <div className=' flex items-center gap-2'>
                            <input type='radio' name='rd' value='light' className=' w-[20px] h-[20px]' /><span>Light</span>
                        </div><br />
                        <div className=' flex items-center gap-2'>
                            <input type='radio' name='rd' value='dark' className=' w-[20px] h-[20px]' /><span>Dark</span>
                        </div>
                    </form>
                </div>
            </div>
            </>
            }

            {/* ACCOUNT INFO */}
            { step === 6 &&
            <>
            <p className=' p-4 flex items-center gap-3'>
                <TiInfoLarge /><span>Account Info</span>
            </p>
            <hr className='' />
            <div className=' p-4'>
                <div className=' mt-[4vh] flex flex-col gap-4 '>
                    <button 
                    className=' justify-center hover:bg-transparent w-[50%] border-black border-[2px] py-3 flex items-center gap-3 hover:border-blue-500 hover:text-blue-500'
                    onClick={() => navigate('/login')}>Login with other Account <FaPlus /></button>
                    <p>Date Joined - 1 / 2 / 2021</p>
                    <p>Link - horcrux/cynthia14/10254</p>
                    <p>Email - patelmanan074</p>
                    <p>Contact - 8511745</p>
                </div>
                <button className=' mt-5 py-2 px-5 border-[2px] border-black flex items-center gap-3 hover:bg-transparent hover:text-red-500 hover:border-red-500'>Delete Account <FaTrash /></button>
            </div>
            </>
            }

            {/* ACCOUNT INFO */}
            { step === 7 &&
            <>
            <div className=' w-full h-[82vh] relative'>
                <div className=' flex items-center justify-center flex-col gap-2 w-[50%] h-[40%] relative top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-gray-100'>
                    <IoLogOut className=' w-[100px] h-[100px]' />
                    <p>Are you sure, you want to logout ?</p>
                    <div className=' flex gap-5 mt-5'>
                        <button className=' border-[2px] border-red-600 text-red-600 hover:bg-red-100 py-3 px-12 rounded-[30px]' onClick={() => setStep(1)}>Cancel</button>
                        <button className=' border-[2px] border-green-600 text-green-600 hover:bg-green-100 py-3 px-12 rounded-[30px]' onClick={handleLogout}>Okay</button>
                    </div>
                </div>
            </div>
            </>
            }
        </div>
    </div>
  )
}

export default Settings
