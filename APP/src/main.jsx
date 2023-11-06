import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Contexts
import { AuthContextProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
