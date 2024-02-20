import { Outlet } from "react-router";

import { Toaster } from "./components/ui/toaster";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { UserProvider } from "./context/UserContext";

const App = () => {
  return (

    <UserProvider>
      <Navbar />
      <Toaster />
      <Outlet />
      <Footer />
    </UserProvider>

  );
};

export default App;
