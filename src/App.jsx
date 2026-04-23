import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardLayout from './pages/DashboardLayout/DashboardLayout';
import Assets from './pages/Assets/Assets';
import AddAssets from './pages/Assets/AddAssets';
import EditAssets from './pages/Assets/EditAssets';
import Users from './pages/Users/Users';
import AddUsers from './pages/Users/AddUsers';
import EditUsers from './pages/Users/EditUsers';
import Reservations from './pages/Reservations/Reservations';
import UserReservations from './pages/UserReservations/UserReservations';
import Category from './pages/Category/Category';
import MyHistory from './pages/MyHistory/MyHistory';
import NotFound from './pages/NotFound/NotFound';
import AssetDetail from './pages/Assets/AssetDetail';
import { ProtectedRoute, PublicRoute } from './utils/RouteGuard';
import UserProfile from './pages/UserProfile/UserProfile';
import LandingPig from './pages/Landing/LandingPig';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPig />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />

            {/* Reservations */}
            <Route path="/dashboard/reservations" element={<Reservations />} />

            {/* Assets */}
            <Route path="/dashboard/assets" element={<Assets />} />
            <Route path="/dashboard/assets/add" element={<AddAssets />} />
            <Route path="/dashboard/assets/edit/:id" element={<EditAssets />} />
            <Route
              path="/dashboard/assets/detail/:id"
              element={<AssetDetail />}
            />

            {/* Users */}
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/users/add" element={<AddUsers />} />
            <Route path="/dashboard/users/edit/:id" element={<EditUsers />} />

            {/* Settings */}
            <Route path="/dashboard/settings" element={<h1>Settings</h1>} />

            {/* New Reservations */}
            <Route
              path="/dashboard/new_reservation"
              element={<UserReservations />}
            />

            {/* History */}
            <Route path="/dashboard/history" element={<MyHistory />} />

            {/* Profile */}
            <Route path="/dashboard/profile" element={<UserProfile />} />

            {/* Kategori */}
            <Route path="/dashboard/category" element={<Category />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
