export default function JobFormModal({ form, setForm, editJob, saving, onSave, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold">{editJob ? "Edit Job" : "Post New Job"}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl">✕</button>
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
          <button onClick={onClose}
            className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition">
            Cancel
          </button>
          <button onClick={onSave} disabled={saving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-sm font-medium transition">
            {saving ? "Saving..." : editJob ? "Update Job" : "Post Job"}
          </button>
        </div>
      </div>
    </div>
  );
}