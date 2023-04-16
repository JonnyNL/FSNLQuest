import "./App.css";
import "./nav.css";
import SignInPage from "./components/SignInPage";
import Register from "./components/Register";
import { BrowserRouter } from "react-router-dom";
import { Routes, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import PageTransition from "./components/PageTransition";
import Landing from "./components/Landing";
import StepPage from "./components/StepPage";
import CreateQuest from "./components/CreateQuest";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <PageTransition transitionKey={location.key}>
      <Routes>
        <Route path="/" exact element={<SignInPage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/steps" element={<StepPage />} />
        <Route path="/create" element={<CreateQuest />} />
      </Routes>
    </PageTransition>
  );
}

export default App;
