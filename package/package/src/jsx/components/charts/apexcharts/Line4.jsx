import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexLine4 = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [4],
        curve: "straight",
      },
      xaxis: {
        type: "text",
        categories: [], // Les niveaux de séniorité
      },
      colors: ["#00a15d"], // Couleur de la courbe
      markers: {
        size: [6],
        strokeWidth: [2],
        strokeColors: ["#00a15d"],
        colors: ["#fff"],
        hover: {
          size: 8,
        },
      },
      yaxis: {
        title: {
          text: "Salaire moyen (€)",
        },
      },
    },
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/employees/stats/")
      .then((response) => response.json())
      .then((data) => {
        if (data["Salaires moyens par niveau de séniorité"]) {
          const categories = Object.keys(
            data["Salaires moyens par niveau de séniorité"]
          );
          const seriesData = Object.values(
            data["Salaires moyens par niveau de séniorité"]
          );

          setChartData((prevState) => ({
            ...prevState,
            series: [
              {
                name: "Salaire moyen",
                data: seriesData,
              },
            ],
            options: {
              ...prevState.options,
              xaxis: { ...prevState.options.xaxis, categories: categories },
            },
          }));
        }
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des données :", error)
      );
  }, []);

  return (
    <div id="chart" className="bar-chart">
      <h3>📊 Salaires moyens par niveau de séniorité</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ApexLine4;
