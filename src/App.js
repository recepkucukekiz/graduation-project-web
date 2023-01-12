import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ShopDetail from "./pages/ShopDetail";
import Calendar from "./pages/calendar/Calendar";
import Login from './pages/management/login/login';
import Signup from './pages/management/signup/signup';
import Calendarv2 from "./pages/calendarv2/calendarv2";

import '@progress/kendo-theme-default/dist/all.css';
import PickDateOfBirth from './components/calendartest/PickDateOfBirth';
import Calendarv3 from './components/calendartest/Calendarv3';
import Dashboard from './pages/management/dashboard/dashboard';
import Edit from './pages/management/editshop/editshop';
import EditWorker from './pages/management/editworker/editworker';
import CalendarNew from './pages/calendar/CalenderNew';

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendarv2" element={<Calendarv2 />} />
            <Route path="/calendarv3" element={<Calendarv3 />} />
            <Route path="/calendernew/:id" element={<CalendarNew />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/editworker/:id" element={<EditWorker />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
