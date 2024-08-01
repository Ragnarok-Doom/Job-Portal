import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/forms/LoginForm';
import RegistrationForm from './components/forms/RegistrationForm';
import ConfirmPasswordForm from './components/forms/ConfirmPasswordForm';
import LandingPage from './components/LandingPage';
import RoleForm from './components/forms/RoleForm';
import DashboardCandidate from './components/Candidate/DashboardCandidate';
import DashboardHire from './components/Hire/DashboardHire';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/confirm-password" element={<ConfirmPasswordForm />} />
                <Route path="/role" element={<RoleForm />} />
                <Route path="/dash-candi" element={<DashboardCandidate />} />
                <Route path="/dash-hire" element={<DashboardHire />} />
            </Routes>
        <ToastContainer />
        </Router>
    );
}

export default App;
