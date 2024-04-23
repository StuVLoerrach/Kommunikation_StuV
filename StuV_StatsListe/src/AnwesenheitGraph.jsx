import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getHighestAnwesenheitValue = (data) => {
  if (!data || data.length === 0) {
    return null; // Return null if data is empty or not available
  }

  let highestValue = 0;

  data.forEach((entry) => {
    const { Anwesenheit } = entry;
    Object.values(Anwesenheit).forEach((value) => {
      const intValue = parseInt(value);
      if (intValue > highestValue) {
        highestValue = intValue;
      }
    });
  });

  return highestValue;
};

const AnwesenheitGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return null; // Render nothing if data is not available
  }

  // Extract years from the first data entry
  const attendances = Object.keys(data[0].Anwesenheit);

  // Map each year to a Line component
  const lines = attendances.map((type, index) => (
    <Line
      key={`line-${index}`}
      type="monotone"
      dataKey={`Anwesenheit.${type}`}
      name={type}
      stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
    />
  ));

  // Calculate max value for y-axis scaling
  const maxAttendanceValue = getHighestAnwesenheitValue(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Datum" />
        <YAxis domain={[0, maxAttendanceValue]} />
        <Tooltip />
        <Legend />
        {lines}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnwesenheitGraph;
