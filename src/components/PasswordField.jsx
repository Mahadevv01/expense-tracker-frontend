import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const PasswordField = ({ title, others, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth className="mb-4">
      <Typography fontSize={18} fontWeight="bold">
        {title}
      </Typography>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        name={others}
        placeholder={title}
        value={value}
        onChange={onChange}
        required
      />
    </FormControl>
  );
};

export default PasswordField;
