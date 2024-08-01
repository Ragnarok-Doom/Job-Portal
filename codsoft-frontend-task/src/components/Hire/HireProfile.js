import React, { useEffect, useState } from 'react';
import profile from '../assets/flaticon.png';
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/en-gb';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function HireProfile() {
    const [profileStep, setProfileStep] = useState(1);
    const [profileImage, setProfileImage] = useState(null);
    const [formData, setFormData] = useState({
        companyLogo: '',
        firstName: 'NA',
        lastName: 'NA',
        companyName: 'NA',
        companyRole: 'NA',
        companyFounder: 'NA',
        companyCEO: 'NA',
        companyEmail: 'NA',
        companyContact: 'NA',
        city: 'NA',
        state: 'NA',
        country: 'NA',
        companyAddress: 'NA',
        companyStartedYear: 'NA',
        companyDescription: 'NA',
        createdAt: 'NA',
    });

    useEffect(() => {
        const userId = Cookies.get('HireJob');

        if (userId) {
            axios.get(`http://localhost:5000/api/auth/rolejob/${userId}`)
                .then(response => {
                    const data = response.data;
                    setFormData({
                        companyLogo: data.companyLogo || '',
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        companyName: data.companyName || '',
                        companyRole: data.companyRole || '',
                        companyFounder: data.companyFounder || '',
                        companyCEO: data.companyCEO || '',
                        companyEmail: data.companyEmail || '',
                        companyContact: data.companyContact || '',
                        city: data.city || '',
                        state: data.state || '',
                        country: data.country || '',
                        companyAddress: data.companyAddress || '',
                        companyStartedYear: data.companyStartedYear || '',
                        companyDescription: data.companyDescription || '',
                        createdAt: data.createdAt || '',
                    });
                    if (data.companyLogo) {
                        setProfileImage(data.companyLogo);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userId = Cookies.get('HireJob');
        if (userId) {
            try {
                await axios.put(`http://localhost:5000/api/auth/updaterolejob/${userId}`, formData);
                toast.success('Profile updated successfully')
            } catch (error) {
                console.log(error);
                toast.alert("Profile not updated !")
            }
        }
    };

    const getTimeago = (dateString) => {
        return moment(dateString).fromNow();
    }

    return (
        <div className='job-profile w-full h-full overflow-y-scroll'>
            {profileStep === 1 && (
                <>
                    <button onClick={() => setProfileStep(2)} className='py-2 px-5 border-[2px] border-black flex items-center gap-3'>
                        Complete Company Profile <FaPlus />
                    </button>
                    <div className='w-full mt-5 flex gap-10'>
                        <div className='bg-slate-200 w-[180px] h-[180px]'>
                            <img src={profileImage || profile} className='w-full h-full object-cover' alt='Company logo' />
                        </div>
                        <div className='flex flex-col justify-between'>
                            <p>
                                <h2 className='text-3xl font-bold'>{formData.firstName} {formData.lastName}</h2>
                                <h3 className='mt-3'>Company located since {formData.companyStartedYear}</h3>
                                <h4>Founder - {formData.companyFounder}</h4>
                                <h4>CEO - {formData.companyCEO}</h4>
                            </p>
                            <h4 className='text-gray-500 mb-0'>Joined {getTimeago(formData.createdAt)}</h4>
                        </div>
                    </div>
                    <div>
                        <h1>About Company</h1>
                        <p>{formData.companyDescription}</p>
                        
                        <h1>Company Role</h1>
                        <p>{formData.companyRole}</p>

                        <h1>Contact info</h1>
                        <p>{formData.companyEmail} - {formData.companyContact}</p>

                        <h1>Office Address</h1>
                        <p>{formData.companyAddress}</p>
                        
                        <h1 className='my-3'>Location</h1>
                        <p>{formData.city} - {formData.state} - {formData.country}</p>
                    </div>
                </>
            )}

            {profileStep === 2 && (
                <>
                    <h1 className='m-0 mb-5 text-xl'>Complete your Company profile</h1>
                    <form className='w-full' onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className='w-full'>
                            <div className='flex gap-5 flex-wrap'>
                                <div className='w-[30%] flex gap-3 items-center'>
                                    <div className='w-[60px] h-[60px] rounded-md bg-slate-200'>
                                        <img src={profileImage || profile} className='w-full h-full object-cover' alt='Profile' />
                                    </div>
                                    <div className='flex flex-col gap-3 w-[50%]'>
                                        <label>Company Logo</label>
                                        <input 
                                            type='file' 
                                            className='' 
                                            name='companyLogo'
                                            onChange={handleImageUpload} 
                                        />
                                    </div>
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>First Name</label>
                                    <input 
                                        type='text' 
                                        name='firstName'
                                        className='border border-black p-2'
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Last Name</label>
                                    <input 
                                        type='text' 
                                        name='lastName'
                                        className='border border-black p-2'
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Company Name</label>
                                    <input 
                                        type='text' 
                                        name='companyName'
                                        className='border border-black p-2'
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Company Role</label>
                                    <select 
                                        name='companyRole' 
                                        className='border border-black p-2'
                                        value={formData.companyRole}
                                        onChange={handleInputChange}
                                    >
                                        <option value='NA'>Select</option>
                                        <option value='IT Services and IT Consulting'>IT Services and IT Consulting</option>
                                        <option value='Hospitals and Healthcare'>Hospitals and Healthcare</option>
                                        <option value='Accounting'>Accounting</option>
                                        <option value='Technology, Information and Interest'>Technology, Information and Interest</option>
                                        <option value='Staffing and Recruiting'>Staffing and Recruiting</option>
                                        <option value='Advertising Services'>Advertising Services</option>
                                    </select>
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Company Founder</label>
                                    <input 
                                        type='text' 
                                        name='companyFounder'
                                        className='border border-black p-2'
                                        value={formData.companyFounder}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Company CEO</label>
                                    <input 
                                        type='text' 
                                        name='companyCEO'
                                        className='border border-black p-2'
                                        value={formData.companyCEO}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Company Email</label>
                                    <input 
                                        type='email' 
                                        name='companyEmail'
                                        className='border border-black p-2'
                                        value={formData.companyEmail}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Company Contact</label>
                                    <input 
                                        type='text' 
                                        name='companyContact'
                                        className='border border-black p-2'
                                        value={formData.companyContact}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>City</label>
                                    <input 
                                        type='text' 
                                        name='city'
                                        className='border border-black p-2'
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>State</label>
                                    <input 
                                        type='text' 
                                        name='state'
                                        className='border border-black p-2'
                                        value={formData.state}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Country</label>
                                    <input 
                                        type='text' 
                                        name='country'
                                        className='border border-black p-2'
                                        value={formData.country}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Company Address</label>
                                    <input 
                                        type='text' 
                                        name='companyAddress'
                                        className='border border-black p-2'
                                        value={formData.companyAddress}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[30%]'>
                                    <label>Company Started Year</label>
                                    <input 
                                        type='text' 
                                        name='companyStartedYear'
                                        className='border border-black p-2'
                                        value={formData.companyStartedYear}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex-col flex w-[94%]'>
                                    <label>Company Description</label>
                                    <textarea 
                                        name='companyDescription'
                                        className='border border-black p-2'
                                        value={formData.companyDescription}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className='py-2 px-5 border-[2px] border-black mt-5'>
                            Save Profile
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default HireProfile;
