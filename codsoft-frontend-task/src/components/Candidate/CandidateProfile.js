import React, { useEffect, useState } from 'react';
import profile from '../assets/a.jpg';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdContact } from 'react-icons/io';
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment/locale/en-gb';
import axios from 'axios';

function CandidateProfile() {
    const [profileImage, setProfileImage] = useState(profile); // Default profile image
    const [formData, setFormData] = useState({
        photo: '',
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        city: '',
        state: '',
        country: '',
        headline: '',
        description: '',
        skills: '',
        qualification: '',
        percentage: '',
        position: '',
        course: '',
        college: '',
        interest: '',
        createdAt: '',
    });

    const getTimeago = (dateString) => {
        return moment(dateString).fromNow();
    }

    useEffect(() => {
        const userId = Cookies.get('registrationId');

        if (userId) {
            axios.get(`http://localhost:5000/api/auth/rolecandi/${userId}`)
                .then(response => {
                    const data = response.data;
                    setFormData({
                        photo: data.photo || '',
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        email: data.email || '',
                        contact: data.contact || '',
                        city: data.city || '',
                        state: data.state || '',
                        country: data.country || '',
                        headline: data.headline || '',
                        description: data.description || '',
                        skills: data.skills || '',
                        qualification: data.qualification || '',
                        percentage: data.percentage || '',
                        position: data.position || '',
                        course: data.course || '',
                        college: data.college || '',
                        interest: data.interest || '',
                        createdAt: data.createdAt || '',
                    });

                    const imageUrl = data.photo ? `http://localhost:5000/${data.photo}` : profile;
                    setProfileImage(imageUrl);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [profileImage]);

    return (
        <div className='job-profile w-full h-full overflow-y-scroll'>
            <div className='w-full mt-5 flex gap-3'>
                <div className='bg-slate-500 w-[180px] h-[180px]'>
                    <img src={profileImage} className='w-full h-full object-cover' alt="Profile" />
                </div>
                <div className='flex flex-col justify-between'>
                    <p>
                        <h2 className='text-3xl font-bold'>{formData.firstName} {formData.lastName}</h2>
                        <h3 className='mt-3'>{formData.headline}</h3>
                    </p>
                    <h4 className='text-gray-500 mb-0'>Joined {getTimeago(formData.createdAt)}</h4>
                </div>
            </div>
            <div className='flex flex-col gap-7 mt-5'>
                <div>
                    <h1 className='my-2'>Description</h1>
                    <p>{formData.description}</p>
                </div>
                <div>
                    <h1 className='my-2'>Skills</h1>
                    <p>{formData.skills}</p>
                </div>
                <div>
                    <h1 className='my-2'>Qualification</h1>
                    <p> {formData.college} <br /> {formData.qualification} <br /> CGPA - {formData.percentage}</p>
                </div>
                <div>
                    <h1 className='my-2 flex items-center gap-2'><span><IoMdContact /></span>Contact info</h1>
                    <p>{formData.email} - {formData.contact}</p>
                </div>
                <div>
                    <h1 className='my-2 flex items-center gap-2'><span><FaLocationDot /></span>Location</h1>
                    <p>{formData.city} - {formData.state} - {formData.country}</p>
                </div>
            </div>
        </div>
    );
}

export default CandidateProfile;
