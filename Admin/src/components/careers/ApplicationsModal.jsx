import { STATUS_STYLE } from "./constants";

export default function ApplicationsModal({ viewApps, appsLoading, onClose, onStatusChange }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold">Applications</h2>
            <p className="text-white/40 text-sm">{viewApps.title}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl">✕</button>
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
                        onChange={e => onStatusChange(viewApps.jobId, app._id, e.target.value)}
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
  );
}