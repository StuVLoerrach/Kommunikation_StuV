import React, { useState, useEffect } from "react";
import { Container, Paper, CssBaseline, Grid, Box } from "@mui/material";
import axios from "axios";
import Papa from "papaparse";
import JahrgangGraph from "./JahrgangGraph";
import AnwesenheitGraph from "./AnwesenheitGraph";
import KursePieChart from "./KursePieChart";
import TrophyPodium from "./TrophyPodium"; // Importing the TrophyPodium component
import Avatar from "./Avatar";

// Sample data for the TrophyPodium component
const sampleTopThreeAttendees = [
  { name: "John Doe", score: 50 },
  { name: "Jane Smith", score: 100 },
  { name: "Alice Johnson", score: 85 },
];

const App = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnwTzLMEacQ7rCBgtv1oaIMoJYjJv4WKXVy5X66kqLzDwN4nRV1yRuGHegGlvLs85_nabeWKEO_wZ8/pub?gid=1543114755&single=true&output=csv"
        );
        const csvData = response.data;
        const parsedData = await parseCSVData(csvData);
        setJsonData(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const parseCSVData = async (csvData) => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: false,
        complete: (parsedData) => {
          const jsonData = [];
          const data = parsedData.data;
          const types = data[0]; // Extracting types from the first row
          const subtypes = data[1]; // Extracting subtypes from the second row

          // Iterate through each row starting from the third row
          for (let i = 2; i < data.length; i++) {
            const rowData = data[i];
            const entry = {
              Datum: rowData[0], // Assuming Datum is the first column in each row
            };

            // Iterate over each column in the row starting from index 1
            for (let j = 1; j < rowData.length; j++) {
              const type = types[j];
              const subtype = subtypes[j];
              const value = rowData[j];

              // If Anwesenheit or Kurs, add as object property
              if (
                type === "Jahrgang" ||
                type === "Anwesenheit" ||
                type === "Kurs"
              ) {
                if (!entry[type]) {
                  entry[type] = {};
                }
                entry[type][subtype] = value;
              } else {
                entry[type] = value;
              }
            }

            jsonData.push(entry);
          }

          resolve(jsonData);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Box height="100%" width="100%">
            <Paper elevation={3} style={{ height: "100%" }}>
              <JahrgangGraph data={jsonData} style={{ height: "100%" }} />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height="100%" width="100%">
            <Paper elevation={3} style={{ height: "100%" }}>
              <AnwesenheitGraph data={jsonData} style={{ height: "100%" }} />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height="100%" width="100%">
            <Paper elevation={3} style={{ height: "100%" }}>
              <KursePieChart data={jsonData} />
            </Paper>
          </Box>
        </Grid>
        {/* Add TrophyPodium component */}
        <Grid item xs={12} md={12}>
          <Box height="800px" width="100%">
            <Paper elevation={3} style={{ height: "100%" }}>
              <TrophyPodium topThreeAttendees={sampleTopThreeAttendees} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
