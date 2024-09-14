import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import InputField from "../components/InputField";

const initialState = {
  name: "",
  email: "",
};

const Profile = () => {
  const { user, updateUser } = useGlobalContext();
  const [editProfile, setEditProfile] = useState(false);
  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  console.log(user?.user);
  useEffect(() => {
    setDetails(user?.user);
  }, [user, editProfile]);

  return (
    <Container maxWidth="sm" className="container">
      <Typography color="primary" fontSize={34} fontWeight="bold" mb={3}>
        My Profile
      </Typography>
      {[
        { title: "Name", value: user?.user?.name },
        { title: "Email", value: user?.user?.email },
      ].map((item, ind) => {
        const { title, value } = item;
        return (
          <Grid key={ind} container spacing={4} alignItems="center" mb={4}>
            <Grid item md={2} xs={2}>
              <Typography fontWeight="bold" fontSize={20}>
                {title}
              </Typography>
            </Grid>
            <Grid item md={10} xs={10}>
              {editProfile ? (
                <InputField
                  type="text"
                  others="name"
                  value={details[title.toLowerCase()]}
                  onChange={handleChange}
                />
              ) : (
                <Typography fontSize={20}>{value}</Typography>
              )}
            </Grid>
          </Grid>
        );
      })}
      <Button
        color="secondary"
        variant="contained"
        disabled={loading}
        onClick={() =>
          !editProfile
            ? setEditProfile(true)
            : updateUser(details, setEditProfile, setLoading)
        }
      >
        {editProfile ? "Update" : "Edit Profile"}
      </Button>
      {editProfile && (
        <Button
          className="ms-4"
          variant="contained"
          onClick={() => setEditProfile(false)}
        >
          Don't Edit
        </Button>
      )}
    </Container>
  );
};

export default Profile;
