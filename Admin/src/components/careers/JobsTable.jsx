export default function JobsTable({
  jobs,
  loading,
  deletingId,
  onViewApps,
  onEdit,
  onToggle,
  onDelete,
}) {
  return (
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
                    <button onClick={() => onViewApps(job)}
                      className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition">
                      Applications
                    </button>
                    <button onClick={() => onEdit(job)}
                      className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs transition">
                      Edit
                    </button>
                    <button onClick={() => onToggle(job)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition ${
                        job.isActive
                          ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                          : "bg-green-500/20 hover:bg-green-500/30 text-green-400"
                      }`}>
                      {job.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => onDelete(job)}
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
  );
}