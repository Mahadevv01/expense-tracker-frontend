import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useGlobalContext } from "../contexts/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const initialState = {
  name: "",
  category: "",
  amount: "",
  date: "",
};

const CreateTransaction = () => {
  const { addTransaction, deleteTransaction, transactions, user } =
    useGlobalContext();

  const myTransactions = transactions?.filter(
    (item) => item?.user?._id === user?.user?._id
  );

  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  return (
    <Box>
      {!view ? (
        <>
          <Typography
            fontSize={32}
            color="primary"
            textAlign="center"
            fontWeight="bold"
            mb={2}
          >
            Create Transaction
          </Typography>
          <InputField
            title="Transaction Name"
            type="text"
            others="name"
            autoFocus={true}
            value={details.name}
            onChange={handleChange}
          />
          <SelectField value={details.category} onChange={handleChange} />
          <InputField
            title="Amount"
            type="number"
            others="amount"
            value={details.amount}
            onChange={handleChange}
          />
          <InputField
            title="Date"
            type="date"
            others="date"
            value={details.date}
            onChange={handleChange}
          />
          <Button
            color="secondary"
            variant="contained"
            disabled={loading}
            onClick={() =>
              addTransaction(details, setDetails, initialState, setLoading)
            }
          >
            Create
          </Button>
          <Button
            color="warning"
            variant="contained"
            className="ms-3"
            onClick={() => setView(true)}
          >
            View History
          </Button>
        </>
      ) : (
        <>
          <Typography
            fontSize={32}
            color="primary"
            textAlign="center"
            fontWeight="bold"
            mb={2}
          >
            History
          </Typography>
          <Box className="history-box">
            {myTransactions?.length > 0 ? (
              myTransactions?.map((item) => {
                const {
                  name,
                  amount,
                  _id,
                  category: { color },
                } = item;
                return (
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className="shadow-sm rounded-2 position-relative overflow-hidden"
                    mb={3}
                    py={2}
                    paddingLeft={2}
                    paddingRight={0}
                  >
                    <Grid item md={2} xs={2}>
                      <DeleteIcon
                        className="icon fs-5 text-danger"
                        onClick={() => deleteTransaction(_id)}
                      />
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <Typography fontSize={18}>
                        {name} (<CurrencyRupeeIcon className="fs-6" />
                        {amount})
                      </Typography>
                    </Grid>
                    <Button
                      sx={{
                        backgroundColor: color,
                      }}
                      className="Button hist"
                    />
                  </Grid>
                );
              })
            ) : (
              <Typography fontSize={20} textAlign="center" fontWeight="bold">
                No transaction have been created till now!!
              </Typography>
            )}
          </Box>

          <Button
            color="primary"
            variant="contained"
            onClick={() => setView(false)}
          >
            Go Back
          </Button>
        </>
      )}
    </Box>
  );
};

export default CreateTransaction;
