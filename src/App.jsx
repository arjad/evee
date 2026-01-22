import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ConfirmSignup from "./pages/ConfirmSignup";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Reports from "./pages/Reports"
import Invoices from "./pages/Invoices"
import Demands from "./pages/Demands";
import DemandsView from "./pages/Demand/DemandView";
import DemandCreate from "./pages/Demand/DemandCreate";
import ProductView from "./pages/ProductComponents/ProductView";
import ProductCreate from "./pages/ProductComponents/ProductCreate";
import Sales from "./pages/SaleComponents/Sales";
import Claims from "./pages/ClaimComponents/Claims";
import Batches from "./pages/Batches";
import Settings from "./pages/Settings";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<Signup />} />

        {/* Private routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/view" element={<ProductView />} />
          <Route path="products/create" element={<ProductCreate />} />

          <Route path="users" element={<Dashboard />} />
          <Route path="demands" element={<Demands />} />
          <Route path="demands/view" element={<DemandsView />} />
          <Route path="demands/create" element={<DemandCreate />} />

          <Route path="sales" element={<Sales />} />
          <Route path="claims" element={<Claims />} />

          <Route path="invoices" element={<Invoices />} />
          <Route path="batches" element={<Batches />} />
          <Route path="settings" element={<Settings />} />

          <Route path="reports" element={<Reports />} />

          <Route path="profile" element={<Profile />} />

          {/* Add any other page here */}
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
