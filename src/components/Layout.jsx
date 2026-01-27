import React, { useState, createContext } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from "react-pro-sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  FiHome, FiBox, FiLayers, FiBarChart2, FiSettings, 
  FiFileText, FiChevronLeft, FiShieldOff, FiChevronRight 
} from "react-icons/fi";
import { LiaMoneyBillSolid } from "react-icons/lia";

import Header from "./Header";
import { Container, TextField, Avatar, Box } from "@mui/material";
  // Create context
export const RoleContext = createContext({
  isAdmin: true,
  toggleUserRole: () => {},
});

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const [isAdmin, setIsAdmin] = useState(() => {
    const savedRole = localStorage.getItem("isAdmin");
    return savedRole ? JSON.parse(savedRole) : true; // default Admin
  });


  const toggleUserRole = () => {
    setIsAdmin(prev => {
      const newRole = !prev;
      localStorage.setItem("isAdmin", JSON.stringify(newRole));
      return newRole;
    });
  };


  return (
    <RoleContext.Provider value={{ isAdmin, toggleUserRole }}>
    <div className="flex min-h-screen bg-gray-50"
    // style={{

    // background: "linear-gradient(135deg, #0b1e13 0%, rgba(255, 255, 0, 0.05) 50%, rgba(255, 255, 0, 0.15) 100%)"
    // }}
    >
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
              className="w-10 rounded-full"
            />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">evee</span>
                <span className="text-[10px] tracking-[0.2em] text-emerald-400 font-semibold mt-1">I am Evee. Are you?</span>
              </div>
            )}
          </div>
        </div>

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
              data-testid="tab-dashboard"
            >
              Dashboard
            </MenuItem>
            {isAdmin && (
              <MenuItem 
                active={isActive('/batches')}
                icon={<FiLayers />} 
                component={<Link to="/batches" />}
                data-testid="tab-batches"
              >
                Batches
              </MenuItem>
            )}

            <MenuItem 
              active={isActive('/demands')}
              icon={<FiFileText />} 
              title="demands visible to respective services center"
              component={<Link to="/demands" />}
              data-testid="tab-demands"
            >
              Demands
            </MenuItem>

            <MenuItem 
              active={isActive('/products')}
              icon={<FiBox />} 
              title="Visible to all"
              component={<Link to="/products" />}
              data-testid="tab-products"
            >
              Products
            </MenuItem>

            <MenuItem 
              active={isActive('/sales')}
              icon={<FiBarChart2 />} 
              title="sales visible to respective services center"
              component={<Link to="/sales" />}
              data-testid="tab-sales"
            >
              Sales
            </MenuItem>

            <MenuItem 
              active={isActive('/claims')}
              icon={<FiShieldOff />} 
              title="claims visible to respective services center"
              component={<Link to="/claims" />}
              data-testid="tab-claim"
            >
              Claim
            </MenuItem>

            <div className="h-px bg-white/5 my-4 mx-6"></div>


            <MenuItem 
              active={isActive('/invoices')}
              icon={<LiaMoneyBillSolid />} 
              component={<Link to="/invoices" />}
              data-testid="tab-invoices"
            >
              Invoices
            </MenuItem>

            <MenuItem 
              active={isActive('/settings')}
              icon={<FiSettings />} 
              component={<Link to="/settings" />}
              data-testid="tab-settings"
            >
              Settings
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
      <div
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none rounded-tl-full"
      ></div>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isAdmin={isAdmin}
          toggleUserRole={toggleUserRole}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            <Container
              style={{ display: "flex", flexDirection:"column", minHeight: "100vh", padding: 0 }}
            >
              <Outlet />
            </Container>
          </div>
        </main>
      </div>
    </div>
    </RoleContext.Provider>
  );
};

export default Layout;
