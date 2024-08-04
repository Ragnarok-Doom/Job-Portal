import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import job from '../assets/job-exploration.png'



function RoleCandiForm({ registrationId }) {

    const navigate = useNavigate()
    const [formCandi, setFormCandi] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        headline: '',
        interest: 'Select',
        qualification: 'Select',
        course: 'Select',
        percentage: '',
        position: 'Select',
        country: '',
        state: '',
    });
    const [errorscandi, setErrorscandi] = useState({});

    
    // CANDI INPUTS & ERRORS VALIDATION
    const handleChangeCandi = (e) => {
        const { name, value } = e.target;
        setFormCandi({ ...formCandi, [name]: value });
        
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
                case 'contact':
                    if (!/^\d*$/.test(value) || value.length > 10) {
                        error = 'Only digits are allowed and must be 10 digits';
                    }
                    break;
                case 'email':
                    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value))
                    {
                        error = 'Invalid email address';
                    }
                    break;
                case 'percentage':
                    if (!/^\d*\.?\d*$/.test(value))
                    {
                        error = 'Only digits and one dot are allowed!';
                    }
                    break;
                case 'headline':
                    if (value.length > 50) {
                        error = 'Headline cannot exceed 50 characters';
                    }
                    break;
                case 'country':
                case 'state':
                    if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(value)) {
                        error = 'Only characters are allowed!';
                    }
                    break;
                default:
                    break;
            }
        }
        setErrorscandi({ ...errorscandi, [name]: error });
    };

    const isValidInput = (inputName) => {
        return inputName.trim() === '' || inputName === 'Select';
    };

    
    const handleCandidate = async (e) => {
        e.preventDefault()
        const { firstName, lastName, email, contact, headline, interest, qualification, course, percentage, position, country, state } = formCandi;
        // Check for blank fields and update errors
        let blankErrorcandi = {};
        if (isValidInput(firstName)) blankErrorcandi.firstName = 'First Name cannot be empty';
        if (isValidInput(lastName)) blankErrorcandi.lastName = 'Last Name cannot be empty';
        if (isValidInput(email)) blankErrorcandi.email = 'Email cannot be empty';
        if (isValidInput(contact)) blankErrorcandi.contact = 'Contact cannot be empty';
        if (isValidInput(headline)) blankErrorcandi.headline = 'Headline cannot be empty';
        if (isValidInput(interest)) blankErrorcandi.interest = 'Select your interest';
        if (isValidInput(qualification)) blankErrorcandi.qualification = 'Select your qualification';
        if (isValidInput(course)) blankErrorcandi.course = 'Select your course';
        if (isValidInput(percentage)) blankErrorcandi.percentage = 'Percentage cannot be empty';
        if (isValidInput(position)) blankErrorcandi.position = 'Position cannot be empty';
        if (isValidInput(country)) blankErrorcandi.country = 'Country cannot be empty';
        if (isValidInput(state)) blankErrorcandi.state = 'State cannot be empty';

        // Set all errors
        setErrorscandi(blankErrorcandi);

        // Prevent submission if there are errors
        if (Object.keys(blankErrorcandi).length > 0) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/rolecandi', { ...formCandi, _id: registrationId });
            if (response.status === 201) {
                setFormCandi({
                    firstName: '',
                    lastName: '',
                    email: '',
                    contact: '',
                    headline: '',
                    interest: 'Select',
                    qualification: 'Select',
                    course: 'Select',
                    percentage: '',
                    position: 'Select',
                    country: '',
                    state: '',
                });
                setErrorscandi({});
                toast.success("Registeration process completed successful!");
                navigate('/dash-candi');
                // Cookies.set('Candi', response.data.userId, { expires: 7 });
            }
        } catch (error) {
            console.log(error);
        }

    }

  return (
    <div className=' w-full relative h-full overflow-hidden mb-5'>
        <div className=''>
            <div className=' flex gap-4 justify-center items-center'>
                <img src={job} alt='' className=' w-[5%]' />
                <h1 className=' text-2xl'><u>Create account <font className=' text-green-500 font-bold'> to find a job</font></u></h1>
            </div>
            <div className='flex justify-center'>
                <form className=' mt-5 w-[60%] flex justify-center flex-wrap gap-3'>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>First Name</label>
                        <input type='text' name='firstName' required 
                        value={formCandi.firstName}
                        onChange={handleChangeCandi}
                        />
                        {errorscandi.firstName && (<p className=' text-red-500 text-sm'>{errorscandi.firstName}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Last Name</label>
                        <input type='text' name='lastName' required 
                        value={formCandi.lastName}
                        onChange={handleChangeCandi}
                        />
                        {errorscandi.lastName && (<p className=' text-red-500 text-sm'>{errorscandi.lastName}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Email</label>
                        <input type='text' name='email' required 
                        value={formCandi.email}
                        onChange={handleChangeCandi}
                        />
                        {errorscandi.email && (<p className=' text-red-500 text-sm'>{errorscandi.email}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Contact Number</label>
                        <input type='text' name='contact' maxLength={10} required 
                        value={formCandi.contact}
                        onChange={handleChangeCandi}
                        />
                        {errorscandi.contact && (<p className=' text-red-500 text-sm'>{errorscandi.contact}</p>)}
                    </div>
                    
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Current Position</label>
                        <select name='position' value={formCandi.position} onChange={handleChangeCandi} required>
                            <option selected disabled>Select</option>
                            <option value='Fresher'>Fresher</option>
                            <option value='Experienced'>Experienced</option>
                            <option value='College Student'>College Student</option>
                            <option value='School Student'>School Student</option>
                        </select>
                        {errorscandi.position && (<p className=' text-red-500 text-sm'>{errorscandi.position}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Interest</label>
                        <select name='interest' value={formCandi.interest} onChange={handleChangeCandi} required>
                            <option selected disabled>Select</option>
                            <option value='IT Services and IT Consulting'>IT Services and IT Consulting</option>
                            <option value='Hospitals and Healthcare'>Hospitals and Healthcare</option>
                            <option value='Accounting'>Accounting</option>
                            <option value='Technology, Information and Interest'>Technology, Information and Interest</option>
                            <option value='Staffing and Recruiting'>Staffing and Recruiting</option>
                            <option value='Advertising Services'>Advertising Services</option>
                        </select>
                        {errorscandi.interest && (<p className=' text-red-500 text-sm'>{errorscandi.interest}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Highest Qualification</label>
                        <select name='qualification' value={formCandi.qualification} onChange={handleChangeCandi} required>
                            <option selected disabled>Select</option>
                            <option value='Diploma'>Diploma</option>
                            <option value='PHD'>PHD</option>
                            <option value='Masters'>Masters</option>
                            <option value='Backelors'>Backelors</option>
                            <option value='Higher Secondary'>Higher Secondary</option>
                            <option value='High School'>High School</option>
                        </select>
                        {errorscandi.qualification && (<p className=' text-red-500 text-sm'>{errorscandi.qualification}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Course</label>
                        <select name='course' value={formCandi.course} onChange={handleChangeCandi} required>
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
                        {errorscandi.course && (<p className=' text-red-500 text-sm'>{errorscandi.course}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Headline</label>
                        <input type='text' name='headline' required 
                        value={formCandi.headline}
                        onChange={handleChangeCandi}
                        />
                        {errorscandi.headline && (<p className=' text-red-500 text-sm'>{errorscandi.headline}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Percentage / CGPA</label>
                        <input type='text' name='percentage' required 
                        value={formCandi.percentage}
                        onChange={handleChangeCandi}
                        />
                        {errorscandi.percentage && (<p className=' text-red-500 text-sm'>{errorscandi.percentage}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Country</label>
                        <input type='text' name='country' required 
                        value={formCandi.country}
                        onChange={handleChangeCandi}
                        />
                        {errorscandi.country && (<p className=' text-red-500 text-sm'>{errorscandi.country}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>State</label>
                        <input type='text' name='state' required 
                        value={formCandi.state}
                        onChange={handleChangeCandi}
                        />
                        {errorscandi.state && (<p className=' text-red-500 text-sm'>{errorscandi.state}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <input type='submit' value='Submit' className=' bg-green-400 text-white font-black cursor-pointer mt-5 hover:bg-green-500' onClick={handleCandidate} />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RoleCandiForm
