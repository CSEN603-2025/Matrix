import React, { useState } from 'react';

// Mock data
const summary = {
  students: 120,
  approvedInternships: 35,
  pendingApplications: 18,
  submittedReports: 50,
  activeCompanies: 22,
  ongoingInternships: 28,
};

const students = [
  { id: '20231234', name: 'John Doe', major: 'CS', status: 'In Progress', supervisor: 'Dr. Smith', logbook: 40, report: 'Submitted' },
  { id: '20231235', name: 'Sara Lee', major: 'DS', status: 'Completed', supervisor: 'Dr. Brown', logbook: 60, report: 'Reviewed' },
];

const companies = [
  { id: 1, name: 'Tech Innovators', status: 'Active', internships: 2 },
  { id: 2, name: 'Green Energy', status: 'Pending', internships: 1 },
];

const applications = [
  { id: 1, student: 'John Doe', company: 'Tech Innovators', status: 'Pending', date: '2024-05-10', docs: true },
  { id: 2, student: 'Sara Lee', company: 'Green Energy', status: 'Approved', date: '2024-05-09', docs: true },
];

const logbooks = [
  { id: 1, student: 'John Doe', supervisor: 'Dr. Smith', date: '2024-05-10', status: 'On Time' },
  { id: 2, student: 'Sara Lee', supervisor: 'Dr. Brown', date: '2024-05-09', status: 'Late' },
];

const reports = [
  { id: 1, student: 'John Doe', status: 'Submitted', reviewer: '', grade: '' },
  { id: 2, student: 'Sara Lee', status: 'Reviewed', reviewer: 'Dr. Brown', grade: 'A' },
];

const notifications = [
  { id: 1, type: 'announcement', message: 'Logbook deadline is 2024-05-15', date: '2024-05-10' },
  { id: 2, type: 'message', message: 'Student John Doe requested extension', date: '2024-05-09' },
];

const deadlines = [
  { type: 'Application', date: '2024-05-20' },
  { type: 'Logbook', date: '2024-05-15' },
  { type: 'Report', date: '2024-06-01' },
];

const requests = [
  { id: 1, type: 'Extension', student: 'John Doe', status: 'Pending' },
  { id: 2, type: 'Company Change', student: 'Sara Lee', status: 'Approved' },
];

const adminUsers = [
  { id: 1, name: 'Admin User', email: 'admin@guc.edu.eg', status: 'Active' },
];

const helpLinks = [
  { label: 'SCAD Admin Manual', url: '#' },
  { label: 'IT Support', url: '#' },
];

const statusColors = {
  Pending: '#FFD700',
  Approved: '#4CAF50',
  Rejected: '#F44336',
  Completed: '#4CAF50',
  'In Progress': '#E8B4B8',
  Reviewed: '#2196F3',
  Submitted: '#A49393',
  Active: '#4CAF50',
};

