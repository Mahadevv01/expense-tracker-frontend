import { FormControl, TextField, Typography } from "@mui/material";
import React from "react";

const InputField = ({
  type,
  others,
  autoFocus,
  title,
  value,
  onChange,
  multiline,
  rows,
}) => {
  return (
    <FormControl fullWidth className="mb-4">
      <Typography fontSize={18} fontWeight="bold">
        {title}
      </Typography>
      <TextField
        type={type}
        name={others}
        id={others}
        autoFocus={autoFocus}
        placeholder={title}
        value={value}
        onChange={onChange}
        required
        multiline={multiline}
        rows={rows}
      />
    </FormControl>
  );
};

export default InputField;
