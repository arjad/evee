import React, { useState, useEffect } from "react";
import { Container, TextField, Avatar, Box } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import {
  FiHome,
  FiBox,
  FiLayers,
  FiShoppingCart,
  FiBarChart2,
  FiSettings,
  FiUsers,
  FiMenu,
} from "react-icons/fi";
import { Link } from "react-router-dom"; // React Router
import LogoutButton from "../components/LogoutButton";
import AllBusinessStats from "./DashboardComponents/AllBusinessStats";
import TimePeriodStats from "./DashboardComponents/TimePeriodStats";
import ActivityGraph from "./DashboardComponents/ActivityGraph";
import Header from "../components/Header";

const Dashboard = () => {
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [CorpStatus, setCorpStatus] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCorpStatus({
        all_time: { found: 12450, removed: 8320, optout_submitted: 4120 },
        last_7_days: { records_in_progress: 120, brokers_monitored: 45, clean_scans: 18 },
        last_30_days: { records_in_progress: 540, brokers_monitored: 160, clean_scans: 72 },
        chart_data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          found: [120, 300, 450, 600, 900],
          removed: [80, 250, 400, 550, 700],
          optout_in_progress: [40, 90, 120, 160, 200],
        },
      });

      
      setDashboardLoading(false);
    }, 1200);
  }, []);
  const monthlyData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr'],
    products: {
      "Product A": { found: [10, 12, 8, 15], removed: [2,1,3,0], inProgress: [1,0,2,1] },
      "Product B": { found: [5, 8, 6, 7], removed: [1,0,0,1], inProgress: [0,2,1,0] },
    }
  }

  const last_7_days = {
    records_in_progress: 12,
    brokers_monitored: 8,
    clean_scans_data: {
      labels: ['Clean', 'Not Clean'],
      datasets: [
        {
          label: 'Clean Scans',
          data: [5, 3], // example data: 5 clean, 3 not clean
          backgroundColor: ['#1E4DB7', '#E54E7E'],
          borderColor: ['#1E4DB7', '#E54E7E'],
          borderWidth: 1,
        },
      ],
    },
  }
  
  const last_30_days = {
    records_in_progress: 45,
    brokers_monitored: 20,
    clean_scans_data: {
      labels: ['Clean', 'Not Clean'],
      datasets: [
        {
          label: 'Clean Scans',
          data: [25, 20],
          backgroundColor: ['#1E4DB7', '#E54E7E'],
          borderColor: ['#1E4DB7', '#E54E7E'],
          borderWidth: 1,
        },
      ],
    },
  }
  
  
  return (
    <>
      {dashboardLoading ? (
        <>
          <AllBusinessStats loading />
          <TimePeriodStats loading />
        </>
      ) : (
        <>
          <AllBusinessStats
            found={CorpStatus?.all_time?.found}
            removed={CorpStatus?.all_time?.removed}
            optOutSubmitted={CorpStatus?.all_time?.optout_submitted}
          />
          <TimePeriodStats last_7_days={last_7_days} last_30_days={last_30_days} />

        </>
      )}
      <ActivityGraph monthlyData={monthlyData} />
    </>
  );
};

export default Dashboard;
