
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { Footer } from "./components/Footer";



import { CourseHome } from "./pages/CourseHome";

// import { AdminSignup } from "./pages/AdminSignup";


function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page: string) => {
    navigate(`/${page === "courseHome" ? "" : page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentPage = location.pathname.replace("/", "") || "home";
  const showHeaderFooter = !["login", "signup"].includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col bg-white">
    

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<CourseHome onNavigate={handleNavigate} />} />
         
         
        </Routes>
      </main>

      {showHeaderFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

export default function App() {
  return (
    
      <AppWrapper />
    
  );
}
