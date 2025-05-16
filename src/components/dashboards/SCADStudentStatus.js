import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const mockStudents = [
  { id: '20231234', name: 'John Doe', major: 'CS', status: 'In Progress', email: 'john.doe@email.com', phone: '01012345678', supervisor: 'Dr. Smith', logbook: 40, report: 'Submitted' },
  { id: '20231235', name: 'Sara Lee', major: 'DS', status: 'Completed', email: 'sara.lee@email.com', phone: '01087654321', supervisor: 'Dr. Brown', logbook: 60, report: 'Reviewed' },
  { id: '20231236', name: 'Ali Hassan', major: 'IS', status: 'In Progress', email: 'ali.hassan@email.com', phone: '01011223344', supervisor: 'Dr. White', logbook: 30, report: 'Submitted' },
  { id: '20231237', name: 'Mona Khaled', major: 'CS', status: 'Completed', email: 'mona.khaled@email.com', phone: '01099887766', supervisor: 'Dr. Black', logbook: 55, report: 'Reviewed' },
];

const statusColors = {
  'In Progress': '#E8B4B8',
  'Completed': '#4CAF50',
};

const SCADStudentStatus = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = mockStudents.filter(s => !filterStatus || s.status === filterStatus);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', color: '#67595E' }}>Student Status</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <FormControl variant="outlined" size="small" style={{ minWidth: 180 }}>
          <InputLabel id="status-label">Internship Status</InputLabel>
          <Select
            labelId="status-label"
            value={filterStatus}
            label="Internship Status"
            onChange={e => setFilterStatus(e.target.value)}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 14, textAlign: 'left' }}>ID</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Name</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Major</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Supervisor</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 14 }}>{s.id}</td>
                <td style={{ padding: 14 }}>{s.name}</td>
                <td style={{ padding: 14 }}>{s.major}</td>
                <td style={{ padding: 14 }}><span style={{ background: statusColors[s.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{s.status}</span></td>
                <td style={{ padding: 14 }}>{s.supervisor}</td>
                <td style={{ padding: 14 }}>
                  <button
                    style={{ background: '#E8B4B8', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => setSelectedStudent(s)}
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: '#A49393' }}>No students found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Student Profile Modal */}
      {selectedStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, maxWidth: 480, boxShadow: '0 2px 12px #eee', position: 'relative' }}>
            <button onClick={() => setSelectedStudent(null)} style={{ position: 'absolute', right: 16, top: 16, background: 'none', border: 'none', fontSize: 24, color: '#A49393', cursor: 'pointer' }}>×</button>
            <h3 style={{ color: '#E8B4B8', marginBottom: 16 }}>Student Profile</h3>
            <div style={{ marginBottom: 8 }}><b>ID:</b> {selectedStudent.id}</div>
            <div style={{ marginBottom: 8 }}><b>Name:</b> {selectedStudent.name}</div>
            <div style={{ marginBottom: 8 }}><b>Major:</b> {selectedStudent.major}</div>
            <div style={{ marginBottom: 8 }}><b>Status:</b> {selectedStudent.status}</div>
            <div style={{ marginBottom: 8 }}><b>Email:</b> {selectedStudent.email}</div>
            <div style={{ marginBottom: 8 }}><b>Phone:</b> {selectedStudent.phone}</div>
            <div style={{ marginBottom: 8 }}><b>Supervisor:</b> {selectedStudent.supervisor}</div>
            <div style={{ marginBottom: 8 }}><b>Logbook:</b> {selectedStudent.logbook}</div>
            <div style={{ marginBottom: 8 }}><b>Report:</b> {selectedStudent.report}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SCADStudentStatus; 