import React, { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    arrivals: true,
    qcFailures: true,
    lowStock: false,
    systemAlerts: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-900 uppercase">System Configuration</h2>
        <p className="text-xs text-emerald-600 uppercase">Global Parameters & Node Customization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* General */}
          <section className="bg-white p-4 rounded-lg border">
            <h3 className="text-xs font-bold text-emerald-800 uppercase mb-2">General Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-bold text-slate-500 uppercase">Warehouse Identifier</label>
                <input type="text" defaultValue="HK-ALPHA-09" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="text-[9px] font-bold text-slate-500 uppercase">Primary Timezone</label>
                <select className="w-full p-2 border rounded">
                  <option>UTC +08:00 (Hong Kong)</option>
                  <option>UTC +00:00 (London)</option>
                  <option>UTC -05:00 (New York)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Inventory Logic */}
          <section className="bg-white p-4 rounded-lg border space-y-4">
            <h3 className="text-xs font-bold text-emerald-800 uppercase mb-2">Inventory Logic</h3>
            <div className="flex justify-between items-center p-2 bg-emerald-50 rounded">
              <div>
                <p className="text-xs font-bold text-emerald-900 uppercase">Automatic QC Routing</p>
                <p className="text-[10px] text-emerald-600">Flag incoming batches for inspection</p>
              </div>
              <button
                onClick={() => toggleNotification('qcFailures')}
                className={`w-12 h-6 rounded-full relative ${notifications.qcFailures ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications.qcFailures ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Operator Profile */}
          <section className="bg-white p-4 rounded-lg border text-center">
            <img src="https://picsum.photos/seed/operator/80/80" alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-2" />
            <h4 className="text-sm font-bold uppercase">James T. Kirk</h4>
            <p className="text-[10px] text-emerald-600 uppercase mb-2">Senior Logistics Officer</p>
            <button className="w-full p-2 bg-gray-100 rounded border">Edit Credentials</button>
          </section>

          {/* Notifications */}
          <section className="bg-white p-4 rounded-lg border space-y-2">
            <h3 className="text-xs font-bold text-emerald-800 uppercase mb-2">Relay Alerts</h3>
            {[
              { label: 'Arrival Confirmations', key: 'arrivals' },
              { label: 'Low Stock Warnings', key: 'lowStock' },
              { label: 'System Status', key: 'systemAlerts' },
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center">
                <span className="text-[10px] font-bold">{item.label}</span>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`w-10 h-5 rounded-full relative ${notifications[item.key] ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${notifications[item.key] ? 'left-5.5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </section>

          {/* Danger Zone */}
          <section className="bg-red-50 p-4 rounded-lg border">
            <h3 className="text-xs font-bold text-red-600 uppercase mb-2">Critical Actions</h3>
            <button className="w-full p-2 bg-white text-red-600 border rounded">Reset Node Database</button>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 pt-4">
        <button className="px-6 py-2 bg-gray-100 rounded border">Discard Changes</button>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded">Apply Configuration</button>
      </div>
    </div>
  );
};

export default Settings;
