import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import { AppContext } from "./contexts/AppContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import Profile from "./pages/Profile";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#644ed6",
      },
      secondary: {
        main: "#45EBA5",
      },
    },

    typography: {
      fontFamily: "Inconsolata",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AppContext>
      </BrowserRouter>
      <ToastContainer transition={Zoom} />
    </ThemeProvider>
  );
}

export default App;
