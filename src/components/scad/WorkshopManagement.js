import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialWorkshops = [
  {
    id: 1,
    title: 'Intro to Web Dev',
    dateTime: '2024-05-20 14:00',
    speaker: 'Dr. Sarah Johnson',
    agenda: 'HTML, CSS, JS basics',
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    dateTime: '2024-05-22 15:00',
    speaker: 'Prof. Michael Chen',
    agenda: 'Data science concepts',
  },
];

const WorkshopManagement = () => {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setWorkshops(workshops.filter(w => w.id !== id));
  };

  return (
    <div className="dashboard-section">
      <div className="d-flex justify-between align-center mb-4">
        <h2>Workshop Management</h2>
        <button className="btn btn-primary" onClick={() => navigate('/scad/workshops/new')}>
          Add New Workshop
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date/Time</th>
            <th>Speaker</th>
            <th>Agenda</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workshops.map(w => (
            <tr key={w.id}>
              <td>{w.title}</td>
              <td>{w.dateTime}</td>
              <td>{w.speaker}</td>
              <td>{w.agenda}</td>
              <td>
                <button className="btn btn-secondary btn-sm mr-2" onClick={() => navigate(`/scad/workshops/${w.id}/edit`)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(w.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkshopManagement; 