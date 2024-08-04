import React, { useState, useEffect } from 'react';
import profile from '../assets/img.png';
import { IoMdDocument, IoMdSettings } from "react-icons/io";
import { MdHelpOutline, MdSettingsRemote } from "react-icons/md";
import { LuFileCheck2 } from "react-icons/lu";
import Faqs from '../Faqs';
import { useNavigate } from 'react-router-dom';
import JobDetail from './JobDetail';
import Settings from '../Settings';
import CandidateProfile from './CandidateProfile';
import Applied from './Applied';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/en-gb';
import { IoBag,  IoFilter, IoInformationCircleOutline } from 'react-icons/io5';
import { FaAddressCard, FaLocationDot, FaMapLocationDot } from 'react-icons/fa6';
import CandidateProfileForm from './CandidateProfileForm';
import Cookies from 'js-cookie'

function DashboardCandidate() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        photo: '',
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        city: '',
        state: '',
        country: '',
        headline: '',
        description: '',
        skills: '',
        qualification: '',
        percentage: '',
        position: '',
        course: '',
        college: '',
        interest: '',
        createdAt: '',
        userId: '',
    });
    const [step, setStep] = useState(1);
    const [selectedJobId, setSelectedJobId] = useState(null)
    const [jobPosts, setJobPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(profile); // Default profile image
    const [jobTypeFilter, setJobTypeFilter] = useState({
        Job: false,
        Internship: false
    });
    const [jobLocationFilter, setJobLocationFilter] = useState({
        Remote: false,
        Hybrid: false,
        'On Site': false
    });
    const [activeFilters, setActiveFilters] = useState({
        jobTypeFilter: {
            Job: false,
            Internship: false
        },
        jobLocationFilter: {
            Remote: false,
            Hybrid: false,
            'On Site': false
        }
    });
    
    useEffect(() => {
        // Fetch user profile data
        const fetchUserProfile = async () => {
            const userId = Cookies.get('registrationId');
            try {
                await axios.get(`http://localhost:5000/api/auth/findcandiphoto/${userId}`)
                    .then(response => {
                        const data = response.data
                        setUser({
                            photo: data.photo || '',
                            firstName: data.firstName || '',
                            lastName: data.lastName || '',
                            email: data.email || '',
                            contact: data.contact || '',
                            city: data.city || '',
                            state: data.state || '',
                            country: data.country || '',
                            headline: data.headline || '',
                            description: data.description || '',
                            skills: data.skills || '',
                            qualification: data.qualification || '',
                            percentage: data.percentage || '',
                            position: data.position || '',
                            course: data.course || '',
                            college: data.college || '',
                            interest: data.interest || '',
                            createdAt: data.createdAt || '',
                        })
                        const imageUrl = data.photo ? `http://localhost:5000/${data.photo}` : profile;
                        setProfileImage(imageUrl);
                    })
                } catch (error) {
                    // console.error('Error fetching user profile:', error);
                }
        };
    
        // Fetch job posts data
        const fetchJobPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/fetchalljobposts');
                const jobs = response.data;

                const jobPostsWithLogos = await Promise.all(jobs.map(async (job) => {
                    try {
                        const logoResponse = await axios.get(`http://localhost:5000/api/auth/getcompimg/${job.userId}`);
                        return { ...job, companyLogo: logoResponse.data.companyLogo || profile };
                    } catch (error) {
                        // console.error(`Error fetching company logo for job ID ${job._id}:`, error);
                        return { ...job, companyLogo: profile };
                    }
                }));
    
                setJobPosts(jobPostsWithLogos);

            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };
    
        fetchUserProfile();
        fetchJobPosts();
    }, [step]); 

    const getTimeago = (dateString) => {
        return moment(dateString).fromNow();
    };

    const handleSaveChanges = () => {
        setActiveFilters({
            jobTypeFilter,
            jobLocationFilter
        });
        setFiltersVisible(false);
    };

    const handleResetFilter = () => {
        setJobTypeFilter({
            Job: false,
            Internship: false
        });
        setJobLocationFilter({
            Remote: false,
            Hybrid: false,
            'On Site': false
        });
        setActiveFilters({
            jobTypeFilter: {
                Job: false,
                Internship: false
            },
            jobLocationFilter: {
                Remote: false,
                Hybrid: false,
                'On Site': false
            }
        });
        setFiltersVisible(false);
    };

    const filteredJobPosts = jobPosts.filter(job => {
        const matchesSearchTerm = job.role.toLowerCase().includes(searchTerm.toLowerCase()) || job.companyname.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesJobType = Object.keys(activeFilters.jobTypeFilter).some(type => activeFilters.jobTypeFilter[type] && job.jobType === type);
        const matchesJobLocation = Object.keys(activeFilters.jobLocationFilter).some(location => activeFilters.jobLocationFilter[location] && job.jobLocation === location);

        return matchesSearchTerm && (matchesJobType || !Object.values(activeFilters.jobTypeFilter).includes(true)) && (matchesJobLocation || !Object.values(activeFilters.jobLocationFilter).includes(true));
    });

    return (
        <div className='relative w-[100vw] h-[100vh] overflow-hidden'>
            <div className='relative flex w-full h-full'>
                <div className='relative w-[25%] h-full bg-[#f8f8f8]'>
                    <div className='relative p-5 w-full h-full flex flex-col gap-5'>
                        <div className='w-full'>
                            <div className='overflow-hidden w-[150px] h-[150px] rounded-[100%] bg-black'>
                                <img src={profileImage ? profileImage : profile} className='w-full h-full object-cover' alt="Profile" />
                            </div>
                            <h1 className='text-2xl leading-[0]'>{user.firstName} {user.lastName}</h1>
                            <span className='text-gray-600 leading-[0] cursor-pointer' onClick={() => setStep(5)}>View Profile</span>
                        </div>
                        <div className='mt-5'>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200' onClick={() => setStep(1)}>
                                <FaHome /><span>Home</span>
                            </p>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200' onClick={() => setStep(7)}><FaAddressCard /><span>Profile</span></p>
                            <p className='p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200' onClick={() => setStep(6)}><LuFileCheck2 /><span>Applied</span></p>
                        </div>
                        <div className='mt-auto'>
                            <p className='cursor-pointer flex items-center gap-5 text-md hover:text-gray-500 font-mono' onClick={() => setStep(2)}><MdHelpOutline className='w-[20px] h-[20px]' /><span>Help Center</span></p>
                            <p className='cursor-pointer mt-5 flex items-center gap-5 text-md hover:text-gray-500 font-mono' onClick={() => setStep(3)}><IoMdSettings className='w-[20px] h-[20px]' /><span>Setting</span></p>
                        </div>
                    </div>
                </div>
                <div className='relative w-[75%] h-full p-5 z-10 overflow-y-scroll'>
                    {/* JOB LISTINGS */}
                    {step === 1 && (
                        <>
                            <div className='w-full flex items-center gap-4'>
                                <input 
                                    type='search' 
                                    className='border-[1px] border-black w-full px-5 py-2 rounded-3xl outline-0' 
                                    placeholder='Search by Job Role or Company Name'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className=' w-fit h-fit bg-gray-200 p-3 rounded-full cursor-pointer' onClick={() => setFiltersVisible(!filtersVisible)}>
                                    <IoFilter className='text-[25px]' />
                                </div>
                            </div>
                            {filtersVisible && (
                                <div className='job-filters absolute h-full w-[30%] right-0 mt-2 z-10 bg-transparent backdrop-blur-sm p-4'>
                                    <div className='flex flex-col gap-4 relative'>
                                        <div className=' relative'><h2 className=' absolute rotate-90 top-[15vh] -right-14 text-6xl font-black'>Filters</h2></div>
                                        <div>
                                            <h4 className='font-bold text-xl'>Job Type</h4>
                                            {Object.keys(jobTypeFilter).map((type) => (
                                                <div key={type} className='flex items-center ml-5 mt-3'>
                                                    <input 
                                                        type='checkbox'
                                                        checked={jobTypeFilter[type]}
                                                        onChange={() => setJobTypeFilter({ ...jobTypeFilter, [type]: !jobTypeFilter[type] })}
                                                    />
                                                    <label className='ml-2'>{type}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-xl'>Job Location</h4>
                                            {Object.keys(jobLocationFilter).map((location) => (
                                                <div key={location} className='flex items-center ml-5 mt-3'>
                                                    <input 
                                                        type='checkbox'
                                                        checked={jobLocationFilter[location]}
                                                        onChange={() => setJobLocationFilter({ ...jobLocationFilter, [location]: !jobLocationFilter[location] })}
                                                    />
                                                    <label className='ml-2'>{location}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex justify-evenly mt-[10%]'>
                                            <button 
                                                className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white'
                                                onClick={handleSaveChanges}
                                            >
                                                Save Changes
                                            </button>
                                            <button 
                                                className='px-4 py-2 text-black hover:bg-black hover:text-white border-black border-[2px]'
                                                onClick={handleResetFilter}
                                            >
                                                Reset Filter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='w-full h-full py-10 relative'>
                                <div className='jobs-list w-full h-full flex flex-col gap-3 relative overflow-y-scroll'>
                                    {filteredJobPosts.length > 0 ? (
                                        filteredJobPosts.map(job => (
                                            <div
                                                key={job._id} // Make sure your job object has an _id field
                                                className='w-full relative hover:bg-slate-200 cursor-pointer h-fit bg-slate-100 flex p-5 gap-4 rounded-lg'
                                                onClick={() => {setStep(8); setSelectedJobId(job._id)}}
                                            >
                                                <div className='w-[100px] h-[100px] overflow-hidden'>
                                                    <img 
                                                        src={job?.companyLogo && job.companyLogo.trim() !== '' 
                                                            ? `http://localhost:5000/${job.companyLogo}` 
                                                            : profile} 
                                                        className='w-full h-full object-cover' 
                                                        alt='' 
                                                    />
                                                </div>
                                                <div className='w-[80%] h-full flex gap-2 flex-col justify-between'>
                                                    <div>
                                                        <h2 className=' font-semibold text-xl'>{job.role}</h2>
                                                        <span className='text-gray-500 text-sm'>{job.companyname}</span>
                                                    </div>
                                                    <div className='flex gap-4'>
                                                        <span className=' text-sm flex items-center gap-2'>{job.jobLocation === 'Hybrid' ? ( <FaMapLocationDot className=' text-[13px]' /> ) : job.jobLocation === 'On Site' ?  ( <FaLocationDot className=' text-[13px]' /> ) : ( <MdSettingsRemote className=' text-[13px]' /> ) } {job.jobLocation}</span>
                                                        <span className=' text-sm flex items-center gap-2'>{job.jobType == 'Job' ? <IoBag className=' text-[13px]' /> : <IoMdDocument className=' text-[13px]' />} {job.jobType}</span>
                                                    </div>
                                                </div>
                                                <span className=' absolute top-0 right-0 p-2'><IoInformationCircleOutline className=' text-lg' /></span>
                                                <span className=' absolute p-2 bottom-0 right-0 text-gray-500'>{getTimeago(job.createdAt)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-center text-gray-500'>No job posts found</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    {/* PROFILE */}
                    {step === 5 && <CandidateProfile setStep={setStep} />}
                    {/* JOB DETAIL */}
                    {step === 8 && <JobDetail setStep={setStep} jobId={selectedJobId} />}
                    {/* APPLIED JOBS */}
                    {step === 6 && <Applied />}
                    {/* PROFILE FORM */}
                    {step === 7 && <CandidateProfileForm />}
                    {/* HELP CENTER */}
                    {step === 2 && <Faqs />}
                    {/* SETTINGS */}
                    {step === 3 && <Settings />}
                </div>
            </div>
        </div>
    );
}

export default DashboardCandidate;
