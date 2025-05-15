import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import StarRating from 'react-star-rating-component';

const WorkshopPlayer = ({ workshop, isRegistered }) => {
  const [notes, setNotes] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hasWatched, setHasWatched] = useState(false);
  const [liveFinished, setLiveFinished] = useState(false);

  // Simulate video progress
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    if (videoProgress >= 100) {
      setHasWatched(true);
      toast.success('Workshop completed! You can now download your certificate.');
    }
  }, [videoProgress]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, message]);
      setNewMessage('');
      toast.info('New message received');
    }
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', { rating, feedback });
    toast.success('Thank you for your feedback!');
    setShowFeedback(false);
  };

  return (
    <div className="workshop-player">
      <div className="player-container">
        {workshop.type === 'Live' ? (
          <div className="video-placeholder">
            <h3>Live Workshop</h3>
            <p>Workshop will start at {workshop.dateTime}</p>
            {!liveFinished && (
              <button className="btn btn-primary" onClick={() => window.open('https://zoom.us', '_blank')}>
                Join Now
              </button>
            )}
            {!liveFinished && (
              <button className="btn btn-secondary mt-3" onClick={() => setLiveFinished(true)}>
                Finish
              </button>
            )}
            {liveFinished && (
              <>
                <div className="certificate-section">
                  <a href="/certificates/my-certificate.pdf" download>
                    <button className="btn btn-primary">Download Certificate</button>
                  </a>
                </div>
                {!showFeedback && (
                  <button className="btn btn-secondary mt-3" onClick={() => setShowFeedback(true)}>
                    Rate Workshop
                  </button>
                )}
                {showFeedback && (
                  <div className="feedback-section mt-3">
                    <h4>Workshop Feedback</h4>
                    <StarRating
                      name="workshop-rating"
                      starCount={5}
                      value={rating}
                      onStarClick={setRating}
                      className="star-rating"
                    />
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your thoughts about the workshop..."
                      className="feedback-input"
                    />
                    <button className="btn btn-primary" onClick={handleSubmitFeedback}>
                      Submit Feedback
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="video-container">
            <video
              controls
              className="workshop-video"
              onTimeUpdate={(e) => {
                const progress = (e.target.currentTime / e.target.duration) * 100;
                setVideoProgress(progress);
              }}
            >
              <source src="/sample-workshop.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {hasWatched && (
              <>
                <div className="certificate-section">
                  <a href="/certificates/my-certificate.pdf" download>
                    <button className="btn btn-primary">Download Certificate</button>
                  </a>
                </div>
                {!showFeedback && (
                  <button className="btn btn-secondary mt-3" onClick={() => setShowFeedback(true)}>
                    Rate Workshop
                  </button>
                )}
                {showFeedback && (
                  <div className="feedback-section mt-3">
                    <h4>Workshop Feedback</h4>
                    <StarRating
                      name="workshop-rating"
                      starCount={5}
                      value={rating}
                      onStarClick={setRating}
                      className="star-rating"
                    />
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your thoughts about the workshop..."
                      className="feedback-input"
                    />
                    <button className="btn btn-primary" onClick={handleSubmitFeedback}>
                      Submit Feedback
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="workshop-features">
        <div className="notes-section">
          <h4>Notes</h4>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Take notes here..."
            className="notes-editor"
            rows={10}
          />
        </div>

        {workshop.type === 'Live' && (
          <div className={`chat-section ${showChat ? 'expanded' : 'minimized'}`}>
            <div className="chat-header" onClick={() => setShowChat(!showChat)}>
              <h4>Chat {messages.length > 0 && <span className="badge">{messages.length}</span>}</h4>
              <button className="btn btn-link">{showChat ? '−' : '+'}</button>
            </div>
            
            {showChat && (
              <>
                <div className="messages-container">
                  {messages.map((message) => (
                    <div key={message.id} className="message">
                      <span className="message-sender">{message.sender}</span>
                      <span className="message-time">{message.timestamp}</span>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="message-form">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                  />
                  <button type="submit" className="btn btn-primary">Send</button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopPlayer; 