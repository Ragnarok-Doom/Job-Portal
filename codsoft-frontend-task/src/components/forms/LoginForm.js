import React, {  useState } from 'react';
import RegistrationForm from './RegistrationForm';
import ConfirmPasswordForm from './ConfirmPasswordForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

function LoginForm() {
    const [errors, setErrors] = useState({});
    const [signUpForm, setShowSignUpForm] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    // const Register = Cookies.get('Register')
    // const HireJob = Cookies.get('HireJob')
    // const Candi = Cookies.get('Candi')

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const isValidInput = input => input.trim() !== '';

    const isValidEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = password => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return passwordRegex.test(password);
    };

    const handleLogin = async e => {
        e.preventDefault(); // Prevent default form submission
        const { password, email } = formData;
        const newErrors = {};
        
        // Validate email
        if (!isValidEmail(email)) newErrors.email = 'Invalid email.';
    
        // Validate password
        if (!isValidInput(password)) {
            newErrors.password = 'Password is required and must not be empty or contain only spaces.';
        } else if (!isValidPassword(password)) {
            newErrors.password = 'Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);
            if (response.status === 200) {
                const { userType } = response.data;
                toast.success("Welcome Back!");
                if (userType === 'RoleJob') {
                    navigate('/dash-hire');
                } else if (userType === 'RoleCandi') {
                    navigate('/dash-candi');
                } else if (userType === 'User') {
                    navigate('/role');
                }
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.field) {
                setErrors({ [error.response.data.field]: error.response.data.message });
            } else {
                setErrors({ general: 'Invalid email or password' });
            }
        }
    };
    
    

    if (signUpForm) {
        return <RegistrationForm />;
    }
    if (forgot) {
        return <ConfirmPasswordForm />;
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <form onSubmit={handleLogin}>
                <div className='w-[350px] h-auto flex flex-col gap-3 p-6 text-black rounded-lg'>
                    <div className='flex justify-center'>
                        <h1 className='text-[30px] font-extrabold'>Login your account</h1>
                    </div>
                    <div className='inputBx flex flex-col relative'>
                        <label className='absolute text-[15px] bg-white px-[10px] left-4 top-[-10px]'>Email</label>
                        <input 
                            type='email' 
                            name='email' 
                            autoComplete='off' 
                            autoFocus
                            required
                            onChange={handleChange}
                            value={formData.email}
                            className='text-black' 
                        />
                        {errors.email && <div className="text-[12px] font-semibold text-red-500">{errors.email}</div>}
                    </div>
                    <div className='inputBx flex flex-col relative'>
                        <label className='absolute text-[15px] bg-white px-[10px] left-4 top-[-10px]'>Password</label>
                        <input 
                            type='password' 
                            name='password' 
                            autoComplete='off'  
                            required
                            onChange={handleChange}
                            value={formData.password}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                            title="Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                        />
                        {errors.password && <div className="text-[12px] font-semibold text-red-500">{errors.password}</div>}
                    </div>
                    {errors.general && <div className="text-[12px] font-semibold text-red-500">{errors.general}</div>}
                    <div className='flex items-center justify-center'>
                        <button 
                            type='submit'
                            className='text-white w-full py-4 rounded-[10px] bg-green-600 font-black'
                        >
                            Login
                        </button>
                    </div>
                    <div className='text-center'>
                        <h5>Don't have an account? <span className='text-green-600 font-bold cursor-pointer' onClick={() => setShowSignUpForm(true)}> Sign Up</span></h5>
                        <span className='text-blue-600 text-[13px] cursor-pointer font-bold' onClick={() => setForgot(true)}>Forgot Password</span>
                    </div>
                    <div className='mt-8 relative flex flex-col items-center justify-center'>
                        <hr className='w-full h-[2px] bg-gray-300' />
                        <h6 className='absolute text-[10px] bg-white px-[10px]'>OR</h6>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
