import { BrowserRouter, Routes, Route } from "react-router";

import FlightResults from "@/pages/flight-results";
import Main from "@/pages/main";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="flight-results" element={<FlightResults />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
