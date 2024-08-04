import React, { useEffect, useState } from 'react';
import profile from '../assets/shirt.png';
import axios from 'axios';
import 'moment/locale/en-gb';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

function HireProfileForm({ setProfileStep }) {

    const [formData, setFormData] = useState({
        companyLogo: '',
        firstName: '',
        lastName: '',
        companyName: '',
        companyRole: '',
        companyFounder: '',
        companyCEO: '',
        companyEmail: '',
        companyContact: '',
        city: '',
        state: '',
        country: '',
        companyAddress: '',
        companyStartedYear: '',
        companyDescription: '',
        createdAt: '',
    });

    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        const userId = Cookies.get('registrationId');
        if (userId) {
            axios.get(`http://localhost:5000/api/auth/rolehire/${userId}`)
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
                    const imageUrl = data.companyLogo ? `http://localhost:5000/${data.companyLogo}` : profile;
                    setProfileImage(imageUrl);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            companyLogo: file
        });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.companyEmail || !/\S+@\S+\.\S+/.test(formData.companyEmail)) newErrors.companyEmail = 'Valid email is required';
        if (!formData.companyContact || !/^\d{10}$/.test(formData.companyContact)) newErrors.companyContact = 'Contact should be a 10-digit number';
        if (!formData.companyFounder) newErrors.companyFounder = 'Company Founder is required';
        if (!formData.companyCEO) newErrors.companyCEO = 'Company CEO is required';
        if (!formData.companyName) newErrors.companyName = 'Company Name is required';
        if (!formData.companyRole) newErrors.companyRole = 'Compampany Role is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State are required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.companyAddress) newErrors.companyAddress = 'Address is required';
        if (!formData.companyStartedYear) newErrors.companyStartedYear = 'Started YEar is required';
        if (!formData.companyDescription) newErrors.companyDescription = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const formDataToSubmit = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSubmit.append(key, formData[key]);
            });
        
            const userId = Cookies.get('registrationId');
            try {
                await axios.post(`http://localhost:5000/api/auth/updaterolehire/${userId}`, formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success('Profile updated successfully')
                setProfileStep(1)
            } catch (error) {
                console.log(error);
            }
        }
    }

  return (
    <div>
      <div className=' flex justify-between items-center'>
            <h1 className='m-0 mb-5 text-xl'>Complete your Company profile</h1>
            <FaArrowLeft className=' cursor-pointer' onClick={() => setProfileStep(1)} />
        </div>
        <form className='w-full' onSubmit={handleSubmit}>
            <div className='w-full'>
                <div className='flex gap-5 flex-wrap'>
                    <div className='w-[30%] flex gap-3 items-center'>
                        <div className='w-[60px] h-[60px] rounded-md bg-slate-200'>
                            <img src={profileImage || profile} className='w-full h-full object-cover' alt='Profile' />
                        </div>
                        <div className='flex flex-col gap-3 w-[50%]'>
                            <label>Company Logo</label>
                            <input type='file' id='photo' name='companyLogo' onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>First Name</label>
                        <input 
                            type='text' 
                            name='firstName'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>Last Name</label>
                        <input 
                            type='text' 
                            name='lastName'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>Company Name</label>
                        <input 
                            type='text' 
                            name='companyName'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.companyName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>Company Role</label>
                        <select 
                            name='companyRole' 
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.companyRole}
                            onChange={handleChange}
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
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.companyFounder}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>Company CEO</label>
                        <input 
                            type='text' 
                            name='companyCEO'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.companyCEO}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>Company Email</label>
                        <input 
                            type='email' 
                            name='companyEmail'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.companyEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>Company Contact</label>
                        <input 
                            type='text' 
                            name='companyContact'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.companyContact}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>City</label>
                        <input 
                            type='text' 
                            name='city'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>State</label>
                        <input 
                            type='text' 
                            name='state'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>Country</label>
                        <input 
                            type='text' 
                            name='country'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>Company Address</label>
                        <input 
                            type='text' 
                            name='companyAddress'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.companyAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[30%]'>
                        <label>Company Started Year</label>
                        <input 
                            type='text' 
                            name='companyStartedYear'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.companyStartedYear}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex-col flex w-[94%]'>
                        <label>Company Description</label>
                        <textarea 
                            name='companyDescription'
                            className='border border-black p-3 rounded-xl mt-2 text-md focus:border-green-500 focus:border-[2px] outline-none'
                            value={formData.companyDescription}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className=' mt-5 py-4 rounded-md px-5 uppercase text-white bg-black'>
                Save Profile
            </button>
        </form>
    </div>
  )
}

export default HireProfileForm;
