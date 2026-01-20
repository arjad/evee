
import React, { useState } from 'react';

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: 'Logistics',
    role: 'Staff',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
<div className="h-screen flex items-center justify-center bg-gradient-to-b from-yellow-400 to-yellow-200"
 style={{
  background: 'linear-gradient(to bottom right, transparent, rgb(255, 245, 200))'
}}>
<div className="relative max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden min-h-[650px] flex animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 
          SLIDING OVERLAY PANEL
          Using a Teal and Deep Slate palette with Amber accents for energy.
      */}
      <div 
        className={`absolute top-0 bottom-0 z-20 w-1/2 transition-transform duration-700 ease-in-out hidden lg:block overflow-hidden
          ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
            alt="Inventory System" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Multi-tone Overlay: Teal and Slate for depth */}
          <div className="absolute inset-0 bg-teal-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-teal-900/40 to-amber-900/20"></div>
          
          {/* Content over image */}
          <div className="relative h-full flex flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-amber-400/30">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="font-black tracking-widest uppercase text-sm text-amber-100">Emerald OS v4</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-black leading-tight tracking-tighter uppercase">
                {isLogin ? "Welcome Back to" : "Join the"} <br/>
                <span className="text-amber-400">Inventory</span> Grid
              </h2>
              <p className="text-slate-100/80 max-w-md font-medium leading-relaxed text-sm">
                Optimizing supply chain visibility through high-performance asset tracking and real-time analytics.
              </p>
            </div>
            
            <div className="flex gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Global Status</p>
                <p className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Optimal
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Grid Sync</p>
                <p className="text-xl font-bold">100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
          LEFT SIDE CONTENT (Login Form) 
      */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-slate-50">
        <div className="max-w-sm mx-auto w-full">
          <div className="mb-8">
            <div className="w-12 h-1.5 bg-amber-500 rounded-full mb-4"></div>
            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-2">Login</h3>
            <p className="text-slate-500 text-sm font-medium">Access your operator terminal.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                Operator Email
                <span className="text-amber-600">Required</span>
              </label>
              <input 
                type="email"
                placeholder="s.chen@emerald.sys"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:outline-none transition-all shadow-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Master Password</label>
              <input 
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:outline-none transition-all shadow-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500" />
                <label htmlFor="remember" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Remember</label>
              </div>
              <button className="text-[10px] font-bold text-amber-600 uppercase tracking-wider hover:text-amber-700 transition-colors">Forgot Password?</button>
            </div>
            <button className="w-full py-4 bg-slate-900 text-amber-400 font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all mt-2 border border-slate-700">
              Authorize Entry
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">
            New operator? <button onClick={toggleAuth} className="text-amber-600 hover:text-amber-700 transition-colors border-b border-amber-600/30">Create Account</button>
          </p>
        </div>
      </div>

      {/* 
          RIGHT SIDE CONTENT (Signup Form) 
      */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
        <div className="max-w-sm mx-auto w-full">
          <div className="mb-8">
            <div className="w-12 h-1.5 bg-teal-500 rounded-full mb-4 ml-auto lg:ml-0"></div>
            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-2 text-right lg:text-left">Register</h3>
            <p className="text-slate-500 text-sm font-medium text-right lg:text-left">Join Emerald Systems network.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
              <input 
                name="fullName"
                type="text"
                placeholder="Sarah Chen"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Work Email</label>
              <input 
                name="email"
                type="email"
                placeholder="s.chen@emerald.sys"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dept</label>
                <select name="department" className="w-full px-3 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs appearance-none focus:outline-none hover:border-teal-200 transition-colors">
                  <option>Logistics</option>
                  <option>Hardware</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Role</label>
                <select name="role" className="w-full px-3 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs appearance-none focus:outline-none hover:border-teal-200 transition-colors">
                  <option>Staff</option>
                  <option>Manager</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Security Pin</label>
              <input 
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>
            <button className="w-full py-4 bg-teal-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-teal-100 hover:bg-teal-700 active:scale-[0.98] transition-all mt-4">
              Initialize Profile
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">
            Existing operator? <button onClick={toggleAuth} className="text-teal-600 hover:text-teal-800 transition-colors border-b border-teal-600/30">Sign In</button>
          </p>
        </div>
      </div>

    </div>
    </div>
  );
};

export default Signup;

