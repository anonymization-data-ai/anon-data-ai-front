import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = () => {
  const [dataTranchesAge, setDataTranchesAge] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(235, 129, 83,1)",
          "rgba(112, 159, 186, 1)",
          "rgba(238, 60, 60, 1)",
          "rgba(54, 147, 255, 1)",
          "rgba(0, 161, 93, 1)",
        ],
      },
    ],
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/employees/stats/")
      .then((response) => response.json())
      .then((data) => {
        const tranches = Object.keys(data["Répartition par tranche d'âge"]);
        const valeurs = Object.values(data["Répartition par tranche d'âge"]);

        setDataTranchesAge({
          labels: tranches,
          datasets: [
            {
              data: valeurs,
              backgroundColor: [
                "rgba(235, 129, 83,1)",
                "rgba(112, 159, 186, 1)",
                "rgba(238, 60, 60, 1)",
                "rgba(54, 147, 255, 1)",
                "rgba(0, 161, 93, 1)",
              ],
            },
          ],
        });
      })
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return <PolarArea data={dataTranchesAge} options={options} height={150} />;
};

export default PolarChart;
