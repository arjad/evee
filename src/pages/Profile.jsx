import React, {useState} from 'react'

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 's.chen@emeraldsystems.com',
    phone: '+1 (555) 0123-4567',
    employeeId: 'EMP-9902-SC',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-4">
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden text-center p-8 sticky top-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="w-full h-full rounded-full bg-emerald-600 flex items-center justify-center border-4 border-emerald-50 shadow-inner">
              <span className="text-white text-4xl font-black">SC</span>
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>

          <h2 className="text-xl font-black text-emerald-900 uppercase tracking-tight">
            {formData.firstName} {formData.lastName}
          </h2>
          <p className="text-emerald-600 font-bold text-xs uppercase tracking-[0.15em] mb-6">
            Warehouse Operations
          </p>

          <div className="space-y-4 pt-6 border-t border-emerald-50">
            <div className="p-3 bg-emerald-50/50 rounded-xl">
              <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest opacity-50 mb-1 text-left">
                Internal ID
              </p>
              <p className="text-emerald-900 font-mono font-bold text-sm text-left">
                {formData.employeeId}
              </p>
            </div>
            <div className="flex justify-between items-center px-2">
              <span className="text-slate-400 text-xs font-bold uppercase">
                Security level
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded">
                LVL 4
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Information & Password Sections */}
      <div className="lg:col-span-8 space-y-6">
        {/* Basic Info Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8">
          <div className="flex items-center gap-3 mb-8 border-b border-emerald-50 pb-4">
            <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
            <h3 className="text-emerald-900 font-black text-lg uppercase tracking-tight">
              Personal Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-emerald-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-emerald-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-emerald-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-emerald-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
          </div>
        </section>

        {/* Password Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8">
          <div className="flex items-center gap-3 mb-8 border-b border-emerald-50 pb-4">
            <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
            <h3 className="text-emerald-900 font-black text-lg uppercase tracking-tight">
              Security Access
            </h3>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">
                Current Password
              </label>
              <input
                name="currentPassword"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-emerald-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">
                New Password
              </label>
              <input
                name="newPassword"
                type="password"
                className="w-full px-4 py-3 bg-slate-50 border border-emerald-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">
                Confirm New Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="w-full px-4 py-3 bg-slate-50 border border-emerald-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>

            <div className="pt-4">
              <button className="w-full py-3.5 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all">
                Update Secure Access
              </button>
            </div>
          </div>
        </section>

        <p className="text-center text-[10px] font-bold text-emerald-800 uppercase tracking-[0.2em] opacity-30 py-4">
          Terminal Session 0x02FF • Encrypted Connection
        </p>
      </div>
    </div>
  )
}

export default Profile