const SCADOfficeDashboard = () => {
  const [studentFilter, setStudentFilter] = useState({ major: '', id: '', status: '' });
  const [companyFilter, setCompanyFilter] = useState('');
  const [appFilter, setAppFilter] = useState({ company: '', student: '', status: '' });

  // Filtered lists (mock logic)
  const filteredStudents = students.filter(s =>
    (!studentFilter.major || s.major === studentFilter.major) &&
    (!studentFilter.id || s.id.includes(studentFilter.id)) &&
    (!studentFilter.status || s.status === studentFilter.status)
  );
  const filteredCompanies = companies.filter(c =>
    !companyFilter || c.status === companyFilter
  );
  const filteredApps = applications.filter(a =>
    (!appFilter.company || a.company === appFilter.company) &&
    (!appFilter.student || a.student === appFilter.student) &&
    (!appFilter.status || a.status === appFilter.status)
  );

  return (
    <div className="dashboard" style={{ padding: 24 }}>
      {/* 1. Dashboard Overview / Summary Cards */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Registered Students</div>
          <div style={{ fontSize: 32, color: '#E8B4B8', fontWeight: 700 }}>{summary.students}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Approved Internships</div>
          <div style={{ fontSize: 32, color: '#4CAF50', fontWeight: 700 }}>{summary.approvedInternships}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Pending Applications</div>
          <div style={{ fontSize: 32, color: '#FFD700', fontWeight: 700 }}>{summary.pendingApplications}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Submitted Reports</div>
          <div style={{ fontSize: 32, color: '#2196F3', fontWeight: 700 }}>{summary.submittedReports}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Active Companies</div>
          <div style={{ fontSize: 32, color: '#4CAF50', fontWeight: 700 }}>{summary.activeCompanies}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Ongoing Internships</div>
          <div style={{ fontSize: 32, color: '#A49393', fontWeight: 700 }}>{summary.ongoingInternships}</div>
        </div>
      </div>

      {/* 2. Student Management */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Student Management</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input type="text" placeholder="Filter by ID" value={studentFilter.id} onChange={e => setStudentFilter({ ...studentFilter, id: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }} />
          <select value={studentFilter.major} onChange={e => setStudentFilter({ ...studentFilter, major: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Majors</option>
            <option value="CS">CS</option>
            <option value="DS">DS</option>
          </select>
          <select value={studentFilter.status} onChange={e => setStudentFilter({ ...studentFilter, status: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>ID</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Major</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Supervisor</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Logbook</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Report</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, idx) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{s.id}</td>
                <td style={{ padding: 12 }}>{s.name}</td>
                <td style={{ padding: 12 }}>{s.major}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[s.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{s.status}</span></td>
                <td style={{ padding: 12 }}>{s.supervisor}</td>
                <td style={{ padding: 12 }}>{s.logbook}</td>
                <td style={{ padding: 12 }}>{s.report}</td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>View Profile</button>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Assign Supervisor</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Company Management */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Company Management</h3>
        <select value={companyFilter} onChange={e => setCompanyFilter(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}>
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
        </select>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Internships</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((c, idx) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{c.name}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[c.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{c.status}</span></td>
                <td style={{ padding: 12 }}>{c.internships}</td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>View</button>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Approve</button>
                  <button className="btn btn-secondary" style={{ color: '#F44336', borderColor: '#F44336' }}>Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Internship Applications */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Internship Applications</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <select value={appFilter.company} onChange={e => setAppFilter({ ...appFilter, company: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Companies</option>
            {companies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select value={appFilter.student} onChange={e => setAppFilter({ ...appFilter, student: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Students</option>
            {students.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <select value={appFilter.status} onChange={e => setAppFilter({ ...appFilter, status: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Company</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Docs</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((a, idx) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{a.student}</td>
                <td style={{ padding: 12 }}>{a.company}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[a.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{a.status}</span></td>
                <td style={{ padding: 12 }}>{a.date}</td>
                <td style={{ padding: 12 }}>{a.docs ? <a href="#">View</a> : '-'}</td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-primary" style={{ marginRight: 8 }}>Approve</button>
                  <button className="btn btn-secondary" style={{ marginRight: 8, color: '#F44336', borderColor: '#F44336' }}>Reject</button>
                  <button className="btn btn-secondary">Request Resubmission</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. Logbook Monitoring */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Logbook Monitoring</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Supervisor</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logbooks.map((l, idx) => (
              <tr key={l.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{l.student}</td>
                <td style={{ padding: 12 }}>{l.supervisor}</td>
                <td style={{ padding: 12 }}>{l.date}</td>
                <td style={{ padding: 12 }}><span style={{ background: l.status === 'Late' ? '#F44336' : '#4CAF50', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{l.status}</span></td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Export</button>
                  <button className="btn btn-secondary">Detect Issues</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 6. Final Report Tracking */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Final Report Tracking</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Reviewer</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Grade</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, idx) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{r.student}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[r.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{r.status}</span></td>
                <td style={{ padding: 12 }}>{r.reviewer || '-'}</td>
                <td style={{ padding: 12 }}>{r.grade || '-'}</td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Download</button>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Mark Reviewed</button>
                  <button className="btn btn-secondary">Assign Reviewer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 7. Notifications & Messaging */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Notifications & Messaging</h3>
        <button className="btn btn-primary" style={{ marginBottom: 8 }}>Send Announcement</button>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {notifications.map((n, idx) => (
            <li key={n.id} style={{ marginBottom: 8, padding: 8, background: '#fafafa', borderRadius: 6, borderLeft: `4px solid ${n.type === 'announcement' ? '#E8B4B8' : '#FFD700'}` }}>
              {n.message} <span style={{ color: '#A49393', fontSize: 13, float: 'right' }}>{n.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Deadlines & Scheduling */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Deadlines & Scheduling</h3>
        <button className="btn btn-primary" style={{ marginBottom: 8 }}>Set New Deadline</button>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {deadlines.map((d, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <b>{d.type}:</b> {d.date}
            </li>
          ))}
        </ul>
      </div>

      {/* 9. Requests & Exceptions */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Requests & Exceptions</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Type</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, idx) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{r.type}</td>
                <td style={{ padding: 12 }}>{r.student}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[r.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{r.status}</span></td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Approve</button>
                  <button className="btn btn-secondary" style={{ color: '#F44336', borderColor: '#F44336' }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 10. Data Export & Reporting */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Data Export & Reporting</h3>
        <button className="btn btn-primary" style={{ marginRight: 8 }}>Export Student Status</button>
        <button className="btn btn-primary" style={{ marginRight: 8 }}>Export Application History</button>
        <button className="btn btn-primary">Export Logbook Summaries</button>
        <div style={{ marginTop: 8 }}>
          <button className="btn btn-secondary">Generate University Report</button>
        </div>
      </div>

      {/* 11. Admin Tools */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Admin Tools</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((a, idx) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{a.name}</td>
                <td style={{ padding: 12 }}>{a.email}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[a.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{a.status}</span></td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Deactivate</button>
                  <button className="btn btn-secondary">Reset Password</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 8 }}>
          <button className="btn btn-secondary" style={{ marginRight: 8 }}>Adjust System Rules</button>
          <button className="btn btn-secondary">System Backup/Reset</button>
        </div>
      </div>

      {/* 12. Help & Support */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Help & Support</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {helpLinks.map((link, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#A49393', textDecoration: 'underline', fontSize: 15 }}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SCADOfficeDashboard; 