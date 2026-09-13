import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  GraduationCap,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [volunteers, setVolunteers] = useState([]);
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingDate, setEditingDate] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  useEffect(() => {
    if (!userInfo) {
      navigate('/admin/login');
      return;
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [vRes, iRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/volunteers`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }),
        fetch(`${import.meta.env.VITE_API_URL}/interns`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }),
      ]);
      if (vRes.ok) setVolunteers(await vRes.json());
      if (iRes.ok) setInterns(await iRes.json());
    } catch (err) {
      console.error('Error fetching data', err);
    }
    setLoading(false);
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/admin/login');
  };

  const handleApprove = async (type, id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${type}/${id}/approve`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      if (res.ok) {
        showToast(`${type === 'volunteers' ? 'Volunteer' : 'Intern'} approved`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (type, id) => {
    if (!window.confirm('Reject this application?')) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${type}/${id}/reject`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      if (res.ok) {
        showToast('Application rejected');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (type, id) => {
    if (
      !window.confirm(
        `Are you sure you want to delete this ${
          type === 'volunteers' ? 'volunteer' : 'intern'
        }?`
      )
    )
      return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${type}/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      if (res.ok) {
        showToast('Deleted');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCertDate = async (newDate) => {
    if (!editingDate) return;
    const { id, type } = editingDate;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${type}/${id}/certificate-date`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            certificateDate: newDate,
            certificateIssueDate: newDate,
          }),
        }
      );
      if (res.ok) {
        showToast('Certificate date updated');
        setEditingDate(null);
        fetchData();
      } else {
        showToast('Failed to update date', 'error');
      }
    } catch {
      showToast('Failed to update date', 'error');
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'volunteers', label: `Volunteers (${volunteers.length})`, icon: Users },
    { id: 'interns', label: `Interns (${interns.length})`, icon: GraduationCap },
  ];

  const renderTable = (items, type) => (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Department</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Status</th>
              <th className="p-4">Reg No.</th>
              <th className="p-4">Cert Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((person) => (
              <tr key={person._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-900">
                  {person.fullName}
                </td>
                <td className="p-4">
                  <div className="text-sm break-all">{person.email}</div>
                  <div className="text-sm">{person.phone}</div>
                </td>
                <td className="p-4 text-sm">{person.department || 'General'}</td>
                <td className="p-4 text-sm">
                  {person.startDate
                    ? new Date(person.startDate).toLocaleDateString('en-GB')
                    : '—'}
                  {' → '}
                  {person.endDate
                    ? new Date(person.endDate).toLocaleDateString('en-GB')
                    : '—'}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      person.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : person.status === 'Rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {person.status}
                  </span>
                </td>
                <td className="p-4 font-mono text-sm font-bold text-gray-700">
                  {person.registrationNumber || '-'}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {person.certificateDate
                    ? new Date(person.certificateDate).toLocaleDateString('en-GB')
                    : '—'}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {person.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(type, person._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 whitespace-nowrap"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(type, person._id)}
                          className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 whitespace-nowrap"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {person.status === 'Approved' && (
                      <button
                        onClick={() =>
                          setEditingDate({
                            id: person._id,
                            type,
                            currentDate:
                              person.certificateDate || person.certificateIssueDate,
                          })
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 whitespace-nowrap"
                      >
                        Edit Date
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(type, person._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="8" className="p-8 text-center text-gray-500">
                  No {type} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {items.map((person) => (
          <div key={person._id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-gray-900">
                  {person.fullName}
                </div>
                <div className="text-xs text-gray-500">{person.email}</div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  person.status === 'Approved'
                    ? 'bg-green-100 text-green-700'
                    : person.status === 'Rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {person.status}
              </span>
            </div>
            <div className="text-sm">
              <div>📞 {person.phone}</div>
              <div>🏢 {person.department || 'General'}</div>
              <div>🔑 {person.registrationNumber || '-'}</div>
              <div>
                📅 Cert Date:{' '}
                {person.certificateDate
                  ? new Date(person.certificateDate).toLocaleDateString('en-GB')
                  : '—'}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {person.status === 'Pending' && (
                <>
                  <button
                    onClick={() => handleApprove(type, person._id)}
                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(type, person._id)}
                    className="flex-1 bg-orange-500 text-white px-3 py-2 rounded text-sm"
                  >
                    Reject
                  </button>
                </>
              )}
              {person.status === 'Approved' && (
                <button
                  onClick={() =>
                    setEditingDate({
                      id: person._id,
                      type,
                      currentDate:
                        person.certificateDate || person.certificateIssueDate,
                    })
                  }
                  className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm"
                >
                  Edit Date
                </button>
              )}
              <button
                onClick={() => handleDelete(type, person._id)}
                className={`${
                  person.status === 'Pending' ? 'flex-1' : 'w-full'
                } bg-red-500 text-white px-3 py-2 rounded text-sm`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No {type} found.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-lg shadow-lg text-sm font-medium ${
            toast.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-primary text-white'
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Edit Date Modal */}
      {editingDate && (
        <EditDateModal
          editingDate={editingDate}
          onClose={() => setEditingDate(null)}
          onSave={handleUpdateCertDate}
        />
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-primary text-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold font-poppins">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 py-6 space-y-2 px-4 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-lg font-medium transition 
                  flex items-center gap-3
                  ${
                    activeTab === item.id
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-800'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium transition flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800 capitalize">
            {activeTab}
          </h1>
          <div className="w-6" />
        </div>

        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <h1 className="hidden lg:block text-3xl font-bold text-gray-800 mb-8 capitalize">
            {activeTab}
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 text-center">
                    <h3 className="text-sm sm:text-lg text-gray-500 font-medium mb-2">
                      Total Volunteers
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-primary">
                      {volunteers.length}
                    </p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 text-center">
                    <h3 className="text-sm sm:text-lg text-gray-500 font-medium mb-2">
                      Approved Volunteers
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-green-600">
                      {volunteers.filter((v) => v.status === 'Approved').length}
                    </p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 text-center">
                    <h3 className="text-sm sm:text-lg text-gray-500 font-medium mb-2">
                      Pending Volunteers
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-orange-500">
                      {volunteers.filter((v) => v.status === 'Pending').length}
                    </p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 text-center">
                    <h3 className="text-sm sm:text-lg text-gray-500 font-medium mb-2">
                      Total Interns
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-primary">
                      {interns.length}
                    </p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 text-center">
                    <h3 className="text-sm sm:text-lg text-gray-500 font-medium mb-2">
                      Approved Interns
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-green-600">
                      {interns.filter((v) => v.status === 'Approved').length}
                    </p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 text-center">
                    <h3 className="text-sm sm:text-lg text-gray-500 font-medium mb-2">
                      Pending Interns
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-orange-500">
                      {interns.filter((v) => v.status === 'Pending').length}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'volunteers' && renderTable(volunteers, 'volunteers')}
              {activeTab === 'interns' && renderTable(interns, 'interns')}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============ EDIT DATE MODAL ============ */
function EditDateModal({ editingDate, onClose, onSave }) {
  const [newDate, setNewDate] = useState(
    editingDate?.currentDate
      ? new Date(editingDate.currentDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <div
        className="bg-white max-w-md w-full rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-xl font-bold text-primary font-poppins">
              Update Certificate Date
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Change the issue date that appears on the certificate
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New issue date
          </label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(newDate)}
            className="flex-1 bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition"
          >
            Save date
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;