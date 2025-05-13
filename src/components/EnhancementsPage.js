import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';

// Reusable status badge
const StatusBadge = ({ status }) => {
  const colors = {
    Pending: '#FFD700',
    Accepted: '#4CAF50',
    Rejected: '#F44336',
    Submitted: '#A49393',
    Reviewed: '#2196F3'
  };

  return (
    <span style={{
      background: colors[status] || '#ccc',
      color: '#fff',
      borderRadius: 8,
      padding: '2px 10px',
      fontWeight: 600
    }}>
      {status}
    </span>
  );
};

const EnhancementsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.email.includes('@')) errs.email = 'Email is invalid';
    if (!formData.name) errs.name = 'Name is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Fix form errors before submitting.");
    } else {
      toast.success("Form submitted successfully!");
      setFormData({ email: '', name: '' });
      setErrors({});
    }
  };

  const handleDelete = () => {
    setModalOpen(false);
    toast.info(<div>Item deleted. <button onClick={() => toast.success("Undo complete!")}>Undo</button></div>);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Breadcrumbs */}
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Home</Link> &gt; <Link to="/enhancements">Usability Enhancements</Link>
      </nav>

      <h2>🎯 Usability Enhancements Demo</h2>

      {/* Toast Feedback */}
      <section style={{ marginBottom: '2rem' }}>
        <h4>🔔 Toast Feedback</h4>
        <Button variant="contained" color="primary" onClick={() => toast.success("Operation successful!")}>
          Show Success Toast
        </Button>
        <Button variant="outlined" color="error" onClick={() => toast.error("Something went wrong!")}>
          Show Error Toast
        </Button>
      </section>

      {/* Confirm Modal */}
      <section style={{ marginBottom: '2rem' }}>
        <h4>❗ Confirm Modal</h4>
        <Button variant="contained" color="error" onClick={() => setModalOpen(true)}>
          Delete Item
        </Button>
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">Confirm</Button>
          </DialogActions>
        </Dialog>
      </section>

      {/* Form Validation */}
      <section style={{ marginBottom: '2rem' }}>
        <h4>📝 Inline Form Validation</h4>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ padding: '8px', width: '250px' }}
            />
            {errors.name && <div style={{ color: 'red', fontSize: '0.85rem' }}>{errors.name}</div>}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ padding: '8px', width: '250px' }}
            />
            {errors.email && <div style={{ color: 'red', fontSize: '0.85rem' }}>{errors.email}</div>}
          </div>
          <Button type="submit" variant="contained">Submit Form</Button>
        </form>
      </section>

      {/* Status Badges */}
      <section style={{ marginBottom: '2rem' }}>
        <h4>🏷️ Status Badges</h4>
        {['Pending', 'Accepted', 'Rejected', 'Submitted', 'Reviewed'].map(status => (
          <StatusBadge key={status} status={status} />
        ))}
      </section>

      {/* Responsive Note */}
      <section style={{ marginBottom: '2rem' }}>
        <h4>📱 Responsive Design Tip</h4>
        <p>Resize the screen to test responsiveness. Buttons and layouts should adapt automatically using CSS flex/grid.</p>
      </section>
    </div>
  );
};

export default EnhancementsPage;
