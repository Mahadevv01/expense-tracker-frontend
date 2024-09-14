import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import ProfileButton from "./ProfileButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const { user, handleLogout } = useGlobalContext();
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            fontSize={{ md: 34, xs: 24 }}
            fontWeight="bold"
            flexGrow={1}
          >
            Expense Tracker Web App
          </Typography>
          {!open ? (
            <MenuIcon
              className="text-light fs-4 nav-icon"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <CloseIcon
              className="text-light fs-4 nav-icon"
              onClick={() => setOpen(!open)}
            />
          )}
          <Box className={`link-lists ${open && "open"}`}>
            <NavLink className="nav-link fs-5" to="/">
              Home
            </NavLink>
            {user?.user ? (
              <>
                <NavLink className="nav-link fs-5" to="/addCategory">
                  Add Category
                </NavLink>
                <ProfileButton user={user?.user} handleLogout={handleLogout} />
              </>
            ) : (
              <NavLink to="/auth" className="nav-link">
                <Button color="secondary" variant="contained" className="fs-6">
                  Login
                </Button>
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
