import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ApexPie4 = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "polarArea",
        sparkline: {
          enabled: true,
        },
      },
      labels: [],
      fill: {
        opacity: 1,
        colors: ["#709fba", "#ff5c00", "#00a15d", "#3693ff"],
      },
      stroke: {
        width: 0,
      },
      legend: {
        position: "bottom",
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: false,
        },
      },
    },
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/employees/stats/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données API :", data); // Vérifie si "Répartition des statuts" existe
        if (data["Répartition des statuts"]) {
          const labels = Object.keys(data["Répartition des statuts"]);
          const series = Object.values(data["Répartition des statuts"]);
  
          console.log("Labels :", labels); // Vérifie les labels
          console.log("Series :", series); // Vérifie les séries
  
          setChartData((prevState) => ({
            ...prevState,
            series: series,
            options: { ...prevState.options, labels: labels },
          }));
        }
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des données :", error)
      );
  }, []);
  

  return (
    <div id="chart">
      <h3>📊 Répartition des statuts des employés</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="polarArea"
        height={251}
      />
    </div>
  );
};

export default ApexPie4;
