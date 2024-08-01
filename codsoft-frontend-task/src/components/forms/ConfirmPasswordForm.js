import React, { useEffect, useState } from 'react';
import padLock from '../assets/padlock.png';
import LoginForm from './LoginForm';
import axios from 'axios';

function ConfirmPasswordForm() {
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [backLogin, setBackLogin] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
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

    const isValidInput = input => input.trim() !== '';
    const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password => password.length >= 6;
    const passwordsMatch = (password, confirmPassword) => password === confirmPassword;

    useEffect(() => {
        if (isTimerActive && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsResendEnabled(true);
        }
    }, [isTimerActive, timeLeft]);

    const handleSendOtp = async e => {
        e.preventDefault()
        const { email } = formData;
        const newErrors = {};

        if (!isValidEmail(email)) newErrors.email = 'Invalid email format.';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot', formData)
            if(response.status === 200){
                setStep(2);
                setIsTimerActive(true);
                setTimeLeft(120); // Reset the timer
                setIsResendEnabled(false); // Ensure resend is disabled when sending a new OTP
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.field){
                setErrors({ [error.response.data.field]: error.response.data.message })
            }else{
                setErrors({ general: 'Invalid email or password' });
                console.log(error);
            }
        }

        
    };

    const handleResendOtp = () => {
        alert('OTP resent');
        setIsResendEnabled(false);
        setTimeLeft(120);
        setIsTimerActive(true);
    };

    const movePassword = () => {
        const { otp } = formData;
        const newErrors = {};

        if (!isValidInput(otp)) newErrors.otp = 'Invalid OTP.';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setStep(3);
    };

    const handleBack = () => {
        setIsTimerActive(false);
        setTimeLeft(0); // Reset the timer display
        setStep(1);
    };

    const handleSubmit = () => {
        const { password, confirmPassword } = formData;
        const newErrors = {};

        if (!isValidPassword(password)) newErrors.password = 'Password must be at least 6 characters long.';
        if (!passwordsMatch(password, confirmPassword)) newErrors.confirmPassword = 'Passwords do not match.';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle successful password update
        alert('Password updated successfully!');
    };

    if (backLogin) {
        return <LoginForm />;
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
            <form>
                <div className='w-[350px] h-auto flex flex-col gap-3 p-6 text-black rounded-lg'>
                    {step === 1 && (
                        <>
                            <div className='flex gap-3 my-5'>
                                <span name='back' onClick={() => setBackLogin(true)} className='flex items-center gap-3 w-fit'>
                                    <svg className='w-[20px] cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="#25b658" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                                    </svg>
                                    <p className='cursor-pointer'>Back</p>
                                </span>
                            </div>
                            <div className='flex justify-center'>
                                <h1 className='text-[30px] font-extrabold'>Forgot password?</h1>
                            </div>
                            <div className='inputBx flex flex-col relative'>
                                <label className='absolute text-[15px] bg-white px-[10px] left-4'>Email</label>
                                <input type='email' name='email' required
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder=' ' />
                                {errors.email && <div className="text-[12px] font-semibold text-red-500">{errors.email}</div>}
                            </div>
                            <div className='flex items-center justify-center'>
                                <button type='button' name='continue'
                                    onClick={handleSendOtp}
                                    className='text-white w-full py-4 rounded-[10px] bg-green-600 font-black'>Send OTP</button>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className='flex gap-3 my-5'>
                                <span name='back' onClick={handleBack} className='flex items-center gap-3 w-fit'>
                                    <svg className='w-[20px] cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="#25b658" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                                    </svg>
                                </span>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <img src={padLock} alt='' className='w-[50%] mx-auto block' />
                                <h4 className='my-5 font-black'>OTP - One Time Password</h4>
                            </div>
                            <div className='otp-input mx-auto w-full'>
                                <input type='text' name='otp' placeholder='TYPE' maxLength={4}
                                    className='w-full text-center' required
                                    value={formData.otp}
                                    onChange={handleChange}
                                />
                                {errors.otp && <div className="text-[12px] font-semibold text-red-500">{errors.otp}</div>}
                            </div>
                            <div className='flex flex-col my-[20px] gap-[30px] items-center justify-center'>
                                <p className='w-full text-[10px]'>The One Time Password - OTP is successfully sent to your mailbox. Please kindly refer to the OTP and do not share it with anyone; it will exploit your personal information.</p>
                                <span className='text-[15px] font-black mr-2'>
                                    {isResendEnabled ? (
                                        <span
                                            className='cursor-pointer hover:text-blue-500'
                                            onClick={handleResendOtp}
                                        >
                                            Resend OTP
                                        </span>
                                    ) : (
                                        <span>{timeLeft}s</span>
                                    )}
                                </span>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button type='button' name='verify'
                                    onClick={movePassword}
                                    className='text-white w-full py-4 rounded-[10px] bg-green-600 font-black'>Verify</button>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div className='flex gap-3 my-5'>
                                <span name='back' onClick={handleBack} className='flex items-center gap-3 w-fit'>
                                    <svg className='w-[20px] cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="#25b658" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                                    </svg>
                                </span>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h1 className='text-[30px] font-black'>Update Password</h1>
                            </div>
                            <div className='inputBx relative'>
                                <label className='absolute text-[15px] bg-white px-[10px] left-4'>Password</label>
                                <input type={showPassword ? 'text' : 'password'} name='password'
                                    onChange={handleChange}
                                    value={formData.password}
                                    placeholder=' '
                                />
                                <button type='button' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                                {errors.password && <div className="text-[12px] font-semibold text-red-500">{errors.password}</div>}
                            </div>
                            <div className='inputBx relative'>
                                <label className='absolute text-[15px] bg-white px-[10px] left-4'>Confirm Password</label>
                                <input type={showConfirmPassword ? 'text' : 'password'} name='confirmPassword'
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                    placeholder=' '
                                />
                                <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </button>
                                {errors.confirmPassword && <div className="text-[12px] font-semibold text-red-500">{errors.confirmPassword}</div>}
                            </div>
                            <div className='flex items-center justify-center'>
                                <button type='button' name='submit' onClick={handleSubmit}
                                    className='text-white w-full py-4 rounded-[10px] bg-green-600 font-black'>Submit</button>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ConfirmPasswordForm;
