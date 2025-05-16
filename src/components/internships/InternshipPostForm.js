import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const InternshipPostForm = ({ internship, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    isPaid: false,
    salary: '',
    skills: '',
    description: '',
    requirements: '',
    location: '',
    startDate: '',
    applicationDeadline: ''
  });

  useEffect(() => {
    if (internship) {
      setFormData(internship);
    }
  }, [internship]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.duration || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.isPaid && !formData.salary) {
      toast.error('Please specify the salary for paid internship');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="internship-post-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Software Engineering Intern"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration*</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 3 months"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="isPaid"
                checked={formData.isPaid}
                onChange={handleChange}
              />
              Paid Internship
            </label>
          </div>

          {formData.isPaid && (
            <div className="form-group">
              <label htmlFor="salary">Monthly Salary (AED)</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 3000"
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="skills">Required Skills*</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React, Node.js"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the internship role and responsibilities"
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="List any additional requirements or qualifications"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location*</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Dubai, UAE"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date*</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="applicationDeadline">Application Deadline*</label>
          <input
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {internship ? 'Update Internship' : 'Post Internship'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .internship-post-form {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--dark);
          font-weight: 500;
        }

        input[type="text"],
        input[type="number"],
        input[type="date"],
        textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        input:focus,
        textarea:focus {
          border-color: var(--primary);
          outline: none;
        }

        .checkbox {
          display: flex;
          align-items: center;
        }

        .checkbox label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .checkbox input[type="checkbox"] {
          width: 1.2rem;
          height: 1.2rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          border: none;
        }

        .btn-secondary {
          background: #f5f5f5;
          color: var(--dark);
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
};

export default InternshipPostForm; 