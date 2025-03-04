import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  const data = {
    labels: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
    datasets: [
      {
        label: "D0",
        data: [10, 20, 15, 30, 25, 40],
        hidden: true,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
      {
        label: "D1",
        data: [30, 20, 65, 10, 65, 47],
        borderColor: "red",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: "-1",
      },
      {
        label: "D2",
        data: [0, 60, 15, 75, 55, 0],
        borderColor: "green",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: 1,
      },
      {
        label: "D3",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 30],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: "-1",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div
      style={{
        height: "500px",
        background: "white",
        padding: "10px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
