import React, { useState } from 'react'
import { FaCross } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

function EmployerApply() {

    const navigate = useNavigate()
    const [step, setStep] = useState(1)

  return (
    <div className=' w-full h-full overflow-y-scroll'>
    { step === 1 &&
    <>
      <h1 className=' m-0 text-2xl'>Employee List</h1>
      <hr className=' my-5' />
        <div className=' w-full h-full flex flex-col gap-3'>
            {/* start */}
            <div className=' w-full h-[150px] bg-slate-50 p-5 flex items-center gap-5 cursor-pointer hover:bg-slate-100' onClick={ () => setStep(2)}>
                <div className=' w-[110px] h-full bg-slate-300'>
                    <img src='' className=' w-full h-full object-cover' />
                </div>
                <div>
                    <h2 className=' text-2xl font-semibold'>Cynthia Christie</h2>
                    <h3>Headline - IT Service</h3>
                    <h4>Experience - 4 years</h4>
                </div>
                <p className=' mt-auto ml-auto'>Applied 4 days ago</p>
            </div>
            {/* end */}
        </div>
    </>
    }

    { step === 2 &&
    <>
        <RxCross2 className=' ml-auto font-black cursor-pointer' onClick={() => setStep(1)} />
        <div className=' flex flex-col gap-5'>
            <div className=' flex gap-5 items-center'>
                <div>
                    <h1 className=' m-0 mb-5 text-xl'>Cynthia Christie</h1>
                    <div className=' w-[150px] h-[150px] bg-slate-300'>
                        <img src='' className=' w-full h-full object-cover' />
                    </div>
                </div>
                <div>
                    <h5>Applied - 6 days ago</h5>
                    <h6>How do you think you are fit to the role ?</h6>
                    <p> lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</p>
                </div>
            </div>
            <div>
                <h1 className=' m-0'>Description</h1>
                <p> lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</p>
                <h1>Headline - </h1>
                <h1>Skills - </h1>
                <h1>Qualification - </h1>
                <h1>Experience - </h1>
                <h1>Resume - </h1>
                <h1>Email - </h1>
                <h1>Contact - </h1>
            </div>
            <div className=' w-full flex justify-center items-center gap-7'>
                <button className=' py-3 px-7 border-[2px] border-red-500 text-red-500 hover:bg-transparent'>Reject</button>
                <button className=' py-3 px-7 border-[2px] border-green-500 text-green-500'>Accept</button>
            </div>
        </div>
    </>
    }
    </div>
  )
}

export default EmployerApply
