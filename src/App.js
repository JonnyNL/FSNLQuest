// Importing stylesheets and components
import "./App.css";
import "./nav.css";
import SignInPage from "./components/SignInPage";
import Register from "./components/Register";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import StepPage from "./components/StepPage";
import CreateQuest from "./components/CreateQuest";
import UserQuests from "./components/UserQuests";

// Setting up the main App component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Setting up the different routes for the app */}
        <Route path="/" exact element={<SignInPage />} />
        {/* This is the sign-in page */}
        <Route path="/landing" element={<Landing />} />
        {/* This is the landing page */}
        <Route path="/register" element={<Register />} />
        {/* This is the registration page */}
        <Route path="/steps" element={<StepPage />} />
        {/* This is the step page */}
        <Route path="/create" element={<CreateQuest />} />
        {/* This is the create-a-quest page */}
        <Route path="/yourquests" element={<UserQuests />} />
        {/* This is the logged in users quest page */}
      </Routes>
    </BrowserRouter>
  );
}

// Exporting the App component
export default App;
