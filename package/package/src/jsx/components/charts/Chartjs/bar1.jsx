import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ApexBar2 = () => {
  const [chartData, setChartData] = useState({
    series: [{ name: "Nombre d'employés", data: [] }],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      colors: ["#00a15d"],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        title: { text: "Type de contrat" },
      },
      yaxis: {
        title: { text: "Nombre d'employés" },
      },
    },
  });

  // Fetch data from API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/employees/stats/") // Remplace cette URL par celle de ton API
      .then((response) => response.json())
      .then((data) => {
        if (data["Répartition par type de contrat"]) {
          const categories = Object.keys(data["Répartition par type de contrat"]);
          const values = Object.values(data["Répartition par type de contrat"]);

          setChartData((prevState) => ({
            ...prevState,
            series: [{ name: "Nombre d'employés", data: values }],
            options: { ...prevState.options, xaxis: { categories } },
          }));
        }
      })
      .catch((error) => console.error("Erreur lors du chargement des données :", error));
  }, []);

  return (
    <div id="chart" className="line-chart-style bar-chart">
      <h3>📊 Répartition des employés par type de contrat</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ApexBar2;
