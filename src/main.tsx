
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/overrides.css";
import { BookingProvider } from "./components/booking/BookingProvider";

createRoot(document.getElementById("root")!).render(
  <BookingProvider>
    <App />
  </BookingProvider>
);

  
  
