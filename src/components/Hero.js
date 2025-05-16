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
    role: 'student',
    major: 'Computer Science',
    semester: '',
    // Company specific fields
    companyName: '',
    industry: '',
    companySize: '',
    companyLogo: null,
    companyEmail: '',
    // Company verification documents
    taxDocument: null,
    commercialRegister: null,
    additionalDocuments: []
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [documentPreviews, setDocumentPreviews] = useState({
    taxDocument: null,
    commercialRegister: null,
    additionalDocuments: []
  });

  const majors = [
    'Computer Science',
    'Engineering',
    'Business'
  ];

  const semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Construction',
    'Entertainment',
    'Other'
  ];

  const companySizes = [
    '1-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCredentials({ ...credentials, companyLogo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (e, documentType) => {
    const files = e.target.files;
    if (files) {
      if (documentType === 'additionalDocuments') {
        // Handle multiple files for additional documents
        const newFiles = Array.from(files);
        setCredentials(prev => ({
          ...prev,
          additionalDocuments: [...prev.additionalDocuments, ...newFiles]
        }));

        // Create previews for additional documents
        newFiles.forEach(file => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setDocumentPreviews(prev => ({
              ...prev,
              additionalDocuments: [...prev.additionalDocuments, {
                name: file.name,
                type: file.type,
                preview: reader.result
              }]
            }));
          };
          reader.readAsDataURL(file);
        });
      } else {
        // Handle single file documents
        const file = files[0];
        setCredentials(prev => ({
          ...prev,
          [documentType]: file
        }));

        // Create preview for single documents
        const reader = new FileReader();
        reader.onloadend = () => {
          setDocumentPreviews(prev => ({
            ...prev,
            [documentType]: {
              name: file.name,
              type: file.type,
              preview: reader.result
            }
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeDocument = (documentType, index) => {
    if (documentType === 'additionalDocuments') {
      setCredentials(prev => ({
        ...prev,
        additionalDocuments: prev.additionalDocuments.filter((_, i) => i !== index)
      }));
      setDocumentPreviews(prev => ({
        ...prev,
        additionalDocuments: prev.additionalDocuments.filter((_, i) => i !== index)
      }));
    } else {
      setCredentials(prev => ({
        ...prev,
        [documentType]: null
      }));
      setDocumentPreviews(prev => ({
        ...prev,
        [documentType]: null
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to authenticate
    const userData = {
      email: credentials.email,
      role: credentials.role,
      name: credentials.name,
      major: credentials.major,
      semester: credentials.semester,
      // Include company data if role is company
      ...(credentials.role === 'company' && {
        companyName: credentials.companyName,
        industry: credentials.industry,
        companySize: credentials.companySize,
        companyLogo: credentials.companyLogo,
        companyEmail: credentials.companyEmail
      })
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
      role: 'student',
      major: 'Computer Science',
      companyName: '',
      industry: '',
      companySize: '',
      companyLogo: null,
      companyEmail: '',
      taxDocument: null,
      commercialRegister: null,
      additionalDocuments: [],
      semester: ''
    });
    setLogoPreview(null);
    setDocumentPreviews({
      taxDocument: null,
      commercialRegister: null,
      additionalDocuments: []
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
            <>
              {credentials.role === 'company' ? (
                <>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={credentials.companyName}
                    onChange={(e) => setCredentials({ ...credentials, companyName: e.target.value })}
                    required
                    className="mb-4"
                  />
                  <select
                    value={credentials.industry}
                    onChange={(e) => setCredentials({ ...credentials, industry: e.target.value })}
                    required
                    className="mb-4"
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                  <select
                    value={credentials.companySize}
                    onChange={(e) => setCredentials({ ...credentials, companySize: e.target.value })}
                    required
                    className="mb-4"
                  >
                    <option value="">Select Company Size</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  <input
                    type="email"
                    placeholder="Official Company Email"
                    value={credentials.companyEmail}
                    onChange={(e) => setCredentials({ ...credentials, companyEmail: e.target.value })}
                    required
                    className="mb-4"
                  />
                  
                  {/* Company Logo Section */}
                  <div className="document-section mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      required
                      className="mb-2"
                    />
                    {logoPreview && (
                      <div className="mt-2">
                        <img
                          src={logoPreview}
                          alt="Company Logo Preview"
                          className="company-logo-preview"
                        />
                      </div>
                    )}
                  </div>

                  {/* Tax Document Section */}
                  <div className="document-section mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Registration Document
                      <span className="text-sm text-gray-500"> (PDF, max 5MB)</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleDocumentChange(e, 'taxDocument')}
                      required
                      className="mb-2"
                    />
                    {documentPreviews.taxDocument && (
                      <div className="document-preview">
                        <span>{documentPreviews.taxDocument.name}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument('taxDocument')}
                          className="remove-document"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Commercial Register Section */}
                  <div className="document-section mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commercial Registration
                      <span className="text-sm text-gray-500"> (PDF, max 5MB)</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleDocumentChange(e, 'commercialRegister')}
                      required
                      className="mb-2"
                    />
                    {documentPreviews.commercialRegister && (
                      <div className="document-preview">
                        <span>{documentPreviews.commercialRegister.name}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument('commercialRegister')}
                          className="remove-document"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Additional Documents Section */}
                  <div className="document-section mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Supporting Documents
                      <span className="text-sm text-gray-500"> (Optional, PDF, max 5MB each)</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => handleDocumentChange(e, 'additionalDocuments')}
                      className="mb-2"
                    />
                    {documentPreviews.additionalDocuments.map((doc, index) => (
                      <div key={index} className="document-preview">
                        <span>{doc.name}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument('additionalDocuments', index)}
                          className="remove-document"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={credentials.name}
                  onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                  required
                  className="mb-4"
                />
              )}
            </>
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
            <option value="scad_office">SCAD Office</option>
            <option value="faculty">Faculty Member</option>
          </select>
          {!isLogin && (credentials.role === 'student' || credentials.role === 'pro_student') && (
            <div className="form-group">
              <select
                value={credentials.major}
                onChange={(e) => setCredentials({ ...credentials, major: e.target.value })}
                required
                className="mb-4"
              >
                {majors.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>
              <select
                value={credentials.semester}
                onChange={(e) => setCredentials({ ...credentials, semester: e.target.value })}
                required
                className="mb-4"
              >
                <option value="">Select semester</option>
                {semesters.map(semester => (
                  <option key={semester} value={semester}>Semester {semester}</option>
                ))}
              </select>
            </div>
          )}
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