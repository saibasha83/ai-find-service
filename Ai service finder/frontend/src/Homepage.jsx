
import Landing from "./components/Landing";
import WorkerRegister from "./components/workerRegister";
import WorkerDashboard from "./components/workerDashboard";
import Home from "./pages/Home"; // client search page
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export default function HomePage() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/worker/register" element={<WorkerRegister />} />
        <Route path="/client" element={<Home />} />
      </Routes>
  );
}

