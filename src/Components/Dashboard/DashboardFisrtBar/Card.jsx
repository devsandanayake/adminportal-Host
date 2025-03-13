import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, LabelList } from "recharts";

const colorMapping = {
  Tickets: "#FFC107",
  Hotels: "#007BFF",
  "Train Tickets": "#28A745",
};

const chartsData = [
  { metric: "Bookings", Tickets: 4200, Hotels: 3200, "Train Tickets": 2500 },
  { metric: "Revenue", Tickets: 12000, Hotels: 9500, "Train Tickets": 7600 },
  { metric: "Cancellations", Tickets: 500, Hotels: 320, "Train Tickets": 210 },
  { metric: "Refunds", Tickets: 8000, Hotels: 6300, "Train Tickets": 5200 },
  { metric: "SLT Revenue", Tickets: 8000, Hotels: 6300, "Train Tickets": 5200 },
  { metric: "Partner Revenue", Tickets: 7000, Hotels: 5800, "Train Tickets": 4600 },
];

const CustomLabel = (props) => {
  const { x, y, value } = props;
  return (
    <text x={x + 25} y={y + 20} fill="white" fontSize={12} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomBarChart = ({ title, data }) => {
  return (
    <div style={{
      width: "48%",
      marginBottom: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "12px",
      padding: "15px",
      boxSizing: "border-box",
      backgroundColor: "#1E1E1E",  // Dark background for the graph container
      color: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    }}>
      <h3 style={{ color: "#FFF" }}>{title} - February 2025</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart 
          data={data} 
          margin={{ top: 10, right: 20, left: 10, bottom: 50 }} 
          barCategoryGap="30%" 
          style={{ background: "transparent" }} // Ensures the graph itself remains transparent
        >
          <XAxis dataKey="metric" tick={{ fill: "white" }} />
          <YAxis tick={{ fontSize: 12, fill: "white" }} />
          <Legend wrapperStyle={{ color: "white" }} />
          {Object.keys(colorMapping).map((category, index) => (
            <Bar
              key={index}
              dataKey={category}
              name={category}
              fill={colorMapping[category]}
              fillOpacity={0.8}
              radius={[4, 4, 0, 0]}
              barSize={50}
            >
              <LabelList dataKey={category} content={<CustomLabel />} />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
      <h5>Total {title}: LKR {data.reduce((acc, item) => acc + item.Tickets + item.Hotels + item["Train Tickets"], 0).toLocaleString()}</h5>
    </div>
  );
};

export default function MultiChartPage() {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      margin: "0",
      display: "flex",
      flexDirection: "column",
      paddingTop: "20px",
      backgroundColor: "#F8F9FA",  // Light background for the page
      color: "black",
      fontFamily: "'Roboto', sans-serif",
    }}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "10px",
        overflowY: "auto",
      }}>
        {chartsData.map((chart, index) => (
          <CustomBarChart key={index} title={chart.metric} data={[chart]} />
        ))}
      </div>
    </div>
  );
}
