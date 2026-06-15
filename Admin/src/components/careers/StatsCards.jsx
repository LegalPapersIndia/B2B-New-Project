export default function StatsCards({ jobs }) {
  const stats = [
    { label: "Total Jobs",   value: jobs.length },
    { label: "Active",       value: jobs.filter(j => j.isActive).length },
    { label: "Inactive",     value: jobs.filter(j => !j.isActive).length },
    { label: "Applications", value: jobs.reduce((a, j) => a + (j.applications?.length || 0), 0) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">{s.label}</p>
          <p className="text-3xl font-bold mt-1 text-white">{s.value}</p>
        </div>
      ))}
    </div>
  );
}