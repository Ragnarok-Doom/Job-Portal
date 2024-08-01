import React, { useEffect, useState } from 'react'
import hiring from '../assets/human-resources.png'
import job from '../assets/job-exploration.png'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/shirt.png'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

function RoleForm() {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
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

     // Retrieve the userId from cookies or other storage
     const userId = Cookies.get('Register');

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
                case 'address':
                    if (value.length > 100) {
                        error = 'Address cannot exceed 100 characters';
                    }
                    break;
                case 'companyName':
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
        setErrors({ ...errors, [name]: error });
    };
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

    // JOB POST
    const handleJob = async (e) => {
        e.preventDefault();
        const { firstName, lastName, companyEmail, companyContact, companyName, companyRole, companyAddress, country, state } = formJob;

        // Check for blank fields and update errors
        let blankError = {};
        if (isValidInput(firstName)) blankError.firstName = 'First Name cannot be empty';
        if (isValidInput(lastName)) blankError.lastName = 'Last Name cannot be empty';
        if (isValidInput(companyEmail)) blankError.email = 'Email cannot be empty';
        if (isValidInput(companyContact)) blankError.contact = 'Contact cannot be empty';
        if (isValidInput(companyName)) blankError.companyName = 'Company Name cannot be empty';
        if (isValidInput(companyAddress)) blankError.address = 'Address cannot be empty';
        if (isValidInput(country)) blankError.country = 'Country cannot be empty';
        if (isValidInput(state)) blankError.state = 'State cannot be empty';
        if (isValidInput(companyRole)) blankError.companyRole = 'Select Role cannot be empty';

        // Set all errors
        setErrors(blankError);

        // Prevent submission if there are errors
        if (Object.keys(blankError).length > 0) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/rolejob', { ...formJob, userId }); // Include userId in the request payload
            if (response.status === 201) {
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
                    userId: ''  // Clear userId after submission
                });
                setErrors({});
                toast.success("Registration process completed successfully!");
                navigate('/dash-hire');
                // No need to set the cookie here, as it's already set earlier
            }
        } catch (error) {
            console.log(error);
        }
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
            const response = await axios.post('http://localhost:5000/api/auth/rolecandi', formCandi);
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
                Cookies.set('Candi', response.data.userId, { expires: 7 });
            }
        } catch (error) {
            console.log(error);
        }

    }


  return (
    <>
    { step === 1 &&
    <div className='roleSection w-[100vw] h-[100vh] flex justify-center gap-20 items-center'>
        <div className=' w-[20%] flex flex-col items-center justify-center gap-10'>
            <img src={hiring} alt='' />
            <button onClick={() => setStep(2)} className=' border-[1px] border-black w-[80%] py-4  rounded-[30px] font-normal hover:text-white'>Looking for Employee</button>
        </div>
        <div className=' w-[20%] flex flex-col items-center justify-center gap-10'>
            <img src={job} alt='' />
            <button onClick={() => setStep(3)} className=' border-[1px] border-black w-[80%] py-4  rounded-[30px] font-normal hover:text-white'>Looking for Job</button>
        </div>
    </div>
    }

    { step !== 1 &&
    <div className=' w-full h-fit flex justify-between p-3 overflow-hidden'>
        <span onClick={() => setStep(1)} name='back' className='flex items-center gap-3 w-fit'>
            <svg className=' w-[20px] cursor-pointer'
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#25b658" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
            <p className=' cursor-pointer'>Back</p>
        </span>
        <img src={logo} alt='' onClick={() => navigate('/')} className=' cursor-pointer w-[7%]' />
    </div>
    }

    { step === 2 &&
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
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <input type='submit' value='Submit' className=' bg-green-400 text-white font-black mt-5 cursor-pointer hover:bg-green-500' onClick={handleJob} />
                    </div>
                </form>
            </div>
        </div>
    </div>
    }

    { step === 3 &&
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
                        <label>Headline</label>
                        <input type='text' name='headline' required 
                        value={formCandi.headline}
                        onChange={handleChangeCandi}
                        />
                        {errorscandi.headline && (<p className=' text-red-500 text-sm'>{errorscandi.headline}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Interest</label>
                        <select name='interest' value={formCandi.interest} onChange={handleChangeCandi} required>
                            <option selected disabled>Select</option>
                            <option>IT Services and IT Consulting</option>
                            <option>Hospitals and Healthcare</option>
                            <option>Accounting</option>
                            <option>Technology, Information and Interest</option>
                            <option>Staffing and Recruiting</option>
                            <option>Advertising Services</option>
                        </select>
                        {errorscandi.interest && (<p className=' text-red-500 text-sm'>{errorscandi.interest}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Highest Qualification</label>
                        <select name='qualification' value={formCandi.qualification} onChange={handleChangeCandi} required>
                            <option selected disabled>Select</option>
                            <option>Diploma</option>
                            <option>PHD</option>
                            <option>Masters</option>
                            <option>Backelors</option>
                            <option>Higher Secondary</option>
                            <option>High School</option>
                        </select>
                        {errorscandi.qualification && (<p className=' text-red-500 text-sm'>{errorscandi.qualification}</p>)}
                    </div>
                    <div className='role-inputGroup flex flex-col gap-2 w-[35%]'>
                        <label>Course</label>
                        <select name='course' value={formCandi.course} onChange={handleChangeCandi} required>
                            <option selected disabled>Select</option>
                            <option>M. Tech</option>
                            <option>MCA</option>
                            <option>MBA</option>
                            <option>MCOM</option>
                            <option>MVOC</option>
                            <option>Msc Computer Science</option>
                            <option>Msc Physics</option>
                            <option>Msc Chemistry</option>
                            <option>Msc Maths</option>
                            <option>B. Tech</option>
                            <option>BCA</option>
                            <option>BBA</option>
                            <option>BCOM</option>
                            <option>BVOC</option>
                            <option>Bsc Computer Science</option>
                            <option>Bsc Physics</option>
                            <option>Bsc Chemistry</option>
                            <option>Bsc Maths</option>
                        </select>
                        {errorscandi.course && (<p className=' text-red-500 text-sm'>{errorscandi.course}</p>)}
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
                        <label>Current Position</label>
                        <select name='position' value={formCandi.position} onChange={handleChangeCandi} required>
                            <option selected disabled>Select</option>
                            <option>Fresher</option>
                            <option>Experienced</option>
                            <option>College Student</option>
                            <option>School Student</option>
                        </select>
                        {errorscandi.position && (<p className=' text-red-500 text-sm'>{errorscandi.position}</p>)}
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
    }
    </>
  )
}

export default RoleForm
