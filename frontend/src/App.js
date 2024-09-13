import React, { useEffect, useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import UserPrivateRoutes from "./BaseFiles/UserPrivateRoutes";
import NotFound from "./pages/NotFound";
import FormRegistration from "./components/users/Register";
import Login from "./components/users/Login";
import AdminPrivateRoute from "./BaseFiles/AdminPrivateRoutes";
import AdminLogin from "./components/admin/AdminLogin";
import DashboardLayout from "./layouts/Admin";
import Users from "./pages/admin/Users";

import UserInfo from "./pages/admin/UserInfo";
import Profile from "./components/users/pages/Profile";
import Home from "./components/users/pages/Home";
import DashboardLayoutUser from "./components/users/Dashboard";
// import PackagesList from "./components/users/pages/PackagesList";

import Accounts from "./components/users/pages/Accounts";
import Wallet from "./components/users/pages/Wallet";
import Notifications from "./components/admin/notifications/Notifications";
import NotificationCenter from "./components/users/pages/Notifications";
import { BASEURL } from './baseurl';
import Maintainence from './pages/Maintainence';
import ShutdownForm from './components/Server';
import TransactionList from './components/admin/transactions/TransactionsList';
import Achievers from './components/admin/levels/Achievers';
import AccessControl from './components/admin/permissions/Permissions';
import Competitions from './components/admin/competitions/Competitions';
import CompetitionOverview from './components/admin/competitions/CompetitionOverview'
import Plans from './components/admin/plans/Plans';
import Orders from './components/admin/orders/Orders';
import OrderView from './components/admin/orders/OrderOverview';
import Pricing from './components/users/pages/Pricing';
import MyPlans from './components/users/pages/MyPlans';
import CompetitionDetails from './components/users/pages/CompetitionDetails';
import EnrollmentDetails from './components/users/pages/EnrollmentDetails';
function App() {
  const [isServerDown, setIsServerDown] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(`${BASEURL}/api/v1/auth/status`);
        const data = await response.json();
        setIsServerDown(data.shutdown?.status || false);
      } catch (error) {
        console.error('Error fetching server status:', error);
        setIsServerDown(true); // Consider the server down if the request fails
      }
    };

    checkServerStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/register" element={<FormRegistration />} />
       {!isServerDown && <Route path="*" element={<NotFound />} />}

        {/* Admin Routes */}
        <Route element={<AdminPrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<Users />} />
            <Route path="/admin/users" element={<Users />} />
            {/* <Route path="/admin/risk-rules" element={<RiskRules />} /> */}
            <Route path="/admin/competitions" element={<Competitions />} />
            <Route path="/admin/competitions/overview/:id" element={<CompetitionOverview />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/orders/overview/:id" element={<OrderView/>} />
            <Route path="/admin/plans" element={<Plans />} />
            <Route path="/admin/user/:id" element={<UserInfo />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            <Route path="/admin/server" element={<ShutdownForm />} />
            <Route path="/admin/transactions" element={<TransactionList />} />
            <Route path="/admin/achievers" element={<Achievers />} />
            <Route path="/admin/permissions" element={<AccessControl/>} />

            {/* Add more admin-specific routes here */}
          </Route>
        </Route>

        {/* User Routes */}
        {isServerDown ? (
          <Route path="*" element={<Maintainence />} /> // Redirect users to login or a suitable page
        ) : (
          <Route element={<UserPrivateRoutes />}>
            <Route element={<DashboardLayoutUser />}>
              <Route path="/user/dashboard" element={<Home />} />
              <Route path="/user/dashboard/profile" element={<Profile />} />
              <Route path="/user/dashboard/plans" element={<MyPlans/>} />
              <Route path="/user/dashboard/accounts" element={<Accounts />} />
              <Route path="/user/dashboard/wallet" element={<Wallet />} />
              <Route path="/user/dashboard/pricing" element={<Pricing />} />
              <Route path="/user/dashboard/notifications" element={<NotificationCenter />} />
              <Route path="/user/dashboard/competition/:id" element={<CompetitionDetails />} />
              <Route path="/user/dashboard/enrolled" element={<EnrollmentDetails />} />

              {/* Add more user-specific routes here */}
            </Route>
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
