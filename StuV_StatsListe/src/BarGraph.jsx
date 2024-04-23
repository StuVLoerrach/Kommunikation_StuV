import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Paper } from '@mui/material';

const BarGraph = ({ data }) => {
// Extract Anwesenheit data for each entry
const anwesenheitData = data.map(entry => {
    return {
      Date: entry[''].Datum, // Assuming the date is stored under an empty key
      Anwesenheit: entry.Anwesenheit // Assuming Anwesenheit is directly accessible
    };
  });

  return (
    <Paper>
      <LineChart
        width={800}
        height={400}
        data={anwesenheitData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Anwesenheit" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </Paper>
  );
};

export default BarGraph;
