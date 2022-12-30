import React from "react";
import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
const COL_ANCHO_1 = 10;
const COL_ANCHO_2 = 20;
const styles = StyleSheet.create({
  tabla: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tablaFila: {
    margin: "auto",
    flexDirection: "row",
  },
  tablaColumna1: {
    width: COL_ANCHO_1 + "%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tablaColumna2: {
    width: COL_ANCHO_2 + "%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tablaCeldaHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 500,
  },
  anchoColumna1: {
    width: COL_ANCHO_1 + "%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  anchoColumna2: {
    width: COL_ANCHO_2 + "%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tablaCelda: {
    margin: 5,
    fontSize: 10,
  },
});

const Recibo = ({ pedido }) => {
  console.log(pedido);
  return (
    <Document>
      <Page size="A4">
        <View style={{ padding: "15px" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: "100px" }}
                src="/images/slider/slider-mochila-1.png"
              />
            </View>
            <View style={{ flex: 2 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image src="/logoLoganNegro.png" />
                <Text style={{ textAlign: "center", fontSize: "12px" }}>
                  VENTA DE TODA CLASE DE MOCHILAS, MALETINES DEPORTIVOS,
                  CAMPERAS, EJECUTIVOS, CHIMPUNERAS.
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  VENTA AL POR MAYOR Y MENOR
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  Lima - Lima
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  Jr. Andahuaylas Nro. 158
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  Celular: 936234467
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "5px",
                  border: "1px solid #000",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  R.U.C. 10464177995
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  COMPROBANTE DE PAGO
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  N° {pedido.NumeroPedido}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Cliente: {pedido.Nombres} {pedido.Apellidos}
              </Text>

              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Dirección:
                {typeof pedido.Direccion === "object"
                  ? pedido.Direccion.region +
                    "/" +
                    pedido.Direccion.provincia +
                    "/" +
                    pedido.Direccion.distrito +
                    "/" +
                    pedido.Direccion.direccion
                  : pedido.Direccion}
              </Text>

              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                DNI:{" "}
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Celular: {pedido.Celular}{" "}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Fecha de Emisión: {pedido.Fecha.toDate().toLocaleDateString()}
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Fecha de Vencimiento: PAGO ONLINE{" "}
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Condición de venta:{" "}
              </Text>
            </View>
          </View>
          <View style={styles.tabla}>
            <View style={styles.tablaFila}>
              <View style={styles.tablaColumna1}>
                <Text style={styles.tablaCeldaHeader}>ITEM</Text>
              </View>
              <View style={styles.tablaColumna1}>
                <Text style={styles.tablaCeldaHeader}>CANTIDAD</Text>
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>UNIDAD</Text>
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>DESCRIPCION</Text>
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>PRECIO UNITARIO</Text>
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>IMPORTE TOTAL</Text>
              </View>
            </View>

            {pedido.Productos.map((producto, index) => (
              <View style={styles.tablaFila} key={index}>
                <View style={styles.anchoColumna1}>
                  <Text style={styles.tablaCelda}>{index + 1}</Text>
                </View>
                <View style={styles.anchoColumna1}>
                  <Text style={styles.tablaCelda}>{producto.Unidades}</Text>
                </View>
                <View style={styles.anchoColumna2}>
                  <Text style={styles.tablaCelda}>UNIDAD</Text>
                </View>
                <View style={styles.anchoColumna2}>
                  <Text style={styles.tablaCelda}>{producto.Descripcion}</Text>
                </View>
                <View style={styles.anchoColumna2}>
                  <Text style={styles.tablaCelda}>S/. {producto.Precio}</Text>
                </View>
                <View style={styles.anchoColumna2}>
                  <Text style={styles.tablaCelda}>
                    S/. {producto.Unidades * parseFloat(producto.Precio)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "70px",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
              IMPORTE TOTAL: S/.
              {pedido.Productos?.reduce(
                (antes, actual) =>
                  parseFloat(actual.Precio) * actual.Unidades + antes,
                0
              )}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Recibo;
