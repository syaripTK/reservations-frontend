import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AddAssets from './pages/Assets/AddAssets';
import AssetDetail from './pages/Assets/AssetDetail';
import Assets from './pages/Assets/Assets';
import EditAssets from './pages/Assets/EditAssets';
import Category from './pages/Category/Category';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardLayout from './pages/DashboardLayout/DashboardLayout';
import Home from './pages/Home/Home';
import LandingPig from './pages/Landing/LandingPig';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import MyHistory from './pages/MyHistory/MyHistory';
import NotFound from './pages/NotFound/NotFound';
import Reservations from './pages/Reservations/Reservations';
import UserProfile from './pages/UserProfile/UserProfile';
import UserReservations from './pages/UserReservations/UserReservations';
import AddUsers from './pages/Users/AddUsers';
import EditUsers from './pages/Users/EditUsers';
import Users from './pages/Users/Users';
import { ProtectedRoute, PublicRoute } from './utils/RouteGuard';

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

            {}
            <Route path="/dashboard/reservations" element={<Reservations />} />

            {}
            <Route path="/dashboard/assets" element={<Assets />} />
            <Route path="/dashboard/assets/add" element={<AddAssets />} />
            <Route path="/dashboard/assets/edit/:id" element={<EditAssets />} />
            <Route
              path="/dashboard/assets/detail/:id"
              element={<AssetDetail />}
            />

            {}
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/users/add" element={<AddUsers />} />
            <Route path="/dashboard/users/edit/:id" element={<EditUsers />} />

            {}
            <Route path="/dashboard/settings" element={<h1>Settings</h1>} />

            {}
            <Route
              path="/dashboard/new_reservation"
              element={<UserReservations />}
            />

            {}
            <Route path="/dashboard/history" element={<MyHistory />} />

            {}
            <Route path="/dashboard/profile" element={<UserProfile />} />

            {}
            <Route path="/dashboard/category" element={<Category />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
