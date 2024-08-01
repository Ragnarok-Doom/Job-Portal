import React, { useState } from 'react'
import { MdHelpOutline } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

function Faqs({setStep}) {

    const faqs = [
        { question: "How do I create an account?", answer: "To create an account, click on the 'Sign Up' button at the top right corner and fill in the required details." },
        { question: "How do I post a job?", answer: "After logging in, go to the 'Post a Job' section, fill in the job details, and submit the form." },
        { question: "How can I request for a job?", answer: "Browse through the job listings and click on 'Apply' for the job you're interested in. Follow the instructions to submit your application." },
        { question: "Can I edit a job posting?", answer: "Yes, you can edit a job posting by going to your 'My Jobs' section and selecting the job you wish to edit." },
        { question: "How do I delete a job posting?", answer: "You can delete a job posting from the 'My Jobs' section by selecting the job and clicking on the 'Delete' button." },
        { question: "How can I contact an employer?", answer: "You can contact an employer through the messaging feature available on the job details page." },
        { question: "How do I reset my password?", answer: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password." },
        { question: "How can I update my profile?", answer: "Go to the 'My Profile' section, make the necessary changes, and save the updates." },
        { question: "How do I search for jobs?", answer: "Use the search bar on the homepage to search for jobs by keyword, location, or category." },
        { question: "What if I face technical issues?", answer: "If you face any technical issues, contact our support team through the 'Contact Us' page." },
        { question: "Is there a limit to the number of jobs I can post?", answer: "No, there is no limit to the number of jobs you can post." },
        { question: "Can I apply for multiple jobs?", answer: "Yes, you can apply for as many jobs as you are interested in." },
      ];
        
    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


  return (
    <div className='faqs'>
        <div className='faqs'>
            <div className=' flex w-full justify-between'>
                <div className=' flex items-center gap-3'>
                    <span><MdHelpOutline className='text-2xl' /></span>
                    <h1 className=' text-3xl'>Frequently Asked Questions</h1>
                </div>
                {/* <span className=' cursor-pointer w-fit h-fit' onClick={() => setStep(1)}><RxCross2 /></span> */}
            </div>
        </div>
        {faqs.map((faq, index) => (
            <div key={index} className="border-b py-4">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                >
                    <h3 className="text-md font-semibold">{faq.question}</h3>
                    <span className="text-xl">
                    {openIndex === index ? '-' : '+'}
                    </span>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                >
                    <p className="mt-2">{faq.answer}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Faqs
