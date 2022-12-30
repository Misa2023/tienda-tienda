import React from "react";
import { Bar } from "react-chartjs-2";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const GraficoBarrasEficacia = ({ pedidos }) => {
  const pedidosReversa = pedidos.map(pedidos.pop, [...pedidos]);
  const pieBarra = pedidosReversa.map(({ Fecha }) => Fecha.slice(0, 2));
  const dataBarra = pedidosReversa.map(({ Venta }) => Venta * 10);

  const cambiadoExcel2 = pedidosReversa.map((doc) => {
    Object.assign(doc, { VentasEsperadas: 10 });
    Object.assign(doc, { NivelEficacia: (doc.Venta / 10) * 100 });
    return {
      ...doc,
    };
  });

  const labels = pieBarra;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Nivel de eficacia",
        backgroundColor: "black",
        //borderColor: "red",
        data: dataBarra,
        //borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Tabla Nivel de Eficacia",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.dataset.label || "";
            if (context.parsed.y !== null) {
              label += " " + context.parsed.y + "%";
            }
            return label;
          },
        },
      },
    },

    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function (value, index, values) {
            return value + " %";
          },
        },
      },
    },
  };

  return (
    <div className="contenedor-reportes-barras">
      <Bar data={data} options={options} />
      <ExcelFile
        element={
          <button className="boton-mediano" style={{ color: "white" }}>
            Descargar excel
          </button>
        }
        filename="Listado de nivel de eficacia"
      >
        <ExcelSheet data={cambiadoExcel2} name="Nivel Eficacia">
          <ExcelColumn label="Fecha" value="Fecha" />
          <ExcelColumn label="Ventas realizadas" value="Venta" />
          <ExcelColumn label="Ventas esperadas" value="VentasEsperadas" />
          <ExcelColumn label="Nivel de eficacia %" value="NivelEficacia" />
        </ExcelSheet>
      </ExcelFile>{" "}
    </div>
  );
};

export default GraficoBarrasEficacia;
