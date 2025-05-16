import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from '@mui/material';

const mockInternships = [
  {
    id: 1,
    company: 'Tech Innovators',
    jobTitle: 'Frontend Developer',
    duration: '3 months',
    paid: true,
    salary: '5000 EGP',
    industry: 'Technology',
    skills: ['React', 'JavaScript', 'CSS'],
    description: 'Work on a React-based web app for our clients.',
  },
  {
    id: 2,
    company: 'Green Energy',
    jobTitle: 'Data Analyst',
    duration: '6 months',
    paid: false,
    salary: '',
    industry: 'Energy',
    skills: ['Excel', 'Python', 'Data Visualization'],
    description: 'Analyze energy consumption data and create reports.',
  },
  {
    id: 3,
    company: 'Digital Solutions',
    jobTitle: 'Backend Developer',
    duration: '4 months',
    paid: true,
    salary: '6000 EGP',
    industry: 'Technology',
    skills: ['Node.js', 'API Development', 'MongoDB'],
    description: 'Develop and maintain Node.js APIs for our products.',
  },
  {
    id: 4,
    company: 'Global Consulting Group',
    jobTitle: 'Business Analyst',
    duration: '2 months',
    paid: false,
    salary: '',
    industry: 'Consulting',
    skills: ['Business Analysis', 'PowerPoint', 'Market Research'],
    description: 'Assist in market research and business analysis for consulting projects.',
  },
];

const industries = Array.from(new Set(mockInternships.map(i => i.industry)));
const durations = Array.from(new Set(mockInternships.map(i => i.duration)));

const SCADInternships = () => {
  const [search, setSearch] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterPaid, setFilterPaid] = useState('');
  const [selected, setSelected] = useState(null);

  // Filtering logic
  const filtered = mockInternships.filter(i => {
    const matchesSearch =
      i.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      i.company.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = !filterIndustry || i.industry === filterIndustry;
    const matchesDuration = !filterDuration || i.duration === filterDuration;
    const matchesPaid =
      filterPaid === '' ||
      (filterPaid === 'paid' && i.paid) ||
      (filterPaid === 'unpaid' && !i.paid);
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', color: '#67595E' }}>Available Internships</h2>
      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by job title or company name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, height: 40, borderRadius: 6, border: '1px solid #ddd', padding: '0 14px', fontSize: '1rem' }}
        />
        <FormControl variant="outlined" size="small" fullWidth style={{ minWidth: 150, height: 40 }}>
          <InputLabel id="industry-label">Industry</InputLabel>
          <Select
            labelId="industry-label"
            value={filterIndustry}
            label="Industry"
            onChange={e => setFilterIndustry(e.target.value)}
            style={{ height: 40 }}
          >
            <MenuItem value="">All Industries</MenuItem>
            {industries.map(ind => (
              <MenuItem key={ind} value={ind}>{ind}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" fullWidth style={{ minWidth: 120, height: 40 }}>
          <InputLabel id="duration-label">Duration</InputLabel>
          <Select
            labelId="duration-label"
            value={filterDuration}
            label="Duration"
            onChange={e => setFilterDuration(e.target.value)}
            style={{ height: 40 }}
          >
            <MenuItem value="">All Durations</MenuItem>
            {durations.map(dur => (
              <MenuItem key={dur} value={dur}>{dur}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" fullWidth style={{ minWidth: 120, height: 40 }}>
          <InputLabel id="paid-label">Paid</InputLabel>
          <Select
            labelId="paid-label"
            value={filterPaid}
            label="Paid"
            onChange={e => setFilterPaid(e.target.value)}
            style={{ height: 40 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="unpaid">Unpaid</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 14, textAlign: 'left' }}>Company</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Job Title</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Industry</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Duration</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Paid</th>
              <th style={{ padding: 14, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(i => (
              <tr
                key={i.id}
                style={{
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  background: selected && selected.id === i.id ? '#fbeaec' : 'transparent',
                  transition: 'background 0.2s'
                }}
                onClick={() => setSelected(i)}
              >
                <td style={{ padding: 14 }}>{i.company}</td>
                <td style={{ padding: 14 }}>{i.jobTitle}</td>
                <td style={{ padding: 14 }}>{i.industry}</td>
                <td style={{ padding: 14 }}>{i.duration}</td>
                <td style={{ padding: 14 }}>{i.paid ? 'Yes' : 'No'}</td>
                <td style={{ padding: 14 }}>
                  <button
                    style={{ background: '#E8B4B8', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}
                    onClick={e => { e.stopPropagation(); setSelected(i); }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: '#A49393' }}>No internships found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Details Modal */}
      {selected && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, maxWidth: 480, boxShadow: '0 2px 12px #eee', position: 'relative' }}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', right: 16, top: 16, background: 'none', border: 'none', fontSize: 24, color: '#A49393', cursor: 'pointer' }}>×</button>
            <h3 style={{ color: '#E8B4B8', marginBottom: 16 }}>Internship Details</h3>
            <div style={{ marginBottom: 8 }}><b>Company:</b> {selected.company}</div>
            <div style={{ marginBottom: 8 }}><b>Job Title:</b> {selected.jobTitle}</div>
            <div style={{ marginBottom: 8 }}><b>Industry:</b> {selected.industry}</div>
            <div style={{ marginBottom: 8 }}><b>Duration:</b> {selected.duration}</div>
            <div style={{ marginBottom: 8 }}><b>Paid:</b> {selected.paid ? 'Yes' : 'No'}</div>
            {selected.paid && <div style={{ marginBottom: 8 }}><b>Expected Salary:</b> {selected.salary}</div>}
            <div style={{ marginBottom: 8 }}><b>Skills Required:</b> {selected.skills.join(', ')}</div>
            <div style={{ marginBottom: 8 }}><b>Description:</b> {selected.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SCADInternships; 