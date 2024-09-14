import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { api } from "../constants/Api";
import InputField from "./InputField";
import PasswordField from "./PasswordField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
  maxWidth: "95%",
};

const initialState = {
  email: "",
  otp: "",
  password: "",
  cpassword: "",
};

const ForgotPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);
  const [details, setDetails] = React.useState(initialState);
  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.info("OTP Send. Check your mail", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpenPass(true);
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

  const updatePassword = async () => {
    setLoading(true);
    if (details.password !== details.cpassword) {
      toast.error("Mismatch password and re-entered password!", {
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

    try {
      const res = await fetch(`${api}/api/user/updatePassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Password Updated. Please Login", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpenPass(false);
        setDetails(initialState);
        setOpen(false);
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
    <div>
      <Typography
        onClick={() => setOpen(true)}
        color="GrayText"
        mt={3}
        sx={{ cursor: "pointer" }}
      >
        Forgot Password?
      </Typography>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={24} fontWeight="bold" mb={3} color="primary">
            {openPass ? "Update Password" : "Enter email to send OTP"}
          </Typography>
          {!openPass ? (
            <InputField
              type="email"
              title="Email Address"
              others="email"
              value={details.email}
              onChange={handleChange}
              autoFocus={true}
            />
          ) : (
            <>
              <InputField
                type="number"
                title="OTP"
                others="otp"
                value={details.otp}
                onChange={handleChange}
                autoFocus={true}
              />
              <PasswordField
                title="Password"
                others="password"
                value={details.password}
                onChange={handleChange}
              />
              <PasswordField
                title="Re-enter Password"
                others="cpassword"
                value={details.cpassword}
                onChange={handleChange}
              />
            </>
          )}
          <Button
            color="secondary"
            className="mt-3"
            variant="contained"
            onClick={!openPass ? sendOtp : updatePassword}
            disabled={loading}
          >
            {openPass ? "Update" : "Send OTP"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
