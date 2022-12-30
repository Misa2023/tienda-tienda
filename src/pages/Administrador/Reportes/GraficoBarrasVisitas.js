import React from "react";
import { Bar } from "react-chartjs-2";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const GraficoBarrasVisitas = ({ visitas }) => {
  const visitasReversa = visitas.map(visitas.pop, [...visitas]);
  const pieBarra = visitasReversa.map(({ Fecha }) => Fecha.slice(0, 2));
  const dataBarra = visitasReversa.map(({ Venta, Cantidad }) =>
    ((Venta / Cantidad) * 100).toFixed(2)
  );

  const cambiadoExcel3 = visitasReversa.map((doc) => {
    Object.assign(doc, {
      TasaConversion: ((doc.Venta / doc.Cantidad) * 100).toFixed(2),
    });
    return {
      ...doc,
    };
  });

  const labels = pieBarra;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tasa de conversión",
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
        text: "Tabla Tasa de Conversión",
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
        filename="Listado de tasa de conversión"
      >
        <ExcelSheet data={cambiadoExcel3} name="Tasa conversión">
          <ExcelColumn label="Fecha" value="Fecha" />
          <ExcelColumn label="Ventas realizadas" value="Venta" />
          <ExcelColumn label="Total de visitas" value="Cantidad" />
          <ExcelColumn label="Tasa de Conversión%" value="TasaConversion" />
        </ExcelSheet>
      </ExcelFile>{" "}
    </div>
  );
};

export default GraficoBarrasVisitas;
