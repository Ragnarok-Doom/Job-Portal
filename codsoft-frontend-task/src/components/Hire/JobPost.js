import React, { useState } from 'react';
import { IoBagCheck } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

function JobPost() {
  const [formData, setFormData] = useState({
    role: '',
    jobLocation: 'Select',
    timing: 'Select',
    salary: '',
    jobDescription: '',
    qualification: '',
    requirements: '',
    skills: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validation logic
    let error = '';
    if (value.startsWith(' ')) {
        error = 'First character cannot be a space';
    } else {
        switch (name) {
            case 'role':
            case 'salary':
            case 'jobDescription':
            case 'qualification':
            case 'requirements':
            case 'skills':
                if (value.length > 500) {
                    error = 'Field cannot exceed 500 characters';
                }
                break;
            default:
                break;
        }
    }
    setErrors({ ...errors, [name]: error });
  };

  const isValidInput = (inputName) => {
    return inputName.trim() === '' || inputName === 'Select';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { role, jobLocation, timing, salary, jobDescription, qualification, requirements, skills } = formData;

    // Check for blank fields and update errors
    let blankError = {};
    if (isValidInput(role)) blankError.role = 'Role cannot be empty';
    if (isValidInput(jobLocation)) blankError.jobLocation = 'Job Location cannot be empty';
    if (isValidInput(timing)) blankError.timing = 'Timing cannot be empty';
    if (isValidInput(salary)) blankError.salary = 'Salary cannot be empty';
    if (isValidInput(jobDescription)) blankError.jobDescription = 'Job Description cannot be empty';
    if (isValidInput(qualification)) blankError.qualification = 'Qualification cannot be empty';
    if (isValidInput(requirements)) blankError.requirements = 'Requirements cannot be empty';
    if (isValidInput(skills)) blankError.skills = 'Skills cannot be empty';

    // Set all errors
    setErrors(blankError);

    // Prevent submission if there are errors
    if (Object.keys(blankError).length > 0) {
        return;
    }

    const userId = Cookies.get('HireJob'); // Get userId from cookie

    try {
      const response = await axios.post('http://localhost:5000/api/auth/jobpost', { ...formData, userId });
      if(response.status === 201){
        setFormData({
          role: '',
          jobLocation: 'Select',
          timing: 'Select',
          salary: '',
          jobDescription: '',
          qualification: '',
          requirements: '',
          skills: ''
        });
        setErrors({});
        toast.success("Job post process completed successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full h-full relative overflow-y-scroll'>
      <div>
        <h1 className='m-0 text-xl mb-5 flex items-center gap-3'>
          <IoBagCheck />
          Post a Job 
          <small>(Please check all details before posting a job. Once you post this job, it cannot be updated in the future.)</small>
        </h1>
        <hr className='my-5' />
        <form>
          <div className='flex flex-wrap gap-3'>
            <div className='flex flex-col gap-2 w-[48%]'>
              <label>Role</label>
              <input type='text' name='role' 
                value={formData.role}
                className='border border-black p-2 rounded-lg' 
                required 
                onChange={handleInputChange} 
              />
              {errors.role && (<p className=' text-red-600 text-sm'>{errors.role}</p>)}
            </div>
            <div className='flex flex-col gap-2 w-[48%]'>
              <label>Job Location</label>
              <select 
                name='jobLocation' 
                value={formData.jobLocation}
                className='border border-black p-2 rounded-lg' 
                required 
                onChange={handleInputChange}
              >
                <option value='Select'>Select</option>
                <option value='Remote'>Remote</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='On Site'>On Site</option>
              </select>
              {errors.jobLocation && (<p className=' text-red-600 text-sm'>{errors.jobLocation}</p>)}
            </div>
            <div className='flex flex-col gap-2 w-[48%]'>
              <label>Timing for work</label>
              <select 
                name='timing' 
                value={formData.timing}
                className='border border-black p-2 rounded-lg' 
                required 
                onChange={handleInputChange}
              >
                <option value='Select'>Select</option>
                <option value='US Shift'>US Shift</option>
                <option value='UK Shift'>UK Shift</option>
                <option value='IND Time'>IND Time</option>
                <option value='Night Shift'>Night Shift</option>
              </select>
              {errors.timing && (<p className=' text-red-600 text-sm'>{errors.timing}</p>)}
            </div>
            <div className='flex flex-col gap-2 w-[48%]'>
              <label>Salary</label>
              <input 
                type='text' 
                name='salary' 
                value={formData.salary}
                className='border border-black p-2 rounded-lg' 
                required 
                onChange={handleInputChange} 
              />
              {errors.salary && (<p className=' text-red-600 text-sm'>{errors.salary}</p>)}
            </div>
            <div className='flex flex-col gap-2 w-[97%]'>
              <label>Job Description</label>
              <textarea 
                name='jobDescription' 
                value={formData.jobDescription}
                className='border border-black rounded-lg p-3' 
                rows={3} 
                required 
                onChange={handleInputChange}
              ></textarea>
              {errors.jobDescription && (<p className=' text-red-600 text-sm'>{errors.jobDescription}</p>)}
            </div>
            <div className='flex flex-col gap-2 w-[97%]'>
              <label>Qualification</label>
              <textarea 
                name='qualification' 
                value={formData.qualification}
                className='border border-black rounded-lg p-5' 
                rows={3} 
                required 
                onChange={handleInputChange}
              ></textarea>
              {errors.qualification && (<p className=' text-red-600 text-sm'>{errors.qualification}</p>)}
            </div>
            <div className='flex flex-col gap-2 w-[97%]'>
              <label>Requirements</label>
              <textarea 
                name='requirements' 
                value={formData.requirements}
                className='border border-black rounded-lg p-5' 
                rows={3} 
                required 
                onChange={handleInputChange}
              ></textarea>
              {errors.requirements && (<p className=' text-red-600 text-sm'>{errors.requirements}</p>)}
            </div>
            <div className='flex flex-col gap-2 w-[97%]'>
              <label>Skills Needed</label>
              <textarea 
                name='skills' 
                value={formData.skills}
                className='border border-black rounded-lg p-3' 
                rows={2} 
                required 
                onChange={handleInputChange}
              ></textarea>
              {errors.skills && (<p className=' text-red-600 text-sm'>{errors.skills}</p>)}
            </div>
            <div className='w-full flex justify-center'>
              <input 
                type='submit' 
                value='Post Job' 
                className='cursor-pointer py-2 px-5 border-[2px] border-black hover:bg-green-400 hover:border-green-400' 
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobPost;
