import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import hiring from '../assets/human-resources.png'

function RoleHireForm({ registrationId }) {

    const navigate = useNavigate()
    const [formJob, setFormJob] = useState({
        firstName: '',
        lastName: '',
        companyEmail: '',
        companyContact: '',
        companyName: '',
        companyRole: 'Select',
        companyAddress: '',
        country: '',
        state: '',
    });
    const [errors, setErrors] = useState({});

    // HIREJOB INPUTS & ERRORS VALIDATION
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormJob({ ...formJob, [name]: value });

        // Validation logic
        let error = '';
        if (value.startsWith(' ')) {
            error = 'First character cannot be a space';
        } else {
            switch (name) {
                case 'firstName':
                case 'lastName':
                    if (!/^[a-zA-Z]*$/.test(value)) {
                        error = 'Only characters are allowed';
                    }
                    break;
                case 'companyContact':
                    if (!/^\d*$/.test(value) || value.length !== 10) {
                        error = 'Only digits are allowed and must be 10 digits';
                    }
                    break;
                case 'companyEmail':
                    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
                        error = 'Invalid email address';
                    }
                    break;
                case 'companyAddress':
                    if (value.length > 100) {
                        error = 'Address cannot exceed 100 characters';
                    }
                    break;
                case 'companyName':
                case 'country':
                case 'state':
                    if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(value)) {
                        error = 'Only characters are allowed';
                    }
                    break;
                default:
                    break;
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    const isValidInput = (inputName) => {
        return inputName.trim() === '' || inputName === 'Select';
    };

    // JOB POST
    const handleJob = async (e) => {
        e.preventDefault();
        const { firstName, lastName, companyEmail, companyContact, companyName, companyRole, companyAddress, country, state } = formJob;

        // Check for blank fields and update errors
        let blankError = {};
        if (isValidInput(firstName)) blankError.firstName = 'First Name cannot be empty';
        if (isValidInput(lastName)) blankError.lastName = 'Last Name cannot be empty';
        if (isValidInput(companyEmail)) blankError.companyEmail = 'Email cannot be empty';
        if (isValidInput(companyContact)) blankError.companyContact = 'Contact cannot be empty';
        if (isValidInput(companyName)) blankError.companyName = 'Company Name cannot be empty';
        if (isValidInput(companyAddress)) blankError.companyAddress = 'Address cannot be empty';
        if (isValidInput(country)) blankError.country = 'Country cannot be empty';
        if (isValidInput(state)) blankError.state = 'State cannot be empty';
        if (isValidInput(companyRole)) blankError.companyRole = 'Select Role cannot be empty';

        // Set all errors
        setErrors(blankError);

        // Prevent submission if there are errors
        if (Object.keys(blankError).length > 0) {
            Object.values(blankError).forEach(error => toast.error(error));
            return;
        }

        // Retrieve the userId from cookies or other storage
        try {
            const response = await axios.post('http://localhost:5000/api/auth/rolehire', { ...formJob, _id: registrationId}); 
            if (response.status === 201) {
                console.log('Role hire form submitted', response.data);
                setFormJob({
                    firstName: '',
                    lastName: '',
                    companyEmail: '',
                    companyContact: '',
                    companyName: '',
                    companyRole: 'Select',
                    companyAddress: '',
                    country: '',
                    state: '',
                });
                setErrors({});
                toast.success("Registration process completed successfully!");
                navigate('/dash-hire');
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while submitting the form.");
        }
    };

    return (
        <div className=' w-full relative h-full overflow-hidden mb-5'>
            <div className=''>
                <div className=' flex gap-4 justify-center items-center'>
                    <img src={hiring} alt='' className=' w-[5%]' />
                    <h1 className=' text-2xl'><u>Create account <font className=' text-green-500 font-bold'> to post a job</font></u></h1>
                </div>
                <div className='flex justify-center'>
                    <form className='role-form mt-5 w-[60%] flex justify-center flex-wrap gap-3'>
                        <div></div>
                        <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                            <label>First Name</label>
                            <input type='text' name='firstName' 
                            value={formJob.firstName} 
                            onChange={handleChange} required />
                            {errors.firstName && (<p className=' text-red-600 text-sm'>{errors.firstName}</p>)}
                        </div>
                        <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                            <label>Last Name</label>
                            <input type='text' name='lastName' required 
                            value={formJob.lastName}
                            onChange={handleChange}
                            />
                            {errors.lastName && (<p className=' text-red-600 text-sm'>{errors.lastName}</p>)}
                        </div>
                        <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                            <label>Email</label>
                            <input type='email' name='companyEmail' required 
                            value={formJob.companyEmail}
                            onChange={handleChange}
                            />
                            {errors.companyEmail && (<p className=' text-red-600 text-sm'>{errors.companyEmail}</p>)}
                        </div>
                        <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                            <label>Contact Number</label>
                            <input type='text' name='companyContact' maxLength={10} required 
                            value={formJob.companyContact}
                            onChange={handleChange}
                            />
                            {errors.companyContact && (<p className=' text-red-600 text-sm'>{errors.companyContact}</p>)}
                        </div>
                        <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                            <label>Company Name</label>
                            <input type='text' name='companyName' required 
                            value={formJob.companyName}
                            onChange={handleChange}
                            />
                            {errors.companyName && (<p className=' text-red-600 text-sm'>{errors.companyName}</p>)}
                        </div>
                        <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                            <label>Company Role</label>
                            <select name='companyRole' value={formJob.companyRole} onChange={handleChange} required>
                                <option selected disabled>Select</option>
                                <option>IT Services and IT Consulting</option>
                                <option>Hospitals and Healthcare</option>
                                <option>Accounting</option>
                                <option>Technology, Information and Interest</option>
                                <option>Staffing and Recruiting</option>
                                <option>Advertising Services</option>
                            </select>
                            {errors.companyRole && (<p className=' text-red-600 text-sm'>{errors.companyRole}</p>)}
                        </div>
                        <div className='role-inputGroup flex flex-col gap-2 w-[70%]'>
                            <label>Office Address</label>
                            <textarea name='companyAddress' required
                            value={formJob.companyAddress}
                            onChange={handleChange}
                            ></textarea>
                            {errors.companyAddress && (<p className=' text-red-600 text-sm'>{errors.companyAddress}</p>)}
                        </div>
                        <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                            <label>Country (Office Location)</label>
                            <input type='text' name='country' required
                            value={formJob.country} 
                            onChange={handleChange} />
                            {errors.country && (<p className=' text-red-600 text-sm'>{errors.country}</p>)}
                        </div>
                        <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                            <label>State (Office Location)</label>
                            <input type='text' name='state' required 
                            value={formJob.state}
                            onChange={handleChange}
                            />
                            {errors.state && (<p className=' text-red-600 text-sm'>{errors.state}</p>)}
                        </div>
                        <div className=' flex gap-3 w-[70%] justify-end'>
                            <button type='button' className=' w-[100%] bg-green-500 p-3 rounded-lg text-white' onClick={handleJob}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RoleHireForm
