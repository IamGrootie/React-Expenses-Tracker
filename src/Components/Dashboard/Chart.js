import { useExpenses } from "../../Contexts/ExpensesContext";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Chart(props) {
  const { monthlyExpenses, monthlyDateArray } = useExpenses();

  const labels = monthlyDateArray.sort();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Expense",
        fill: true,
        data: monthlyExpenses.map((item) => item.amount).reverse(),
        backgroundColor: "#363a3f",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
