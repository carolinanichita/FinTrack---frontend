import StatsPage  from "./components/statsPageComponents/StatsPage";
import './App.css'
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Daily from "./components/Daily/Daily";
import Signup from "./components/Signup/Signup";
import Monthly from "./components/Monthly/Monthly";
import CalenderPage from "./components/calender/CalenderPage";
import Settings from "./components/Settings/Settings";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState<string>('');

  const handleUserIdSet = (newUserId: string) => {
    setUserId(newUserId);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing onUserIdSet={handleUserIdSet}/>}></Route>
        <Route path="/daily" element={<Daily userId={userId}/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/monthly" element={<Monthly />}></Route>
        <Route path="/stats" element={<StatsPage />}></Route>
        <Route path="/calender" element={<CalenderPage userId={userId}/>}></Route>
        <Route path="/settings" element={<Settings userId={userId}/>}></Route> 
      </Routes>
    </>
  )
}

export default App
