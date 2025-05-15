import React, { useState } from 'react';
import WorkshopDetails from './WorkshopDetails';
import './Workshops.css';

const Workshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  // Sample workshop data - replace with actual data from your backend
  const workshops = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      dateTime: 'May 20, 2024 - 2:00 PM',
      type: 'Live',
      description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript basics.',
      speaker: 'Dr. Sarah Johnson',
      speakerTitle: 'Senior Web Developer & Instructor'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      dateTime: 'May 22, 2024 - 3:00 PM',
      type: 'Recorded',
      description: 'An overview of data science concepts, tools, and methodologies for beginners.',
      speaker: 'Prof. Michael Chen',
      speakerTitle: 'Data Science Lead'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      dateTime: 'May 25, 2024 - 1:00 PM',
      type: 'Live',
      description: 'Master the essential principles of user interface and user experience design.',
      speaker: 'Lisa Anderson',
      speakerTitle: 'UX Design Director'
    }
  ];

  return (
    <div className="dashboard-section">
      <h2>Workshops</h2>
      
      {selectedWorkshop ? (
        <div>
          <button
            onClick={() => setSelectedWorkshop(null)}
            className="btn btn-secondary mb-4"
          >
            ← Back to Workshops
          </button>
          <WorkshopDetails workshop={selectedWorkshop} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="card"
              onClick={() => setSelectedWorkshop(workshop)}
            >
              <h3>{workshop.title}</h3>
              <div className="workshop-meta">
                <span>📅 {workshop.dateTime}</span>
                <span className={`workshop-type ${workshop.type.toLowerCase()}`}>
                  {workshop.type}
                </span>
              </div>
              <p className="workshop-description">{workshop.description}</p>
              <div className="workshop-speaker">
                <div className="speaker-avatar">
                  <span>👤</span>
                </div>
                <div>
                  <p className="speaker-name">{workshop.speaker}</p>
                  <p className="speaker-title">{workshop.speakerTitle}</p>
                </div>
              </div>
              <button
                className="btn btn-primary mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWorkshop(workshop);
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workshops; 