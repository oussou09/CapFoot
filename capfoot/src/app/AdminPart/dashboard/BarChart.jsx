import { useRef, useState, useEffect, useContext } from "react";
import { Chart } from "chart.js";
import { RserveContext } from '../RserveContext';

function BarChart() {
  const { rserves } = useContext(RserveContext);
  const chartContainer = useRef(null);
  const chartRef = useRef(null); // Use ref to store the chart instance instead of state

  // Days of the week as labels
  const labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Initialize an array with 0 counts for each day
  const dayCounts = labels.map(() => 0);

  // Count the number of reservations for each day of the week
  rserves.forEach(rserve => {
    const dayIndex = labels.indexOf(rserve.time_at.time_day);
    if (dayIndex >= 0) {
      dayCounts[dayIndex] += 1;
    }
  });

  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: "rgba(98, 105, 105, 1)", // #a2a6a4
        hoverBackgroundColor: "rgba(162, 166, 164, 1)", // #626969
        borderColor: "rgb(54, 55, 54)", // #363736

        data: dayCounts, // Use the counts array for the data
        fill: true,
      },
    ],
  };

  const chartConfig = {
    type: "bar",
    data: data,
    options: {
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            drawTicks: false,
          },
          ticks: {
            padding: 8,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy previous chart instance if it exists
    }

    if (chartContainer.current) {
      chartRef.current = new Chart(chartContainer.current, chartConfig);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Clean up the chart instance on component unmount
      }
    };
  }, [rserves]); // Update chart whenever `rserves` changes

  return (
    <div className="bg-white rounded-md shadow p-5">
      <div className="text-xl text-gray-600 mb-3 font-semibold">Weekly Reservations</div>
      <div className="">
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
}

export default BarChart;

