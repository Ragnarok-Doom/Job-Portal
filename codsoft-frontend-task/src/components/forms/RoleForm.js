import React, { useEffect, useState } from 'react'
import hiring from '../assets/human-resources.png'
import job from '../assets/job-exploration.png'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/shirt.png'
import RoleHireForm from './RoleHireForm'
import RoleCandiForm from './RoleCandiForm'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

function RoleForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [registrationId, setRegistrationId] = useState(null)

    useEffect(() => {
        const id = Cookies.get('registrationId')
        if(id){
            setRegistrationId(id)
        }else{
            toast.warning('Please Register yourself first')
            navigate('/')
        }
    }, [navigate])

    return (
        <>
            {step === 1 &&
                <div className='roleSection w-[100vw] h-[100vh] flex justify-center gap-20 items-center'>
                    <div className=' w-[20%] flex flex-col items-center justify-center gap-10'>
                        <img src={hiring} alt='Hiring' />
                        <button onClick={() => setStep(2)} className='border-[1px] border-black w-[80%] py-4 rounded-[30px] font-normal hover:text-white'>
                            Looking for Employee
                        </button>
                    </div>
                    <div className=' w-[20%] flex flex-col items-center justify-center gap-10'>
                        <img src={job} alt='Job' />
                        <button onClick={() => setStep(3)} className='border-[1px] border-black w-[80%] py-4 rounded-[30px] font-normal hover:text-white'>
                            Looking for Job
                        </button>
                    </div>
                </div>
            }

            {step !== 1 &&
                <div className='w-full h-fit flex justify-between p-3 overflow-hidden'>
                    <span onClick={() => setStep(1)} className='flex items-center gap-3 w-fit cursor-pointer'>
                        <svg className='w-[20px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#25b658" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                        </svg>
                        <p>Back</p>
                    </span>
                    <img src={logo} alt='Logo' onClick={() => navigate('/')} className='cursor-pointer w-[7%]' />
                </div>
            }

            {step === 2 &&
                <RoleHireForm registrationId={registrationId} />
            }

            {step === 3 &&
                <RoleCandiForm registrationId={registrationId} />
            }
        </>
    )
}

export default RoleForm;
