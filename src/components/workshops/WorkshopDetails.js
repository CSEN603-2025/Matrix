import React, { useState } from 'react';
import { toast } from 'react-toastify';
import WorkshopPlayer from './WorkshopPlayer';

const WorkshopDetails = ({ workshop }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
    toast.success('Successfully registered for the workshop!');
  };

  const handleJoin = () => {
    if (workshop.type === 'Live') {
      toast.info('Joining live workshop...');
      // Add logic to join live workshop
    } else {
      toast.info('Opening recording...');
      // Add logic to open recording
    }
  };

  return (
    <div className="card">
      <div className="workshop-header">
        <h3>{workshop.title}</h3>
        <div className="workshop-meta">
          <span>📅 {workshop.dateTime}</span>
          <span className={`workshop-type ${workshop.type.toLowerCase()}`}>
            {workshop.type}
          </span>
        </div>
      </div>

      <div className="workshop-section">
        <h4>Description</h4>
        <p>{workshop.description}</p>
      </div>

      <div className="workshop-section">
        <h4>Speaker</h4>
        <div className="workshop-speaker">
          <div className="speaker-avatar">
            <span>👤</span>
          </div>
          <div>
            <p className="speaker-name">{workshop.speaker}</p>
            <p className="speaker-title">{workshop.speakerTitle}</p>
          </div>
        </div>
      </div>

      {isRegistered ? (
        <WorkshopPlayer workshop={workshop} isRegistered={isRegistered} />
      ) : (
        <button
          onClick={handleRegister}
          className="btn btn-primary"
        >
          Register
        </button>
      )}
    </div>
  );
};

export default WorkshopDetails; 