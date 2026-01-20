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
          <Route path="users" element={<Dashboard />} />
          <Route path="demands/pending" element={<Dashboard />} />
          <Route path="demands/approved" element={<Dashboard />} />
          <Route path="demands/received" element={<Dashboard />} />
          <Route path="invoices" element={<Invoices />} />

          <Route path="reports" element={<Reports />} />

          <Route path="profile" element={<Profile />} />

          {/* Add any other page here */}
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
