import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaCity, FaPlus, FaRegBuilding, FaTrash } from 'react-icons/fa'
import { FaDisplay, FaLocationDot } from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io'
import { IoEarth, IoLogOut, IoPersonSharp } from 'react-icons/io5'
import { MdOutlinePassword } from 'react-icons/md'
import { TiInfoLarge } from 'react-icons/ti'
import profile from './assets/a.jpg'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'react-toastify';


function Settings() {

    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [userData, setUserData] = useState({});
    const userId = Cookies.get('registrationId')
    const [profileImage, setProfileImage] = useState(null);
    const [rol, setRol] = useState('')
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roleResponse = await axios.get(`http://localhost:5000/api/auth/roles/${userId}`);
                if (roleResponse.status === 200) {
                    const role = roleResponse.data.userType;
                    setRol(role)
                    let dataResponse;

                    if (role === 'RoleJob') {
                        dataResponse = await axios.get(`http://localhost:5000/api/auth/rolehire/${userId}`);
                    } else if (role === 'RoleCandi') {
                        dataResponse = await axios.get(`http://localhost:5000/api/auth/rolecandi/${userId}`);
                    }

                    if (dataResponse && dataResponse.status === 200) {
                        setUserData(dataResponse.data);
                    }

                    const imageUrl = userData.photo ? `http://localhost:5000/${userData.photo}` : profile;
                    setProfileImage(imageUrl);

                    const imageUrll = userData.companyLogo ? `http://localhost:5000/${userData.companyLogo}` : profile;
                    setProfileImage(imageUrll);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    const handleLogout = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/auth/deleteuser/${userId}`);
            if (response.status === 200) {
                Cookies.remove('registrationId');
                toast.success("Account deleted successfully.")
                navigate('/');
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePassChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlePassword = async e => {
        e.preventDefault()
        const userId = Cookies.get('registrationId')
    
        try {
            if(formData.password == formData.confirmPassword){
                let response = await axios.post(`http://localhost:5000/api/auth/updatepassword/${userId}`, formData)
                if(response.status === 200){
                    setFormData({
                        password: '',
                        confirmPassword: ''
                    })
                    toast.success('Password Updated Successfully')
                }
            } else {
                toast.error('Confirm Password is not same as Password')
            }
        } catch (error) {
            console.log(error);
        }

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
                            <img src={profileImage} alt='' className=' w-full h-full object-cover' />
                        </div>
                        <p><span className=' text-sm'>Name</span><h1 className=' m-0'>{userData.firstName} {userData.lastName}</h1></p>
                    </div>
                    <div className=' mt-[3vh]'>
                        <p>Description <br />
                        {rol === 'RoleJob' ? userData.companyDescription : userData.description}</p>
                    </div>
                    <div className=' mt-[4vh]'>
                        <p><span className=' font-medium'>Headline</span> : {rol === 'RoleJob' ? userData.companyRole : userData.headline}</p>
                    </div>
                    <div className=' mt-[4vh]'>
                        <p><span className=' font-medium'>Email</span> : {rol === 'RoleJob' ? userData.companyEmail : userData.email}</p>
                    </div>
                    <div className=' mt-[4vh]'>
                        <p><span className=' font-medium'>Contact</span> : {rol === 'RoleJob' ? userData.companyContact : userData.contact}</p>
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
                    <p className=' flex items-center gap-3'><FaRegBuilding /> {rol === 'RoleJob' ? userData.city : userData.city}</p>
                    <p className=' flex items-center gap-3'><FaCity /> {rol === 'RoleJob' ? userData.state : userData.state}</p>
                    <p className=' flex items-center gap-3'><IoEarth /> {rol === 'RoleJob' ? userData.country : userData.country}</p>
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
                    <form onSubmit={handlePassword}>
                        <div className=' flex flex-col gap-2'>
                            <label>New Password</label>
                            <input type='password' name='password' value={formData.password} onChange={handlePassChange} className=' w-[50%] bg-blue-100 p-3'
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                            title="Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."required />
                        </div><br />
                        <div className=' flex flex-col gap-2'>
                            <label>Confirm Password</label>
                            <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handlePassChange} className=' w-[50%] bg-blue-100 p-3'
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                            title="Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character." required />
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
                    <p>Link - horcrux/{userData.firstName}/{userData._id}</p>
                    <p>Email - {rol === 'RoleJob' ? userData.companyEmail : userData.email}</p>
                    <p>Contact - {rol === 'RoleJob' ? userData.companyContact : userData.contact}</p>
                </div>
                <button className=' mt-5 py-2 px-5 border-[2px] border-black flex items-center gap-3 hover:bg-transparent hover:text-red-500 hover:border-red-500' onClick={handleLogout}>Delete Account <FaTrash /></button>
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
                        <button className=' border-[2px] border-green-600 text-green-600 hover:bg-green-100 py-3 px-12 rounded-[30px]' onClick={() => navigate('/')}>Okay</button>
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
