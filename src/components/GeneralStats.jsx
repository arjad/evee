const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div
        key={i}
        className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm"
      >
        <p className={`text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 ${
          stat.color === 'emerald'
            ? 'text-emerald-800'
            : stat.color === 'amber'
            ? 'text-amber-800'
            : stat.color === 'blue'
            ? 'text-blue-800'
            : 'text-rose-800'
        }`}>
          {stat.label}
        </p>
        <p className="text-3xl font-black text-slate-900">{stat.val}</p>
      </div>
      ))}
    </div>
  );
};

export default Stats;
  