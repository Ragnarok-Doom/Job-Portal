import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'
import LoginForm from './LoginForm';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const RegistrationForm = () => {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [formData, setFormData] = useState({  
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const isValidInput = input => {
        return input.trim() !== '';
    };
    const isValidEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleContinue = async () => {
        const { name, email } = formData;
        const newErrors = {};
        // name email error
        if (!isValidEmail(email)) newErrors.email = 'Invalid email format.';
        if (!name.trim()) newErrors.name = 'write valid name.';

        try {
            const response = await axios.post("http://localhost:5000/api/auth/check", formData)
            if(response.data.exists){
                newErrors.email = 'Email already exist !'
                setErrors(newErrors)
                return
            }
            
        } catch (error) {
            console.log(error);
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setStep(2);
    };

    const handleSubmit = async e => {
        e.preventDefault();
    
        const { password, confirmPassword } = formData;
        const newErrors = {};
    
        if (!isValidInput(password)) newErrors.password = 'Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        if (!isValidInput(confirmPassword)) newErrors.confirmPassword = 'Confirm Password is required and must not be empty or contain only spaces.';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);
            if (response.status === 201) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                setErrors({});
                toast.success("Register successful!");
                navigate('/role');
                const registrationId = response.data.userId;
                Cookies.set('registrationId', registrationId)
                Cookies.set('Register', registrationId, { expires: 7 })
            }
        } catch (error) {
            console.error(error);
            alert('Registration failed!');
        }
    };

    if (showLoginForm) {
        return <LoginForm />;
    }


    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit}>
                <div className=' w-[350px] h-auto flex flex-col gap-3 p-6 text-black rounded-lg'>
                    {step === 1 && (
                        <>
                            <div className='flex justify-center'>
                                <h1 className='text-[30px] font-extrabold'>Create your account</h1>
                            </div>
                            <div className='inputBx flex flex-col relative'>
                                <label className=' absolute text-[15px] bg-white px-[10px] left-4'>Name</label>
                                <input type='text' name='name' autoComplete='false' required
                                    onChange={handleChange}
                                    value={formData.name}
                                    pattern="^[A-Za-z]+( [A-Za-z]+)*$" 
                                    className='text-black' />
                                {errors.name && <div className="text-[12px] font-semibold text-red-500">{errors.name}</div>}
                            </div>
                            <div className='inputBx flex flex-col relative'>
                                <label className=' absolute text-[15px] bg-white px-[10px] left-4'>Email</label>
                                <input type='email' name='email' required
                                onChange={handleChange}
                                value={formData.email}
                                placeholder=' ' />
                                {errors.email && <div className="text-[12px] font-semibold text-red-500">{errors.email}</div>}
                            </div>
                            <div className='flex items-center justify-center'>
                                <button type='button' name='continue'
                                    onClick={handleContinue}
                                    className='text-white w-full py-4 rounded-[10px] bg-green-600 font-black'>Continue</button>
                            </div>
                            <div className=' text-center'>
                                <h5>Already have an account? <span className=' text-green-600 font-bold cursor-pointer' onClick={() => setShowLoginForm(true)}> Login</span></h5>
                            </div>
                            <div className='mt-8 relative flex flex-col items-center justify-center'>
                                <hr className='w-full h-[2px] bg-gray-300' />
                                <h6 className='absolute text-[10px] bg-white px-[10px]'>OR</h6>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className='flex gap-3 my-5'>
                                <span name='back' onClick={() => setStep(1)} className='flex items-center gap-3 w-fit'>
                                    <svg className=' w-[20px] cursor-pointer'
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="#25b658" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
                                    <p className=' cursor-pointer'>Back</p>
                                </span>
                            </div>
                            <div className='inputBx flex flex-col relative'>
                                <label className=' absolute text-[15px] bg-white px-[10px] left-4'>Password</label>
                                <input type={showPassword ? 'text' : 'password'} name='password' maxLength={16} autoComplete='false'
                                    onChange={handleChange}
                                    value={formData.password}
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                                    title="Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                                    className='text-black' />
                                    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={() => setShowPassword(!showPassword)}></i>
                                {errors.password && <div className="text-[12px] font-semibold text-red-500">{errors.password}</div>}
                            </div>
                            <div className='inputBx flex flex-col relative'>
                                <label className=' absolute text-[15px] bg-white px-[10px] left-4'>Confirm Password</label>
                                <input type={showConfirmPassword ? 'text' : 'password'} name='confirmPassword' maxLength={16} autoComplete='false'
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                    className='text-black' />
                                    <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                                {errors.confirmPassword && <div className="text-[12px] font-semibold text-red-500">{errors.confirmPassword}</div>}
                            </div>
                            <div className='flex items-center justify-center'>
                                <button type='submit' name='submit'
                                className='text-white w-full py-4 rounded-[10px] bg-green-600 font-black'>Submit</button>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
