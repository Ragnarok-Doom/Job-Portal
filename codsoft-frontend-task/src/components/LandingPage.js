import React, {  useState } from 'react'
import frontImg from './assets/b1.png'
import './LandingPage.css'
import instaImg from './assets/instagram.png'
import faceImg from './assets/facebook.png'
import twitImg from './assets/twitter.png'
import linkImg from './assets/linkedin.png'
import youImg from './assets/youtube.png'
import logoImg from './assets/shirt.png'
import about1 from './assets/a.jpg'
import about2 from './assets/c.png'
// import about3 from './assets/d.jpeg'
import service1 from './assets/politician.png'
import service2 from './assets/part-time.png'
import service3 from './assets/ethics.png'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from 'react-toastify';


function LandingPage() {

    const navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(null);
    // const Register = Cookies.get('Register')
    const Hirejob = Cookies.get('HireJob')
    const Candi = Cookies.get('Candi')
    
    const handleJobPost = () => {
        if(Hirejob){
            navigate('/dash-hire')
        }else{
            toast.error("Please register yourself as a Hire Team to find a job!");
            navigate('/register')
        }
    }
    const handleJobSearch = () => {
        if(Candi){
            navigate('/dash-candi')
        }else{
            toast.error("Please register yourself as a candidate to find a job!");
            navigate('/register')
        }
    }

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
          question: "1. What is your return policy?",
          answer: "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange."
        },
        {
          question: "2. How do I track my order?",
          answer: "You can track your order using the tracking number provided in your order confirmation email. Visit our tracking page and enter your tracking number to see the status of your shipment."
        },
        {
          question: "3. Can I purchase items in bulk?",
          answer: "Yes, we offer bulk purchase options. Please contact our sales team for more information and discounts on bulk orders."
        },
        {
          question: "4. Do you offer international shipping?",
          answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary based on location. Please refer to our shipping policy for more details."
        },
        {
          question: "5. How can I contact customer support?",
          answer: "You can reach our customer support team via email at support@example.com or by phone at +1 (555) 123-4567. We are available Monday to Friday, 9 AM to 5 PM."
        },
        {
          question: "6. What payment methods do you accept?",
          answer: "We accept various payment methods, including credit/debit cards, PayPal, and Apple Pay. Please see our payment options page for a full list."
        },
        {
          question: "7. How do I reset my password?",
          answer: "To reset your password, go to the login page and click 'Forgot Password.' Follow the instructions to reset your password via email."
        },
        {
          question: "8. Can I cancel or change my order?",
          answer: "If you need to cancel or change your order, please contact us as soon as possible. We can make changes before the order is shipped."
        }
      ];

  return (
    <div className='w-full h-full relative'>
        <header className='w-full h-[10vh] flex px-[20px] justify-between items-center z-50 py-4 relative'>
            <div className='flex gap-5 items-center'>
                <img src={logoImg} alt='img' className=' cursor-pointer' />
                <h1 className=' text-4xl font-mono font-black cursor-pointer'>Horcrux</h1>
            </div>
            <nav className='flex gap-8 items-center'>
                <a href='#about-us'>About</a>
                <a href='#service'>Service</a>
                <a href='#contact'>Contact</a>
                <button onClick={handleJobPost}><span>job post</span></button>
                <button onClick={handleJobSearch}><span>job search</span></button>
            </nav>
        </header>
        <section className='main relative w-full h-[90vh] flex justify-center items-center'>
            <img src={frontImg}  />
            <h1 data='job search'>job search</h1>
            <div className='media'>
                <img src={instaImg} />
                <img src={faceImg} />
                <img src={twitImg} />
                <img src={youImg} />
                <img src={linkImg} />
            </div>
            <div className='content absolute flex justify-between top-[10%] left-0 px-[100px]'>
                <p className=' w-[20%] text-right'>Welcome to <span className='text-[20px] text-[#5ac77f] font-black'>Horcrux</span>, the ultimate destination for job seekers and employers to connect and thrive. Our platform is designed to streamline your job search experience with user-friendly features, a vast database of job listings, and personalized recommendations.</p>
                <p className='w-[20%]'>Employers can effortlessly post vacancies, track applications, and find the perfect candidates to join their team. Whether you're looking for your first job, seeking a career change, or aiming to hire top talent, Horcrux is here to support your journey every step of the way. Join us today and take the next step toward a successful future!</p>
            </div>
            <div className='join absolute bottom-[15px] flex gap-5 left-[15px]'>
                <button className='bg-[#bde55e] border-[#5ac77f] z-10 hover:text-white' onClick={() => navigate('/login')}><span>Login</span></button>
                <button className='bg-[#5ac77f] border-[#bde55e] text-white z-10' onClick={() => navigate('/register')}><span>Sign Up</span></button>
            </div>
        </section>
        {/* ABOUT US */}
        <section id='about-us' className='about-us w-full h-fit flex flex-col relative'>
            <div className='flex relative bg-green-400 w-full h-[450px] justify-center items-center'>
                <div className='w-[50%]'>
                    <p className='p-16 text-white'>At Horcrux, we are committed to bridging the gap between talented job seekers and dynamic employers. Founded on the principles of innovation, integrity, and inclusivity, our mission is to empower individuals to achieve their career aspirations while helping businesses find the right talent to drive their success.</p>
                </div>
                <div className='w-[50%] h-full overflow-hidden object-cover'>
                    <img src={about2} className='w-full' />
                </div>
            </div>
            <div className='flex  relativew-full h-[450px]'>
                <div className='w-[20%] bg-green-100 relative flex justify-center items-center p-0'><span className=''>About Us</span></div>
                <div className='w-[40%] h-full flex items-center p-16'>
                    <p>Horcrux was established with a vision to revolutionize the job market by providing a seamless and efficient platform for employment opportunities. Recognizing the challenges faced by both job seekers and employers, we set out to create a comprehensive solution that addresses the unique needs of both parties.</p>
                </div>
                <div className='w-[40%] bg-green-700'></div>
            </div>
            <div className='flex  relativew-full h-[200px]'>
                <div className='w-[60%] h-full overflow-hidden relative'>
                    <img src={about1} className='w-full relative top-[-250px]' />
                </div>  
                <div className='w-[40%] h-full flex items-center p-5'>
                    <p className='text-[13px]'>We are dedicated to supporting you in every step of your career journey. Whether you're searching for your next job or looking to hire exceptional talent, Horcrux provides the tools, resources, and support you need to succeed. Join our community today and discover endless possibilities for growth and success.</p>
                </div>
            </div>
        </section>
        <section id='service' className='service relative w-full h-fit'>
            <div className='w-full flex relative'>
                <div className='w-[50%] h-[200px]'></div>
                <div className='w-[50%] h-[200px] bg-green-700 rounded-bl-[999px] flex justify-center items-center text-6xl font-black text-white'>Service</div>
            </div>
            <div className='services flex justify-center items-center gap-[50px] py-5'>
                <div className='bg-white w-[25%] flex flex-col p-10 items-center justify-center gap-4 rounded-[50px]'>
                    <img src={service1} />
                    <h2 className=' font-black'>Job Seeker</h2>
                    <p>Extensive Job Listings: Access a diverse range of job opportunities across various industries and locations.Personalized Job Recommendations: Receive tailored job suggestions based on your profile, experience, and preferences.  Create professional resumes with our easy-to-use templates and tools.</p>
                </div>
                <div className='bg-white w-[25%] flex flex-col p-10 items-center justify-center gap-4 rounded-[50px]'>
                    <img src={service2} />
                    <h2 className=' font-black'>Employer Service</h2>
                    <p>Effortlessly post job vacancies and reach a vast pool of qualified candidates. Streamline your hiring process with our integrated ATS, allowing you to manage applications and communicate with candidates effectively. Use advanced search filters to find the best candidates based on skills, experience, and location.</p>
                </div>
                <div className='w-[25%] flex flex-col p-10 items-center justify-center gap-4 rounded-[50px]'>
                    <img src={service3} />
                    <h2 className=' font-black'>Additional Services</h2>
                    <p>Unlock exclusive features and benefits with our premium membership plans. Stay informed about new job openings and opportunities with customizable job alerts. Access resources and tools to help you prepare for interviews and succeed in landing your desired job. Connect with industry professionals </p>
                </div>
            </div>
        </section>
        <section id='contact' className='contact w-full h-fit p-5 flex'>
            <div className='w-[50%] flex flex-col gap-[10px] justify-center items-center'>
                <div className='flex flex-col gap-[10px]'>
                    <h1>Points of contacts</h1>
                    <h4 className='font-bold'>U.S. TUNE</h4>
                    <span>11350 Borsdam, Rd. Ep110, Hunt Valley, MD101 Mc Comick</span>
                    <h4 className=' mt-5 font-bold'>Billing Inquries</h4>
                    <span>(855) 57876444418</span>
                    <h4 className=' mt-5 font-bold'>Information & Sales</h4>
                    <span className='text-blue-500'>partemsasd@gmail.com</span>
                    <h4 className=' mt-5 font-bold'>Support</h4>
                    <span className='text-blue-500'>supposa@service</span>
                    <h4 className=' mt-5 font-bold'>Verification of Employement</h4>
                    <span className='text-blue-500'>voe@asc.co.io.in</span>
                    <div className='flex flex-col gap-[5px]'>
                        <h1><b>Additional Office Locationns</b></h1>
                        <span>Germany</span>
                        <span>Tostr, 231, Voldemort</span>
                    </div>
                </div>
            </div>
            <div className='w-[50%] flex flex-col justify-center'>
                <form className='flex flex-col gap-5 justify-center w-ful items-center'>
                    <h1 className='font-black m-0'>Please Note: All Fields are required</h1>
                    <div className='inputBx flex flex-col relative w-[60%]'>
                        <label className='absolute text-[15px] bg-white px-[10px] left-4'>Name</label>
                        <input type='text' name='name' autoComplete='false' required
                            pattern="^[A-Za-z]+( [A-Za-z]+)*$" 
                            className='text-black w-[100%]'
                        />
                    </div>
                    <div className='inputBx flex flex-col relative w-[60%]'>
                        <label className='absolute text-[15px] bg-white px-[10px] left-4'>Email</label>
                        <input type='email' name='email' autoComplete='false' required
                            className='text-black w-[100%]'
                        />
                    </div>
                    <div className='inputBx flex flex-col relative w-[60%]'>
                        <textarea placeholder='Message' className='border rounded-md p-5'></textarea>
                    </div>
                    <div className='inputBx flex flex-col relative w-[60%]'>
                        <label className='absolute text-[15px] bg-white px-[10px] left-4'>Contact</label>
                        <input type='text' name='name' autoComplete='false' required
                            pattern="^[0-9]" 
                            className='text-black w-[100%]'
                        />
                    </div>
                    <div className='inputBx flex flex-col relative w-[60%]'>
                        <button><span>Submit</span></button>
                    </div>
                </form>
            </div>
        </section>
        <section>
        <div className="w-[80%] my-10 p-5 mx-auto">
        <h1 className=' text-3xl underline font-black'>Frequently Asked Questions.</h1>
            {faqs.map((faq, index) => (
                <div key={index} className="border-b py-4">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
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
        </section>
        <footer className=' w-full h-fit p-10 flex justify-evenly bg-zinc-100 overflow-hidden'>
            <div className='w-[20%] flex flex-col items-center'>
                <div className=' flex flex-col gap-3'>
                    <h3>Contact / Need Help ?</h3>
                    <hr className=' w-[90%] h-[2px] bg-gray-500' />
                    <p className='flex gap-3 items-center'><MdOutlineEmail />Email: support@example.com</p>
                    <p>If you need any help and feedback for our website feel free to contact us or mail us using provided phone number and email. <b>Note: only for emergency purpose.</b></p>
                    <p className=' flex gap-3 items-center'><FaPhoneAlt />Phone: +1 (555) 123-4567</p>
                </div>
            </div>
            <div className='w-[20%] flex flex-col items-center'>
                <div className=' w-[90%] flex flex-col gap-3'>
                    <h3>Quick Links</h3>
                    <hr className=' w-[90%] h-[2px] bg-gray-500' />
                    <p className=' cursor-pointer w-fit hover:text-gray-400'>About</p>
                    <p className=' cursor-pointer w-fit hover:text-gray-400'>Service</p>
                    <p className=' cursor-pointer w-fit hover:text-gray-400'>Job Post</p>
                    <p className=' cursor-pointer w-fit hover:text-gray-400'>Job Search</p>
                </div>
            </div>
            <div className='w-[20%] flex flex-col justify-center relative items-center '>
                <img src={logoImg}  className=' w-[35%]'/>
                <div className=' relative'>
                    <h1 className=' text-4xl font-mono leading-[1] font-black cursor-pointer relative z-10'>Horcrux</h1>
                    <AiOutlineLoading className=' w-full h-fit rotate-[-45deg] absolute text-green-400 top-[45%] z-0 left-1/2 translate-x-[-50%]' />
                </div>
            </div>
            <div className='w-[20%] flex flex-col items-center'>
                <div className=' w-[90%] flex flex-col gap-3'>
                    <h3>Resources</h3>
                    <hr className=' w-[90%] h-[2px] bg-gray-500' />
                    <p className=' cursor-pointer w-fit hover:text-gray-400'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, nobis vero architecto rerum autem exercitationem nisi maiores distinctio deserunt voluptatem id odio assumenda consequatur corrupti, mini
                    </p>
                </div>
            </div>
            <div className='media w-[20%] flex flex-col items-center'>
                <div className=' w-[90%] flex flex-col gap-3'>
                    <h3>Social Media</h3>
                    <hr className=' w-[90%] h-[2px] bg-gray-500' />
                    <div className=' flex flex-wrap gap-3'>
                        <img src={faceImg} />
                        <img src={instaImg} />
                        <img src={linkImg} />
                        <img src={twitImg} />
                        <img src={youImg} />
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default LandingPage
