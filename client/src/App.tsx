import { Routes, Route } from "react-router-dom";
import Scheduler from "./pages/Scheduler";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";
import PrivateRoutes from "./Auth/PrivateRoute";
import Focus from "./pages/Focus";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Scheduler />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/focus" element={<Focus />} />
        </Route>
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}
