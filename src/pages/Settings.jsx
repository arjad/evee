import React, { useState } from 'react';

// --- Mock Data ---

const MOCK_CENTERS = [
  { id: 'SC-001', name: 'West Dock Hub', location: 'Section B-12', capacity: '85%', status: 'Active', efficiency: 94 },
  { id: 'SC-002', name: 'Cold Storage Relay', location: 'Basement-01', capacity: '42%', status: 'Under Maintenance', efficiency: 78 },
  { id: 'SC-003', name: 'Automated Sort Facility', location: 'Roof Deck', capacity: '98%', status: 'Active', efficiency: 99 },
  { id: 'SC-004', name: 'Hazmat Processing', location: 'Isolated Block C', capacity: '12%', status: 'Offline', efficiency: 0 },
  { id: 'SC-005', name: 'Primary Dispatch', location: 'Main Plaza', capacity: '67%', status: 'Active', efficiency: 91 },
];

const MOCK_TECHS = [
  { id: 'T-10', name: 'Montgomery Scott', specialty: 'Hyperdrive Systems', rating: 4.9, completedTasks: 452, availability: 'Available', avatar: 'https://picsum.photos/seed/tech1/100/100' },
  { id: 'T-11', name: 'Geordi La Forge', specialty: 'Sensors & Optics', rating: 5.0, completedTasks: 890, availability: 'On Assignment', avatar: 'https://picsum.photos/seed/tech2/100/100' },
  { id: 'T-12', name: 'B’Elanna Torres', specialty: 'Structural Integrity', rating: 4.7, completedTasks: 215, availability: 'Away', avatar: 'https://picsum.photos/seed/tech3/100/100' },
  { id: 'T-13', name: 'Miles O’Brien', specialty: 'Transporter Arrays', rating: 4.8, completedTasks: 1205, availability: 'Available', avatar: 'https://picsum.photos/seed/tech4/100/100' },
];

const MOCK_DEALERS = [
  { id: 'D-X1', name: 'Alpha Centauri Logistics', region: 'North Quadrant', volume: '1,200/mo', contractTier: 'Platinum', lastAudit: '2023-12-15' },
  { id: 'D-X2', name: 'Betelgeuse Retailers', region: 'South Rim', volume: '850/mo', contractTier: 'Gold', lastAudit: '2024-01-20' },
  { id: 'D-X3', name: 'Ganymede Distribution', region: 'Asteroid Belt', volume: '450/mo', contractTier: 'Silver', lastAudit: '2024-02-10' },
  { id: 'D-X4', name: 'Terra Nova Supplies', region: 'Outer Core', volume: '3,400/mo', contractTier: 'Platinum', lastAudit: '2023-11-05' },
  { id: 'D-X5', name: 'Vulcan Hardware', region: 'Sector 001', volume: '920/mo', contractTier: 'Gold', lastAudit: '2024-03-01' },
];

// --- Component ---

const Settings = () => {
  const [activeTab, setActiveTab] = useState('SERVICE_CENTERS');
  const [notifications, setNotifications] = useState({
    arrivals: true,
    qcFailures: true,
    lowStock: false,
    systemAlerts: true,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderServiceCenters = () => (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Identifier</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Facility Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Grid Location</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Capacity</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_CENTERS.map(center => (
              <tr key={center.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-bold text-emerald-700">{center.id}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800 uppercase">{center.name}</td>
                <td className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">{center.location}</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px] mb-1">
                    <div className={`h-1.5 rounded-full ${parseInt(center.capacity) > 90 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: center.capacity }}></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">{center.capacity}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${
                    center.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                    center.status === 'Under Maintenance' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>{center.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[10px] font-bold text-emerald-600 uppercase hover:underline">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTechnicians = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {MOCK_TECHS.map(tech => (
        <div key={tech.id} className="bg-white border rounded-xl p-4 flex gap-4 shadow-sm hover:border-emerald-200">
          <img src={tech.avatar} className="w-16 h-16 rounded-lg object-cover border" alt={tech.name} />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold uppercase text-slate-800">{tech.name}</h4>
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-2">{tech.specialty}</p>
              </div>
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                tech.availability === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>{tech.availability}</span>
            </div>
            <div className="flex items-center gap-4 border-t pt-2 mt-1">
              <div>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Completed</p>
                <p className="text-xs font-bold text-slate-700">{tech.completedTasks}</p>
              </div>
              <div>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Rating</p>
                <p className="text-xs font-bold text-slate-700">{tech.rating} ★</p>
              </div>
              <button className="ml-auto text-[9px] font-bold text-emerald-600 uppercase hover:bg-emerald-50 px-2 py-1 rounded">Assign</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDealers = () => (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Partner</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Region</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Tier</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase text-right">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_DEALERS.map(dealer => (
              <tr key={dealer.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-xs font-bold text-slate-800 uppercase">{dealer.name}</td>
                <td className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">{dealer.region}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                    dealer.contractTier === 'Platinum' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                    dealer.contractTier === 'Gold' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-700'
                  }`}>{dealer.contractTier}</span>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-700 text-right">{dealer.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-emerald-900 uppercase">
            Settings
          </h2>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {['SERVICE_CENTERS', 'TECHNICIANS', 'DEALERS'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  activeTab === tab ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-400 hover:text-emerald-600 hover:bg-white/40'
                }`}
              >
                <span>{tab === 'SERVICE_CENTERS' ? '🏢' : tab === 'TECHNICIANS' ? '🛠️' : '🤝'}</span>
                <span>{tab.replace('_', ' ')}</span>
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
            {activeTab === 'SERVICE_CENTERS' && renderServiceCenters()}
            {activeTab === 'TECHNICIANS' && renderTechnicians()}
            {activeTab === 'DEALERS' && renderDealers()}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <section className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-emerald-800 uppercase mb-4 border-b pb-2">Node Identity</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1 tracking-widest">Warehouse ID</label>
                <input type="text" defaultValue="HK-ALPHA-09" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1 tracking-widest">Primary Timezone</label>
                <select className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                  <option>UTC +08:00 (Hong Kong)</option>
                  <option>UTC +00:00 (London)</option>
                  <option>UTC -05:00 (New York)</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="relative inline-block mb-3">
              <img src="https://picsum.photos/seed/operator/80/80" alt="Profile" className="w-20 h-20 rounded-full border-2 border-emerald-500" />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <h4 className="text-sm font-bold uppercase text-slate-800">James T. Kirk</h4>
            <p className="text-[10px] text-emerald-600 font-bold uppercase mb-4">Senior Logistics Officer</p>
            <button className="w-full py-2 text-[10px] font-bold bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200">Edit Profile</button>
          </section>

          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-emerald-800 uppercase mb-2 border-b pb-2">Relay Alerts</h3>
            {['arrivals', 'lowStock', 'systemAlerts'].map(key => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">{key === 'arrivals' ? 'Arrival Confirmations' : key === 'lowStock' ? 'Low Stock Warnings' : 'System Status'}</span>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${notifications[key] ? 'bg-emerald-500' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${notifications[key] ? 'left-5.5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </section>

        </div>
      </div>
    </div>
  );
};

export default Settings;
