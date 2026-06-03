// pages/admin/AdminCareers.jsx

import { useEffect, useState } from "react";
import {
  adminGetJobs, adminCreateJob, adminUpdateJob,
  adminDeleteJob, adminGetApplications, adminUpdateAppStatus,
} from "../../api/careerApi";

const EMPTY_FORM = {
  title: "", department: "", location: "", type: "Full-time",
  experience: "", salary: "", description: "", requirements: "", isActive: true,
};

const STATUS_STYLE = {
  pending:     "bg-yellow-500/20 text-yellow-400",
  reviewed:    "bg-blue-500/20 text-blue-400",
  shortlisted: "bg-green-500/20 text-green-400",
  rejected:    "bg-red-500/20 text-red-400",
};

export default function AdminCareers() {
  const [jobs,        setJobs]        = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [showForm,    setShowForm]    = useState(false);
  const [editJob,     setEditJob]     = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [saving,      setSaving]      = useState(false);
  const [viewApps,    setViewApps]    = useState(null);
  const [appsLoading, setAppsLoading] = useState(false);
  const [deletingId,  setDeletingId]  = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await adminGetJobs();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const openCreate = () => {
    setEditJob(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (job) => {
    setEditJob(job);
    setForm({
      title:        job.title,
      department:   job.department,
      location:     job.location,
      type:         job.type,
      experience:   job.experience,
      salary:       job.salary || "",
      description:  job.description,
      requirements: job.requirements?.join("\n") || "",
      isActive:     job.isActive,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.department || !form.location || !form.experience || !form.description) {
      alert("Please fill all required fields!");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        requirements: JSON.stringify(form.requirements.split("\n").filter(r => r.trim())),
      };
      if (editJob) {
        await adminUpdateJob(editJob._id, payload);
      } else {
        await adminCreateJob(payload);
      }
      setShowForm(false);
      fetchJobs();
    } catch {
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete "${job.title}"?`)) return;
    setDeletingId(job._id);
    try {
      await adminDeleteJob(job._id);
      setJobs(prev => prev.filter(j => j._id !== job._id));
    } catch {
      alert("Delete failed!");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (job) => {
    await adminUpdateJob(job._id, {
      ...job,
      requirements: JSON.stringify(job.requirements || []),
      isActive: !job.isActive,
    });
    fetchJobs();
  };

  const handleViewApps = async (job) => {
    setAppsLoading(true);
    setViewApps({ jobId: job._id, title: job.title, applications: [] });
    try {
      const data = await adminGetApplications(job._id);
      setViewApps({ jobId: job._id, title: job.title, applications: data.applications || [] });
    } finally {
      setAppsLoading(false);
    }
  };

  const handleStatusChange = async (jobId, appId, status) => {
    await adminUpdateAppStatus(jobId, appId, status);
    handleViewApps({ _id: jobId, title: viewApps.title });
  };

  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Career Management</h1>
          <p className="text-white/40 text-sm mt-1">{jobs.length} total jobs</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          + Post New Job
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Jobs",   value: jobs.length },
          { label: "Active",       value: jobs.filter(j => j.isActive).length },
          { label: "Inactive",     value: jobs.filter(j => !j.isActive).length },
          { label: "Applications", value: jobs.reduce((a, j) => a + (j.applications?.length || 0), 0) },
        ].map((s, i) => (
          <div key={i} className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
            <p className="text-white/40 text-sm">{s.label}</p>
            <p className="text-3xl font-bold mt-1 text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Job Title</th>
                <th className="p-4">Department</th>
                <th className="p-4">Location</th>
                <th className="p-4">Type</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Applications</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-white/40">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && jobs.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-white/40">No jobs posted yet</td>
                </tr>
              )}
              {!loading && jobs.map(job => (
                <tr key={job._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">
                  <td className="p-4 font-medium">{job.title}</td>
                  <td className="p-4">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                      {job.department}
                    </span>
                  </td>
                  <td className="p-4 text-white/60">{job.location}</td>
                  <td className="p-4 text-white/60">{job.type}</td>
                  <td className="p-4 text-white/60">{job.experience}</td>
                  <td className="p-4">
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-medium">
                      {job.applications?.length || 0} applied
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {job.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => handleViewApps(job)}
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition">
                        Applications
                      </button>
                      <button onClick={() => openEdit(job)}
                        className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs transition">
                        Edit
                      </button>
                      <button onClick={() => handleToggle(job)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition ${
                          job.isActive
                            ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                            : "bg-green-500/20 hover:bg-green-500/30 text-green-400"
                        }`}>
                        {job.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button onClick={() => handleDelete(job)}
                        disabled={deletingId === job._id}
                        className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition">
                        {deletingId === job._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE/EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg font-semibold">{editJob ? "Edit Job" : "Post New Job"}</h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white text-xl">✕</button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Job Title *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    placeholder="e.g. Frontend Developer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Department *</label>
                  <input value={form.department} onChange={e => setForm({...form, department: e.target.value})}
                    placeholder="e.g. Engineering"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Location *</label>
                  <input value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                    placeholder="e.g. Noida, UP"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Job Type *</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
                    <option className="bg-[#0D0D14]">Full-time</option>
                    <option className="bg-[#0D0D14]">Part-time</option>
                    <option className="bg-[#0D0D14]">Remote</option>
                    <option className="bg-[#0D0D14]">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Experience *</label>
                  <input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}
                    placeholder="e.g. 2-4 years"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Salary Range</label>
                  <input value={form.salary} onChange={e => setForm({...form, salary: e.target.value})}
                    placeholder="e.g. ₹5-8 LPA"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="text-white/50 text-xs mb-1 block">Job Description *</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  rows={4} placeholder="Describe the role..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none" />
              </div>

              <div>
                <label className="text-white/50 text-xs mb-1 block">Requirements <span className="text-white/30">(one per line)</span></label>
                <textarea value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})}
                  rows={4} placeholder={"React experience\nNode.js knowledge\nGood communication"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="isActive" checked={form.isActive}
                  onChange={e => setForm({...form, isActive: e.target.checked})}
                  className="w-4 h-4 accent-blue-500" />
                <label htmlFor="isActive" className="text-sm text-white/70">Active (visible on website)</label>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 flex-shrink-0">
              <button onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-sm font-medium transition">
                {saving ? "Saving..." : editJob ? "Update Job" : "Post Job"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPLICATIONS MODAL */}
      {viewApps && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
              <div>
                <h2 className="text-lg font-semibold">Applications</h2>
                <p className="text-white/40 text-sm">{viewApps.title}</p>
              </div>
              <button onClick={() => setViewApps(null)} className="text-white/40 hover:text-white text-xl">✕</button>
            </div>

            <div className="p-6 overflow-y-auto">
              {appsLoading ? (
                <div className="text-center py-10">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : viewApps.applications.length === 0 ? (
                <div className="text-center py-10 text-white/40">No applications yet</div>
              ) : (
                <div className="space-y-4">
                  {viewApps.applications.map(app => (
                    <div key={app._id} className="border border-white/10 rounded-2xl p-5 hover:bg-white/[0.03] transition">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-white">{app.name}</h4>
                          <p className="text-white/50 text-sm mt-0.5">{app.email} • {app.phone}</p>
                          <p className="text-white/30 text-xs mt-1">{new Date(app.appliedAt).toLocaleDateString("en-IN")}</p>
                          {app.coverLetter && (
                            <p className="text-white/50 text-sm mt-3 line-clamp-2">{app.coverLetter}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${STATUS_STYLE[app.status]}`}>
                            {app.status}
                          </span>
                          {app.resume?.url && (
                            <a href={app.resume.url} target="_blank" rel="noreferrer"
                              className="text-xs text-blue-400 hover:underline">
                              ↓ Download Resume
                            </a>
                          )}
                          <select value={app.status}
                            onChange={e => handleStatusChange(viewApps.jobId, app._id, e.target.value)}
                            className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white outline-none">
                            <option className="bg-[#0D0D14]" value="pending">Pending</option>
                            <option className="bg-[#0D0D14]" value="reviewed">Reviewed</option>
                            <option className="bg-[#0D0D14]" value="shortlisted">Shortlisted</option>
                            <option className="bg-[#0D0D14]" value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


