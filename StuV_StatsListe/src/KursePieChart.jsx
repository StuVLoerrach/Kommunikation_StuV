import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Sector } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={28} textAnchor="middle" fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
      
    </g>
  );
};


const KursePieChart = ({ data }) => {
  var [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(2);
  }, []); // Set initial activeIndex on load

  var onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (!data || data.length === 0) {
    return null; // Render nothing if data is not available
  }

  var kursData = Object.keys(data[0].Kurs).map((kurs, index) => ({
    name: kurs,
    value: parseInt(data[0].Kurs[kurs]),
    fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={100} height={100}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={kursData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={100}
          onLoad={onPieEnter}
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default KursePieChart;
