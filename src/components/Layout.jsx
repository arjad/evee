import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from "react-pro-sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  FiHome, FiBox, FiLayers, FiBarChart2, FiSettings, 
  FiFileText, FiUsers, FiChevronLeft, FiChevronRight 
} from "react-icons/fi";
import Header from "./Header";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        width="260px"
        collapsedWidth="80px"
        transitionDuration={400}
        rootStyles={{
          borderRight: 'none',
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#0b1e13",
            color: "#e6f4ec",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* LOGO SECTION */}
        <div className="px-4 py-8 flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className={`flex items-center gap-3 transition-all duration-300 ${collapsed ? 'scale-90' : 'scale-100'}`}>
            <img 
              src="/assets/logo.png" 
              alt="Evee Logo" 
              className="w-10 h-10 rounded-xl shadow-lg border-2 border-emerald-500/20"
            />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">evee</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold mt-1">Mobility</span>
              </div>
            )}
          </div>
        </div>

        {/* NAVIGATION MENU */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pt-4">
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                color: active ? "#ffffff" : "#e6f4ec",
                backgroundColor: active ? "#1c3b27" : "transparent",
                borderRadius: "8px",
                margin: "2px 12px",
                padding: "8px 12px",
                fontSize: "14px",
                fontWeight: active ? "600" : "400",
                "&:hover": { 
                  backgroundColor: "#14351f", 
                  color: "#ffffff" 
                },
              }),
              icon: { 
                color: "#9fe3c2",
                minWidth: '24px',
                width: '24px'
              },
              subMenuContent: { 
                backgroundColor: "transparent",
                paddingLeft: "12px",
              },
            }}
          >
            {/* Collapse Toggle */}
            <MenuItem 
              icon={collapsed ? <FiChevronRight /> : <FiChevronLeft />} 
              onClick={() => setCollapsed(!collapsed)}
              className="mb-4 opacity-60 hover:opacity-100 transition-opacity"
            >
              {!collapsed && "Collapse Sidebar"}
            </MenuItem>

            <MenuItem 
              active={isActive('/dashboard')}
              icon={<FiHome />} 
              component={<Link to="/dashboard" />}
            >
              Dashboard
            </MenuItem>

            <SubMenu 
              icon={<FiBox />} 
              label="Demands"
              defaultOpen={location.pathname.startsWith('/demands')}
            >
              <MenuItem active={isActive('/demands/pending')} component={<Link to="/demands/pending" />}>Pending</MenuItem>
              <MenuItem active={isActive('/demands/approved')} component={<Link to="/demands/approved" />}>Approved</MenuItem>
              <MenuItem active={isActive('/demands/received')} component={<Link to="/demands/received" />}>Received</MenuItem>
            </SubMenu>

            <MenuItem 
              active={isActive('/products')}
              icon={<FiBarChart2 />} 
              component={<Link to="/products" />}
            >
              Products
            </MenuItem>

            <SubMenu 
              icon={<FiLayers />} 
              label="Locations"
              defaultOpen={location.pathname.startsWith('/locations')}
            >
              <MenuItem active={isActive('/locations/service-centers')} component={<Link to="/locations/service-centers" />}>Service Centers</MenuItem>
              <MenuItem active={isActive('/locations/technicians')} component={<Link to="/locations/technicians" />}>Technicians</MenuItem>
              <MenuItem active={isActive('/locations/dealers')} component={<Link to="/locations/dealers" />}>Dealers</MenuItem>
            </SubMenu>

            <MenuItem 
              active={isActive('/users')}
              icon={<FiUsers />} 
              component={<Link to="/users" />}
            >
              Users
            </MenuItem>

            <div className="h-px bg-white/5 my-4 mx-6"></div>

            <MenuItem 
              active={isActive('/reports')}
              icon={<FiBarChart2 />} 
              component={<Link to="/reports" />}
            >
              Reports
            </MenuItem>

            <MenuItem 
              active={isActive('/invoices')}
              icon={<FiFileText />} 
              component={<Link to="/invoices" />}
            >
              Invoices
            </MenuItem>

            <MenuItem 
              active={isActive('/settings')}
              icon={<FiSettings />} 
              component={<Link to="/settings" />}
            >
              Settings
            </MenuItem>
          </Menu>
        </div>

        {/* FOOTER INFO */}
        {!collapsed && (
          <div className="p-6 bg-black/20 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              </div>
              <div>
                <p className="text-[10px] text-emerald-400/80 uppercase font-bold tracking-wider">System Status</p>
                <p className="text-xs text-white">All Systems Normal</p>
              </div>
            </div>
          </div>
        )}
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
