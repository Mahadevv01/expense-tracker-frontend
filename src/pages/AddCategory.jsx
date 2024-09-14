import {
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { useGlobalContext } from "../contexts/AppContext";
import EditIcon from "@mui/icons-material/Edit";

const initialState = {
  type: "",
  color: "",
};

const AddCategory = () => {
  const { categories, addCategory, editCategory, user } = useGlobalContext();
  const myCats = categories?.filter(
    (item) => item?.user?._id === user?.user?._id
  );

  const [details, setDetails] = useState(initialState);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  useEffect(() => {
    setDetails(myCats?.filter((item) => item?._id === id)[0]);
  }, [id]);

  return (
    <Container maxWidth="lg" className="container">
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Typography fontSize={30} fontWeight="bold" mb={3} color="primary">
            {edit ? "Edit" : "Add"} Category Type
          </Typography>
          <InputField
            autoFocus={true}
            title="Type"
            type="text"
            others="type"
            value={details?.type}
            onChange={handleChange}
          />
          <InputField
            title="Color"
            type="color"
            others="color"
            value={details?.color}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="secondary"
            className="fs-6"
            onClick={() =>
              !edit
                ? addCategory(details, setDetails, initialState)
                : editCategory(details, setDetails, initialState, id, setEdit)
            }
          >
            {edit ? "Edit" : "Add"}
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography fontSize={30} fontWeight="bold" mb={3} color="primary">
            Categories
          </Typography>
          {myCats?.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Sr.No.", "Type", "Color", "Action"].map((item, ind) => (
                      <TableCell key={ind} align="center">
                        <Typography fontWeight="bold" className="fs-4">
                          {item}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myCats?.map((item, ind) => (
                    <TableRow key={ind}>
                      <TableCell align="center">
                        <Typography fontSize={19}>{ind + 1}.</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontSize={19}>{item?.type}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Button sx={{ bgcolor: item?.color }}></Button>
                      </TableCell>
                      <TableCell align="center">
                        <EditIcon
                          className="text-warning icon"
                          onClick={() => {
                            setEdit(true);
                            setId(item?._id);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography fontSize={26} fontWeight="bold">
              No categories added!
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddCategory;
