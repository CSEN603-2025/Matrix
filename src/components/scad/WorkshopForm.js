import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock function to fetch a workshop by ID (replace with real API later)
const mockWorkshops = [
  {
    id: 1,
    title: 'Intro to Web Dev',
    description: 'Learn HTML, CSS, JS basics.',
    dateTime: '2024-05-20T14:00',
    speaker: 'Dr. Sarah Johnson',
    speakerBio: 'Senior Web Developer & Instructor',
    agenda: 'HTML, CSS, JS basics',
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    description: 'Data science concepts for beginners.',
    dateTime: '2024-05-22T15:00',
    speaker: 'Prof. Michael Chen',
    speakerBio: 'Data Science Lead',
    agenda: 'Data science concepts',
  },
];

function getWorkshopById(id) {
  return mockWorkshops.find(w => w.id === Number(id));
}

const WorkshopForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    description: '',
    dateTime: '',
    speaker: '',
    speakerBio: '',
    agenda: '',
  });

  useEffect(() => {
    if (isEdit) {
      const workshop = getWorkshopById(id);
      if (workshop) {
        setForm({
          title: workshop.title,
          description: workshop.description,
          dateTime: workshop.dateTime,
          speaker: workshop.speaker,
          speakerBio: workshop.speakerBio,
          agenda: workshop.agenda,
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would call your API to save the workshop
    if (isEdit) {
      console.log('Updating workshop:', form);
    } else {
      console.log('Creating new workshop:', form);
    }
    navigate('/scad/workshops');
  };

  return (
    <div className="dashboard-section">
      <h2>{isEdit ? 'Edit Workshop' : 'Add New Workshop'}</h2>
      <form className="card p-4" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label>Date/Time</label>
          <input type="datetime-local" name="dateTime" value={form.dateTime} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label>Speaker</label>
          <input type="text" name="speaker" value={form.speaker} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label>Speaker Bio</label>
          <textarea name="speakerBio" value={form.speakerBio} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label>Agenda</label>
          <textarea name="agenda" value={form.agenda} onChange={handleChange} className="form-control" />
        </div>
        <div className="d-flex gap-3 mt-4">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/scad/workshops')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default WorkshopForm; 