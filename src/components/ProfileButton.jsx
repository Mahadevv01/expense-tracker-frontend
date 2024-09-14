import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { NavLink } from "react-router-dom";

const ProfileButton = ({ user, handleLogout }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <Button variant="outlined" color="secondary" sx={{ padding: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} className="IconButton">
          <Typography className="Typography text-light mx-2" fontSize={19}>
            {user?.name}
          </Typography>
          {anchorElUser ? (
            <ArrowDropUpIcon color="secondary" />
          ) : (
            <ArrowDropDownIcon color="secondary" />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <NavLink to="profile" className="link">
            Profile
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={handleLogout}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Button>
  );
};

export default ProfileButton;
