import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import { useGlobalContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

const Auth = () => {
  const [openReg, setOpenReg] = useState(false);
  const [userDetails, setUserDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { registerUser, loginUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (openReg) {
        if (userDetails.password !== userDetails.cpassword) {
          toast.error("Mismatch Passwords", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
          return;
        }

        const data = await registerUser(userDetails);
        if (data.success) {
          toast.success("Successfully Registered 👍", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setOpenReg(false);
          setUserDetails(initialState);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } else {
        const data = await loginUser(userDetails);
        if (data.success) {
          toast.success("Successfully Loggedin 👍", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          localStorage.setItem(
            "expense-tracker-user",
            JSON.stringify(data.user)
          );
          navigate("/");
          setUserDetails(initialState);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box>
        <Typography
          textAlign="center"
          fontSize={40}
          fontWeight="bold"
          mb={3}
          color="primary"
        >
          {!openReg ? "Login" : "Register"}
        </Typography>
        <Box>
          {openReg && (
            <InputField
              title="Name"
              type="text"
              others="name"
              value={userDetails.name}
              onChange={handleChange}
              autoFocus={openReg}
            />
          )}

          <InputField
            title="Email"
            type="email"
            others="email"
            value={userDetails.email}
            onChange={handleChange}
          />

          <PasswordField
            title="Password"
            others="password"
            value={userDetails.password}
            onChange={handleChange}
          />

          {openReg && (
            <PasswordField
              title="Retype Password"
              others="cpassword"
              value={userDetails.cpassword}
              onChange={handleChange}
            />
          )}

          <Grid
            container
            justifyContent="space-between"
            my={3}
            alignItems="center"
          >
            <Grid item md={6} xs={6}>
              <Button
                color="secondary"
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
              >
                {openReg ? "Sign Up" : "Sign In"}
              </Button>
            </Grid>
            <Grid item md={6} xs={6} textAlign="end">
              <Typography
                color="GrayText"
                onClick={() => setOpenReg(!openReg)}
                sx={{ cursor: "pointer" }}
              >
                {openReg
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Typography>
            </Grid>
          </Grid>

          {!openReg && <ForgotPassword />}
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
