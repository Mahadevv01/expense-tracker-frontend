import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CreateTransaction from "../components/CreateTransaction";
import { useGlobalContext } from "../contexts/AppContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

Chart.register(ArcElement);

const Home = () => {
  const { transactions, user } = useGlobalContext();
  const myTransactions = transactions?.filter(
    (item) => item?.user?._id === user?.user?._id
  );

  const grouped = Object.groupBy(
    myTransactions,
    (item) => item?.category?.type
  );

  const amounts = Object.values(grouped).map((item) => {
    const amts = item?.map((e) => e.amount);
    const total = amts?.reduce((prev, curr) => prev + curr, 0);
    return total;
  });

  const total = amounts.reduce((prev, curr) => prev + curr, 0);
  const labels = Object.keys(grouped);
  const data = Object.values(grouped).map((item, ind) => {
    const amts = item?.map((e) => e.amount);
    return {
      cat: labels[ind],
      amt: amts?.reduce((prev, curr) => prev + curr, 0),
      color: item?.map((e) => e?.category?.color),
      percent: `${Math.round((amounts[ind] * 100) / total)}%`,
    };
  });

  const bgColor = Object.values(grouped).map(
    (item) => item?.map((e) => e?.category?.color)[0]
  );

  const config = {
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "Expense tracker",
          data: [...amounts],
          backgroundColor: bgColor,
          hoverOffset: 4,
        },
      ],
    },

    options: {
      cutout: "80%",
      borderRadius: 50,
      spacing: 10,
      responsive: true,
      maintainAspectRatio: true,
    },
  };

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Box className="chart">
              <Box className="Box position-relative">
                <Doughnut {...config} />
                <Typography
                  fontSize={50}
                  fontWeight="bold"
                  color="primary"
                  className="total-amt"
                >
                  <Tooltip title="Total">
                    <CurrencyRupeeIcon />
                    {total}
                  </Tooltip>
                </Typography>
              </Box>
              <Box>
                {data?.map((item, ind) => {
                  const { cat, color, amt, percent } = item;
                  return (
                    <Grid
                      key={ind}
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      py={1}
                      className="shadow-sm position-relative overflow-hidden rounded-2"
                      mt={3}
                      paddingX={4}
                    >
                      <Grid item md={8} xs={8}>
                        <Typography fontSize={20} fontWeight="bold">
                          {cat} (<CurrencyRupeeIcon className="fs-6" />
                          {amt})
                        </Typography>
                      </Grid>
                      <Grid item md={4} xs={4} textAlign="end">
                        <Typography fontSize={20} fontWeight="bold">
                          {percent}
                        </Typography>
                      </Grid>
                      <Button
                        sx={{
                          backgroundColor: color[0],
                        }}
                        className="Button btn"
                      />
                    </Grid>
                  );
                })}
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <CreateTransaction />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
