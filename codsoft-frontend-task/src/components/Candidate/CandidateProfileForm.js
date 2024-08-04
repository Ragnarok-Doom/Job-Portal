import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import profile from '../assets/img.png';


function CandidateProfileForm() {

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
        interest: ''
    });

    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        const userId = Cookies.get('registrationId');
        if (userId) {
            axios.get(`http://localhost:5000/api/auth/rolecandifetchform/${userId}`)
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
                        interest: data.interest || ''
                    });

                    const imageUrl = data.photo ? `http://localhost:5000/${data.photo}` : profile;
                    setProfileImage(imageUrl);
                    
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            photo: file
        });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.contact || !/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Contact should be a 10-digit number';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.headline) newErrors.headline = 'Headline is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.skills) newErrors.skills = 'Skills are required';
        if (!formData.qualification) newErrors.qualification = 'Highest Qualification is required';
        if (!formData.percentage || isNaN(formData.percentage)) newErrors.percentage = 'Valid Highest Qualification Marks/Percentage is required';
        if (!formData.position) newErrors.position = 'Current Position is required';
        if (!formData.course) newErrors.course = 'Course is required';
        if (!formData.college) newErrors.college = 'College/School Name is required';
        if (!formData.interest) newErrors.interest = 'Interest is required';
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
                await axios.post(`http://localhost:5000/api/auth/updaterolecandi/${userId}`, formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success('Profile updated successfully');
            } catch (error) {
                toast.error('Error updating profile');
                console.error('Error updating profile:', error.response ? error.response.data : error.message);
            }
        }
    };

  return (
    <div className='container'>
            <h1 className=' m-0 text-2xl'>Update your Profile</h1>
            <form onSubmit={handleSubmit} className=' mt-3'>
                <div className=' w-full flex flex-wrap gap-5'>
                <div className='w-[96%] flex gap-3 items-center'>
                        <div className='w-[150px] h-[150px] rounded-md bg-slate-200'>
                            <img src={profileImage || profile} className='w-full h-full object-cover' alt='Profile' />
                        </div>
                        <div className='flex flex-col gap-3 w-[50%]'>
                            <label>Profile Image</label>
                            <input type='file' id='photo' name='photo' onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className=' w-[47%] form-group flex flex-col gap-2'>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' id='firstName' name='firstName' value={formData.firstName} onChange={handleChange}
                        className=' border-black outline-none p-3 border rounded-lg'
                        />
                        {errors.firstName && <span className='error'>{errors.firstName}</span>}
                    </div>
                    <div className=' w-[47%] form-group flex flex-col gap-2'>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input type='text' id='lastName' name='lastName' value={formData.lastName} onChange={handleChange}
                        className=' border-black outline-none p-3 border rounded-lg'
                        />
                        {errors.lastName && <span className='error'>{errors.lastName}</span>}
                    </div>
                    <div className=' w-[47%] form-group flex flex-col gap-2'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' name='email' value={formData.email} onChange={handleChange}
                        className=' border-black outline-none p-3 border rounded-lg'
                        />
                        {errors.email && <span className='error'>{errors.email}</span>}
                    </div>
                    <div className=' w-[47%] form-group flex flex-col gap-2'>
                        <label htmlFor='contact'>Contact:</label>
                        <input type='text' id='contact' name='contact' maxLength={10} value={formData.contact} onChange={handleChange}
                        className=' border-black outline-none p-3 border rounded-lg'
                        />
                        {errors.contact && <span className='error'>{errors.contact}</span>}
                    </div>
                
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='city'>City:</label>
                    <input type='text' id='city' name='city' value={formData.city} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'
                    />
                    {errors.city && <span className='error'>{errors.city}</span>}
                </div>
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='state'>State:</label>
                    <input type='text' id='state' name='state' value={formData.state} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'
                    />
                    {errors.state && <span className='error'>{errors.state}</span>}
                </div>
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='country'>Country:</label>
                    <input type='text' id='country' name='country' value={formData.country} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'
                    />
                    {errors.country && <span className='error'>{errors.country}</span>}
                </div>
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='headline'>Headline:</label>
                    <input type='text' id='headline' name='headline' value={formData.headline} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'
                    />
                    {errors.headline && <span className='error'>{errors.headline}</span>}
                </div>
                <div className=' w-[96%] form-group flex flex-col gap-2'>
                    <label htmlFor='description'>Description:</label>
                    <textarea id='description' rows={4} name='description' value={formData.description} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'></textarea>
                    {errors.description && <span className='error'>{errors.description}</span>}
                </div>
                <div className=' w-[96%] form-group flex flex-col gap-2'>
                    <label htmlFor='skills'>Skills:</label>
                    <input type='text' id='skills' name='skills' value={formData.skills} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'
                    />
                    {errors.skills && <span className='error'>{errors.skills}</span>}
                </div>
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='qualification'>Highest Qualification:</label>
                    <select id='qualification' name='qualification' value={formData.qualification} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'>
                        <option selected disabled>Select</option>
                        <option value='Diploma'>Diploma</option>
                        <option value='PHD'>PHD</option>
                        <option value='Masters'>Masters</option>
                        <option value='Backelors'>Backelors</option>
                        <option value='Higher Secondary'>Higher Secondary</option>
                        <option value='High School'>High School</option>
                    </select>
                    {errors.qualification && <span className='error'>{errors.qualification}</span>}
                </div>
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='percentage'>Highest Qualification Marks/Percentage:</label>
                    <input type='text' id='percentage' name='percentage' value={formData.percentage} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'
                    />
                    {errors.percentage && <span className='error'>{errors.percentage}</span>}
                </div>
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='position'>Current Position:</label>
                    <select id='position' name='position' value={formData.position} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'>
                        <option selected disabled>Select</option>
                        <option value='Fresher'>Fresher</option>
                        <option value='Experienced'>Experienced</option>
                        <option value='College Student'>College Student</option>
                        <option value='School Student'>School Student</option>
                    </select>
                    {errors.position && <span className='error'>{errors.position}</span>}
                </div>
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='course'>Course:</label>
                    <select id='course' name='course' value={formData.course} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'>
                        <option selected disabled>Select</option>
                        <option value='M. Tech'>M. Tech</option>
                        <option value='MCA'>MCA</option>
                        <option value='MBA'>MBA</option>
                        <option value='MCOM'>MCOM</option>
                        <option value='MVOC'>MVOC</option>
                        <option value='Msc Computer Science'>Msc Computer Science</option>
                        <option value='Msc Physics'>Msc Physics</option>
                        <option value='Msc Chemistry'>Msc Chemistry</option>
                        <option value='Msc Maths'>Msc Maths</option>
                        <option value='B. Tech'>B. Tech</option>
                        <option value='BCA'>BCA</option>
                        <option value='BBA'>BBA</option>
                        <option value='BCOM'>BCOM</option>
                        <option value='BVOC'>BVOC</option>
                        <option value='Bsc Computer Science'>Bsc Computer Science</option>
                        <option value='Bsc Physics'>Bsc Physics</option>
                        <option value='Bsc Chemistry'>Bsc Chemistry</option>
                        <option value='Bsc Maths'>Bsc Maths</option>
                    </select>
                    {errors.course && <span className='error'>{errors.course}</span>}
                </div>
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='college'>College/School Name:</label>
                    <input type='text' id='college' name='college' value={formData.college} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'
                    />
                    {errors.college && <span className='error'>{errors.college}</span>}
                </div>
                <div className=' w-[47%] form-group flex flex-col gap-2'>
                    <label htmlFor='interest'>Interest:</label>
                    <select id='interest' name='interest' value={formData.interest} onChange={handleChange}
                    className=' border-black outline-none p-3 border rounded-lg'>
                        <option selected disabled>Select</option>
                        <option value='IT Services and IT Consulting'>IT Services and IT Consulting</option>
                        <option value='Hospitals and Healthcare'>Hospitals and Healthcare</option>
                        <option value='Accounting'>Accounting</option>
                        <option value='Technology, Information and Interest'>Technology, Information and Interest</option>
                        <option value='Staffing and Recruiting'>Staffing and Recruiting</option>
                        <option value='Advertising Services'>Advertising Services</option>
                    </select>
                    {errors.interest && <span className='error'>{errors.interest}</span>}
                </div>
                </div>
                <button type='submit' className='btn w-[96%] py-3 bg-green-500 rounded-xl text-white font-black text-xl mt-3'>Submit</button>
            </form>
        </div>
  )
}

export default CandidateProfileForm
