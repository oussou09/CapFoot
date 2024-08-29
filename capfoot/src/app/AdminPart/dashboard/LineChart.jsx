import { useRef, useState, useEffect, useContext } from "react";
import { Chart } from "chart.js";
import { RserveContext } from '../RserveContext';

function LineChart() {
  const { rserves } = useContext(RserveContext);
  const chartContainer = useRef(null);
  const chartRef = useRef(null); // Using a ref to store the chart instance instead of state

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
        label: 'Reservations',
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderColor: "rgb(99, 102, 241)",
        pointBackgroundColor: "rgb(99, 102, 241)",
        data: dayCounts, // Use the counts array for the data
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartConfig = {
    type: "line",
    data: data,
    options: {
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
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

export default LineChart;
