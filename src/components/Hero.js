import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student'
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to authenticate
    const userData = {
      email: credentials.email,
      role: credentials.role,
      name: credentials.name
    };
    
    login(userData);
    
    // Redirect based on role
    switch (userData.role) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'pro_student':
        navigate('/pro-student-dashboard');
        break;
      case 'company':
        navigate('/company-dashboard');
        break;
      case 'scad_office':
        navigate('/scad-dashboard');
        break;
      case 'faculty':
        navigate('/faculty-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to register
    console.log('Register data:', credentials);
    // After successful registration, switch to login
    setIsLogin(true);
    setCredentials({ ...credentials, password: '' });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setCredentials({
      email: '',
      password: '',
      name: '',
      role: 'student'
    });
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to SCAD Internship Program</h1>
        <p className="hero-subtitle">Connecting Students to Career-Ready Internships</p>
        <div className="hero-description">
          <p>
            <span className="auth-heading">{isLogin ? 'Login to Get Started' : 'Create Your Account'}</span>
          </p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="login-form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={credentials.name}
              onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
              required
              className="mb-4"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
            className="mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
            className="mb-4"
          />
          <select
            value={credentials.role}
            onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
            className="role-select mb-4"
            required
          >
            <option value="">Select your role</option>
            <option value="student">Student</option>
            <option value="pro_student">Pro Student</option>
            <option value="company">Company</option>
            <option value="faculty">Faculty Member</option>
            <option value="scad_office">SCAD Office</option>
          </select>
          <div className="auth-buttons flex flex-col gap-4">
            <button type="button" className="btn btn-secondary" onClick={toggleForm}>
              {isLogin ? 'New user? Sign up' : 'Already have an account? Sign in'}
            </button>
            <button type="submit" className="btn btn-primary">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="hero-roles mt-6">
          <div className="hero-role">
            <i className="fas fa-user-graduate role-icon"></i>
            <div>
              <strong>Students</strong>
              <div className="role-desc">Apply, build your profile, and submit internship reports.</div>
            </div>
          </div>
          <div className="hero-role">
            <i className="fas fa-building role-icon"></i>
            <div>
              <strong>Companies</strong>
              <div className="role-desc">Post internships and evaluate student performance.</div>
            </div>
          </div>
          <div className="hero-role">
            <i className="fas fa-university role-icon"></i>
            <div>
              <strong>SCAD Office</strong>
              <div className="role-desc">Manage internships, approve companies, and view reports.</div>
            </div>
          </div>
          <div className="hero-role">
            <i className="fas fa-chalkboard-teacher role-icon"></i>
            <div>
              <strong>Faculty</strong>
              <div className="role-desc">Review and approve student reports.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 