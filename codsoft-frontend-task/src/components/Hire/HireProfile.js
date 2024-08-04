import React, { useEffect, useState } from 'react';
import profile from '../assets/shirt.png';
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/en-gb';
import Cookies from 'js-cookie';
import HireProfileForm from '../forms/HireProfileForm';

function HireProfile() {

    const [profileImage, setProfileImage] = useState(null);
    const [profileStep, setProfileStep] = useState(1);
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

    const getTimeago = (dateString) => {
        return moment(dateString).fromNow();
    }

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
    }, [profileStep]);

    return (
        <div className='job-profile w-full h-full overflow-y-scroll'>
            {profileStep === 1 && (
                <>
                    <button onClick={() => setProfileStep(2)} className='py-2 px-5 border-[2px] hover:text-white border-black flex items-center gap-3'>
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

            { profileStep === 2 && 
                <HireProfileForm setProfileStep={setProfileStep}  />
            }
        </div>
    );
}

export default HireProfile;
