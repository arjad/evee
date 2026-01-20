
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [warehouses, setWarehouses] = useState(['Central Warehouse', 'East Coast Hub', 'North Logistics']);
  const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[0]);
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleWarehouse = () => setIsWarehouseOpen(!isWarehouseOpen);
  const toggleUserMenu = () => setIsUserOpen(!isUserOpen);

  const handleWarehouseSelect = (wh) => {
    setSelectedWarehouse(wh);
    setIsWarehouseOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side: Warehouse Dropdown */}
          <div className="flex items-center min-w-[200px]">
            <div className="relative inline-block text-left w-full">
              <div>
                <button
                  type="button"
                  onClick={toggleWarehouse}
                  className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-semibold text-slate-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                >
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </span>
                    <span className="truncate max-w-[220px]">
                      {warehouses.length > 0 ? selectedWarehouse : "Create a warehouse"}
                    </span>
                  </div>
                  <svg className="ml-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {isWarehouseOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsWarehouseOpen(false)}
                  ></div>
                  <div className="origin-top-left absolute left-0 mt-2 w-64 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 border border-gray-100 overflow-hidden">
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Your Warehouses</div>
                      {warehouses.length > 0 ? (
                        warehouses.map((wh) => (
                          <button
                            key={wh}
                            onClick={() => handleWarehouseSelect(wh)}
                            className={`flex items-center w-full text-left px-4 py-3 text-sm transition-colors ${selectedWarehouse === wh ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <div className={`w-2 h-2 rounded-full mr-3 ${selectedWarehouse === wh ? 'bg-green-500' : 'bg-transparent'}`}></div>
                            {wh}
                          </button>
                        ))
                      ) : (
                        <button className="block w-full text-left px-4 py-3 text-sm text-green-600 font-bold hover:bg-green-50 italic">
                          No warehouses found.
                        </button>
                      )}
                      <div className="border-t border-gray-100 mt-2"></div>
                      <button className="flex items-center w-full text-left px-4 py-3 text-sm text-green-600 hover:bg-green-50 font-bold">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create a new warehouse
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Middle: Search Bar */}
          <div className="flex-1 flex justify-center px-6">
            <div className="max-w-md w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm transition-all"
                  placeholder="Quick search..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Side: Icons and User Profile */}
          <div className="flex items-center ml-4">
            {/* Notification Icon */}
            <button className="p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 relative focus:outline-none transition-all group">
              <span className="sr-only">Notifications</span>
              <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
            </button>

            {/* Vertical Divider */}
            <div className="h-8 w-px bg-gray-200 mx-4"></div>

            {/* User Profile Section */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <span className="mr-3 hidden md:block text-slate-800 font-bold text-sm">John Doe</span>
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full border-2 border-green-500 p-0.5 object-cover"
                    src="https://i.pravatar.cc/150?u=johndoe"
                    alt="User profile"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </button>

              {isUserOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsUserOpen(false)}
                  ></div>
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-xl py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-slate-900">John Doe</p>
                      <p className="text-xs text-slate-500 truncate">john.doe@org.com</p>
                    </div>
                    <Link
    to="/profile" // route for profile details
    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
  >
    <svg
      className="w-4 h-4 mr-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
    Profile Details
  </Link>

  <Link
    to="/settings" // route for user settings
    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
  >
    <svg
      className="w-4 h-4 mr-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
    User Settings
  </Link>

                    <div className="border-t border-gray-100 my-1"></div>
                    <button className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;
