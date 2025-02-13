import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ApexRedialBar2 = () => {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0, 0], // Initial values for each civil status
    options: {
      chart: {
        type: "radialBar",
        offsetY: 0,
        offsetX: 0,
      },
      plotOptions: {
        radialBar: {
          size: undefined,
          inverseOrder: false,
          hollow: {
            margin: 0,
            size: "30%",
            background: "transparent",
          },
          track: {
            show: true,
            background: "#00a15d",
            strokeWidth: "10%",
            opacity: 1,
            margin: 18,
          },
          dataLabels: {
            enabled: true, // Show the data labels
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              colors: ['#fff'],
            },
            formatter: function (val) {
              return val.toFixed(2) + "%"; // Show percentage with 2 decimal places
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 830,
          options: {
            chart: {
              offsetY: 0,
              offsetX: 0,
            },
            legend: {
              position: "bottom",
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  size: "20%",
                },
              },
            },
          },
        },
      ],
      fill: {
        opacity: 1,
      },
      colors: ["#00a15d", "#ff9800", "#ff5722", "#00bcd4"], // Adjust colors as needed
      labels: ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)"], // Civil status labels
      legend: {
        fontSize: "14px",
        show: true,
        position: "bottom",
      },
    },
  });

  // Fetch data from API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/employees/stats/") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        if (data["Répartition par état civil"]) {
          const civilStatus = data["Répartition par état civil"]; // Expected format: { "Célibataire": 50, "Marié(e)": 30, "Divorcé(e)": 20, "Veuf(ve)": 10 }
          
          // Get the total number of employees in all civil statuses
          const totalEmployees = Object.values(civilStatus).reduce((acc, val) => acc + val, 0);
          
          // Calculate the percentages for each civil status
          const civilStatusPercentages = Object.values(civilStatus).map((count) => ((count / totalEmployees) * 100).toFixed(2));

          setChartData((prevState) => ({
            ...prevState,
            series: civilStatusPercentages, // Update series with calculated percentages
          }));
        }
      })
      .catch((error) => console.error("Erreur lors du chargement des données :", error));
  }, []);

  return (
    <div id="chart" className="line-chart-style bar-chart">
      <h3>📊 Répartition des employés par état civil</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={370}
      />
    </div>
  );
};

export default ApexRedialBar2;
