import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";

const SelectField = ({ value, onChange }) => {
  const { categories, user } = useGlobalContext();
  const myCats = categories?.filter(
    (item) => item?.user?._id === user?.user?._id
  );

  return (
    <FormControl fullWidth className="mb-3">
      <InputLabel id="category">Category</InputLabel>
      <Select
        labelId="category"
        id="select-cat"
        value={value}
        label="Category"
        onChange={onChange}
        name="category"
      >
        {myCats?.map((item) => (
          <MenuItem key={item?._id} value={item?._id}>
            {item?.type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
