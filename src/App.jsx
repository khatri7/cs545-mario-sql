import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Field, Form, Formik } from "formik";
import { isValidSelectQuery } from "./utils/helpers";
import "./App.css";
import mario from "./assets/images/mario.png";
import king from "./assets/images/king.png";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  TextareaAutosize,
} from "@mui/material";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY
);

function App() {
  async function executeQuery(query) {
    try {
      const parsedQuery = isValidSelectQuery(query);
      const tableName = parsedQuery.from[0]?.table;
      const columns = parsedQuery.columns
        ?.map((column) => column?.expr?.column)
        .join(", ");
      const { data } = await supabase.from(tableName).select(columns);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="background">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          padding: 0,
          maxWidth: "none",
        }}
      >
        <img src={mario} alt="Mario" className="mario" />
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Mario SQL
        </Typography>
        <Box
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: "black",
            color: "white",
            width: "100%",
            minHeight: "200px",
            height: "15rem",
            maxWidth: "500px",
          }}
        >
          SQL Table
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
          }}
          elevation={3}
        >
          <Formik
            initialValues={{
              query: "",
            }}
            onSubmit={async (values) => {
              try {
                await executeQuery(values.query.trim());
              } catch (e) {
                console.error(e);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form">
                <Field
                  //   as={TextField}
                  className="input"
                  name="query"
                  label="Enter SQL Query"
                  placeholder="SELECT...  Enter your SQL Query"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    mt: 2,
                    width: "100%",
                  }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        {/* <img src={king} alt="King" className="king"/> */}
      </Container>
    </div>
  );
}

export default App;
